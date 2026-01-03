-- Таблица программ ЦТ СССР
CREATE TABLE IF NOT EXISTS programs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    year VARCHAR(50) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT,
    channel VARCHAR(100) NOT NULL,
    image_url TEXT,
    video_url TEXT,
    time VARCHAR(10),
    views INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица избранного (для будущей авторизации)
CREATE TABLE IF NOT EXISTS favorites (
    id SERIAL PRIMARY KEY,
    program_id INTEGER REFERENCES programs(id),
    user_id VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(program_id, user_id)
);

-- Индексы для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_programs_category ON programs(category);
CREATE INDEX IF NOT EXISTS idx_programs_title ON programs(title);
CREATE INDEX IF NOT EXISTS idx_favorites_user ON favorites(user_id);

-- Вставка начальных данных
INSERT INTO programs (title, year, category, description, channel, image_url, video_url, time, views) VALUES
('Время', '1968-1991', 'Новости', 'Главная информационная программа страны', 'Первая программа', 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=400', 'https://www.youtube.com/embed/qTAzOgjAoco', '21:00', 1542),
('Спокойной ночи, малыши!', '1964-н.в.', 'Детское', 'Легендарная детская передача перед сном', 'Первая программа', 'https://images.unsplash.com/photo-1587628604439-c5c3e90d4d7e?w=400', 'https://www.youtube.com/embed/iQdDRrcAOjA', '20:45', 2341),
('КВН', '1961-1971', 'Развлечение', 'Клуб весёлых и находчивых', 'Первая программа', 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400', 'https://www.youtube.com/embed/dQw4w9WgXcQ', '22:00', 987),
('Голубой огонёк', '1962-1991', 'Музыка', 'Музыкально-развлекательная программа', 'Первая программа', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400', 'https://www.youtube.com/embed/jNQXAC9IVRw', '22:00', 1234),
('Очевидное - невероятное', '1973-1991', 'Наука', 'Научно-популярная программа', 'Первая программа', 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400', 'https://www.youtube.com/embed/dQw4w9WgXcQ', '19:30', 765),
('В мире животных', '1968-н.в.', 'Природа', 'Передача о природе и животных', 'Вторая программа', 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=400', 'https://www.youtube.com/embed/jNQXAC9IVRw', '18:00', 1876),
('Здоровье', '1968-н.в.', 'Медицина', 'Передача о здоровье и медицине', 'Первая программа', 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400', 'https://www.youtube.com/embed/dQw4w9WgXcQ', '16:00', 654),
('Что? Где? Когда?', '1975-н.в.', 'Интеллект', 'Интеллектуальная игра', 'Первая программа', 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=400', 'https://www.youtube.com/embed/jNQXAC9IVRw', '17:00', 1432),
('Служу Советскому Союзу', '1975-1991', 'Военное', 'Передача о Советской Армии', 'Первая программа', 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400', 'https://www.youtube.com/embed/dQw4w9WgXcQ', '20:00', 543),
('Клуб кинопутешествий', '1960-1991', 'Путешествия', 'Передача о путешествиях по СССР и миру', 'Первая программа', 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400', 'https://www.youtube.com/embed/jNQXAC9IVRw', '12:30', 876),
('Утренняя почта', '1976-1991', 'Развлечение', 'Воскресная развлекательная программа', 'Первая программа', 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400', 'https://www.youtube.com/embed/dQw4w9WgXcQ', '09:00', 432),
('АБВГДейка', '1975-н.в.', 'Детское', 'Телевизионная игра для школьников', 'Первая программа', 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400', 'https://www.youtube.com/embed/jNQXAC9IVRw', '13:00', 1098);
