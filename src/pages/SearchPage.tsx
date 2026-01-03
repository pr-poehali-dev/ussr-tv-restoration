import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const API_URL = 'https://functions.poehali.dev/8ec26cbe-7190-4b05-9b22-5ca8cdfb7d99';

interface Program {
  id: number;
  title: string;
  year: string;
  category: string;
  description: string;
  channel: string;
  image_url: string;
  video_url: string;
  time: string;
  views: number;
}

const categories = ['Все', 'Новости', 'Детское', 'Развлечение', 'Музыка', 'Наука', 'Природа', 'Интеллект'];

export default function SearchPage() {
  const [allPrograms, setAllPrograms] = useState<Program[]>([]);
  const [filteredPrograms, setFilteredPrograms] = useState<Program[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrograms();
  }, []);

  useEffect(() => {
    filterPrograms();
  }, [searchQuery, selectedCategory, allPrograms]);

  const fetchPrograms = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setAllPrograms(data);
      setFilteredPrograms(data);
    } catch (error) {
      console.error('Error fetching programs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterPrograms = () => {
    let filtered = allPrograms;

    if (selectedCategory !== 'Все') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    }

    setFilteredPrograms(filtered);
  };

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('Все');
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Icon name="Search" size={64} className="text-secondary mx-auto mb-4 animate-pulse" />
          <p className="text-lg text-muted-foreground">Загрузка архива...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12 text-center animate-fade-in">
        <h2 className="text-4xl md:text-6xl font-bold text-primary mb-4 flex items-center justify-center gap-4">
          <Icon name="Search" size={48} className="text-secondary" />
          ПОИСК ПРОГРАММ
        </h2>
        <p className="text-lg text-muted-foreground">
          Найдите любимые передачи в архиве центрального телевидения
        </p>
      </div>

      <Card className="p-6 mb-8 animate-fade-in">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Icon
              name="Search"
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            />
            <Input
              type="text"
              placeholder="Введите название программы..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-lg"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="md:w-[250px] h-12">
              <SelectValue placeholder="Выберите категорию" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {(searchQuery || selectedCategory !== 'Все') && (
            <Button
              variant="outline"
              onClick={handleReset}
              className="h-12"
            >
              <Icon name="X" size={20} className="mr-2" />
              Сбросить
            </Button>
          )}
        </div>
      </Card>

      <div className="mb-6 flex items-center justify-between">
        <p className="text-lg text-muted-foreground">
          Найдено программ: <span className="font-bold text-primary">{filteredPrograms.length}</span>
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPrograms.map((program, index) => (
          <Card
            key={program.id}
            className="overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-2 duration-300 animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="aspect-video relative overflow-hidden">
              <img
                src={program.image_url}
                alt={program.title}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3">
                <Badge variant="secondary" className="font-bold">
                  {program.year}
                </Badge>
              </div>
              <div className="absolute top-3 left-3">
                <Badge className="bg-accent text-accent-foreground">
                  {program.category}
                </Badge>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold text-primary mb-2">{program.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{program.description}</p>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  <Icon name="Radio" size={12} className="mr-1" />
                  {program.channel}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Icon name="Eye" size={12} />
                  <span>{program.views}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredPrograms.length === 0 && (
        <Card className="p-12 text-center animate-fade-in">
          <Icon name="SearchX" size={64} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-primary mb-2">Программы не найдены</h3>
          <p className="text-muted-foreground mb-4">
            Попробуйте изменить параметры поиска или выбрать другую категорию
          </p>
          <Button
            onClick={handleReset}
            className="bg-secondary hover:bg-secondary/90 text-primary"
          >
            <Icon name="RotateCcw" size={20} className="mr-2" />
            Сбросить фильтры
          </Button>
        </Card>
      )}
    </div>
  );
}
