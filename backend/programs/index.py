"""API для работы с программами ЦТ СССР"""
import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor

def get_db_connection():
    """Получить подключение к базе данных"""
    return psycopg2.connect(os.environ['DATABASE_URL'])

def handler(event: dict, context) -> dict:
    """API endpoint для работы с программами"""
    method = event.get('httpMethod', 'GET')
    
    # CORS preflight
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    try:
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        if method == 'GET':
            # Получить параметры фильтрации
            params = event.get('queryStringParameters') or {}
            category = params.get('category')
            search = params.get('search')
            
            # Формирование SQL запроса
            query = 'SELECT * FROM programs WHERE 1=1'
            query_params = []
            
            if category and category != 'Все':
                query += ' AND category = %s'
                query_params.append(category)
            
            if search:
                query += ' AND (title ILIKE %s OR description ILIKE %s)'
                search_pattern = f'%{search}%'
                query_params.append(search_pattern)
                query_params.append(search_pattern)
            
            query += ' ORDER BY views DESC'
            
            cursor.execute(query, query_params)
            programs = cursor.fetchall()
            
            cursor.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps([dict(p) for p in programs], ensure_ascii=False, default=str),
                'isBase64Encoded': False
            }
        
        elif method == 'POST':
            # Увеличить счетчик просмотров
            body = json.loads(event.get('body', '{}'))
            program_id = body.get('program_id')
            
            if not program_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'program_id is required'}),
                    'isBase64Encoded': False
                }
            
            cursor.execute(
                'UPDATE programs SET views = views + 1 WHERE id = %s RETURNING *',
                (program_id,)
            )
            conn.commit()
            updated_program = cursor.fetchone()
            
            cursor.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps(dict(updated_program) if updated_program else {}, ensure_ascii=False, default=str),
                'isBase64Encoded': False
            }
        
        cursor.close()
        conn.close()
        
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
