import { useState } from 'react';
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

interface Program {
  id: number;
  title: string;
  year: string;
  category: string;
  description: string;
  channel: string;
  image: string;
}

const allPrograms: Program[] = [
  {
    id: 1,
    title: 'Время',
    year: '1968-1991',
    category: 'Новости',
    description: 'Главная информационная программа страны',
    channel: 'Первая программа',
    image: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=300',
  },
  {
    id: 2,
    title: 'Спокойной ночи, малыши!',
    year: '1964-н.в.',
    category: 'Детское',
    description: 'Легендарная детская передача перед сном',
    channel: 'Первая программа',
    image: 'https://images.unsplash.com/photo-1587628604439-c5c3e90d4d7e?w=300',
  },
  {
    id: 3,
    title: 'КВН',
    year: '1961-1971',
    category: 'Развлечение',
    description: 'Клуб весёлых и находчивых',
    channel: 'Первая программа',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300',
  },
  {
    id: 4,
    title: 'Голубой огонёк',
    year: '1962-1991',
    category: 'Музыка',
    description: 'Музыкально-развлекательная программа',
    channel: 'Первая программа',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300',
  },
  {
    id: 5,
    title: 'Очевидное - невероятное',
    year: '1973-1991',
    category: 'Наука',
    description: 'Научно-популярная программа',
    channel: 'Первая программа',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=300',
  },
  {
    id: 6,
    title: 'В мире животных',
    year: '1968-н.в.',
    category: 'Природа',
    description: 'Передача о природе и животных',
    channel: 'Вторая программа',
    image: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=300',
  },
  {
    id: 7,
    title: 'Здоровье',
    year: '1968-н.в.',
    category: 'Медицина',
    description: 'Передача о здоровье и медицине',
    channel: 'Первая программа',
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=300',
  },
  {
    id: 8,
    title: 'Что? Где? Когда?',
    year: '1975-н.в.',
    category: 'Интеллект',
    description: 'Интеллектуальная игра',
    channel: 'Первая программа',
    image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=300',
  },
  {
    id: 9,
    title: 'Служу Советскому Союзу',
    year: '1975-1991',
    category: 'Военное',
    description: 'Передача о Советской Армии',
    channel: 'Первая программа',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300',
  },
  {
    id: 10,
    title: 'Клуб кинопутешествий',
    year: '1960-1991',
    category: 'Путешествия',
    description: 'Передача о путешествиях по СССР и миру',
    channel: 'Первая программа',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=300',
  },
  {
    id: 11,
    title: 'Утренняя почта',
    year: '1976-1991',
    category: 'Развлечение',
    description: 'Воскресная развлекательная программа',
    channel: 'Первая программа',
    image: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=300',
  },
  {
    id: 12,
    title: 'АБВГДейка',
    year: '1975-н.в.',
    category: 'Детское',
    description: 'Телевизионная игра для школьников',
    channel: 'Первая программа',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300',
  },
];

const categories = ['Все', 'Новости', 'Детское', 'Развлечение', 'Музыка', 'Наука', 'Природа', 'Интеллект'];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');

  const filteredPrograms = allPrograms.filter((program) => {
    const matchesSearch =
      program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Все' || program.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Все');
              }}
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
                src={program.image}
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
                <Button size="sm" variant="ghost" className="hover:bg-secondary hover:text-primary">
                  <Icon name="Play" size={16} className="mr-1" />
                  Смотреть
                </Button>
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
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('Все');
            }}
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
