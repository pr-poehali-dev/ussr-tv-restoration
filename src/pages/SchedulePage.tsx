import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const scheduleData = {
  monday: [
    { time: '09:00', title: 'Доброе утро', channel: 'Первая программа', type: 'Информация' },
    { time: '12:00', title: 'На обед', channel: 'Первая программа', type: 'Кулинария' },
    { time: '15:00', title: 'Киноповесть', channel: 'Первая программа', type: 'Кино' },
    { time: '18:00', title: 'В мире животных', channel: 'Вторая программа', type: 'Природа' },
    { time: '19:30', title: 'Очевидное - невероятное', channel: 'Первая программа', type: 'Наука' },
    { time: '20:45', title: 'Спокойной ночи, малыши!', channel: 'Первая программа', type: 'Детское' },
    { time: '21:00', title: 'Время', channel: 'Первая программа', type: 'Новости' },
    { time: '22:00', title: 'КВН', channel: 'Первая программа', type: 'Развлечение' },
  ],
  tuesday: [
    { time: '09:00', title: 'Утренняя гимнастика', channel: 'Первая программа', type: 'Спорт' },
    { time: '12:30', title: 'Клуб кинопутешествий', channel: 'Первая программа', type: 'Путешествия' },
    { time: '16:00', title: 'Здоровье', channel: 'Первая программа', type: 'Медицина' },
    { time: '19:00', title: 'Новости', channel: 'Первая программа', type: 'Информация' },
    { time: '20:00', title: 'Служу Советскому Союзу', channel: 'Первая программа', type: 'Военное' },
    { time: '21:00', title: 'Время', channel: 'Первая программа', type: 'Новости' },
    { time: '22:15', title: 'Музыкальный ринг', channel: 'Вторая программа', type: 'Музыка' },
  ],
  wednesday: [
    { time: '10:00', title: 'Утро', channel: 'Первая программа', type: 'Информация' },
    { time: '13:00', title: 'АБВГДейка', channel: 'Первая программа', type: 'Детское' },
    { time: '17:00', title: 'Что? Где? Когда?', channel: 'Первая программа', type: 'Интеллект' },
    { time: '19:00', title: 'Новости', channel: 'Первая программа', type: 'Информация' },
    { time: '20:45', title: 'Спокойной ночи, малыши!', channel: 'Первая программа', type: 'Детское' },
    { time: '21:00', title: 'Время', channel: 'Первая программа', type: 'Новости' },
    { time: '22:00', title: 'Кинопанорама', channel: 'Первая программа', type: 'Кино' },
  ],
};

const tvPosters = [
  {
    title: 'Время',
    image: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=400',
    description: 'Главная информационная программа',
    year: '1968',
  },
  {
    title: 'Спокойной ночи, малыши!',
    image: 'https://images.unsplash.com/photo-1587628604439-c5c3e90d4d7e?w=400',
    description: 'Детская передача перед сном',
    year: '1964',
  },
  {
    title: 'КВН',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400',
    description: 'Клуб весёлых и находчивых',
    year: '1961',
  },
  {
    title: 'Голубой огонёк',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400',
    description: 'Музыкально-развлекательная программа',
    year: '1962',
  },
  {
    title: 'Очевидное - невероятное',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400',
    description: 'Научно-популярная программа',
    year: '1973',
  },
  {
    title: 'В мире животных',
    image: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=400',
    description: 'Передача о природе и животных',
    year: '1968',
  },
];

const typeColors: Record<string, string> = {
  'Информация': 'bg-blue-100 text-blue-800',
  'Кино': 'bg-purple-100 text-purple-800',
  'Детское': 'bg-pink-100 text-pink-800',
  'Новости': 'bg-red-100 text-red-800',
  'Развлечение': 'bg-yellow-100 text-yellow-800',
  'Наука': 'bg-green-100 text-green-800',
  'Спорт': 'bg-orange-100 text-orange-800',
  'Музыка': 'bg-indigo-100 text-indigo-800',
};

export default function SchedulePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12 text-center animate-fade-in">
        <h2 className="text-4xl md:text-6xl font-bold text-primary mb-4 flex items-center justify-center gap-4">
          <Icon name="Calendar" size={48} className="text-secondary" />
          АФИША ПРОГРАММ
        </h2>
        <p className="text-lg text-muted-foreground">
          Расписание легендарных передач центрального телевидения
        </p>
      </div>

      <div className="mb-16">
        <h3 className="text-3xl font-bold text-primary mb-6 flex items-center gap-3">
          <Icon name="Image" size={32} className="text-secondary" />
          Постеры программ
        </h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {tvPosters.map((poster, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-2 duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="aspect-[3/4] relative overflow-hidden">
                <img
                  src={poster.image}
                  alt={poster.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="font-bold">
                    {poster.year}
                  </Badge>
                </div>
              </div>
              <div className="p-4 bg-card">
                <h4 className="text-xl font-bold text-primary mb-2">{poster.title}</h4>
                <p className="text-sm text-muted-foreground">{poster.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-3xl font-bold text-primary mb-6 flex items-center gap-3">
          <Icon name="Clock" size={32} className="text-secondary" />
          Расписание эфира
        </h3>
        <Tabs defaultValue="monday" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="monday" className="text-base">
              Понедельник
            </TabsTrigger>
            <TabsTrigger value="tuesday" className="text-base">
              Вторник
            </TabsTrigger>
            <TabsTrigger value="wednesday" className="text-base">
              Среда
            </TabsTrigger>
          </TabsList>

          {Object.entries(scheduleData).map(([day, programs]) => (
            <TabsContent key={day} value={day} className="space-y-3">
              {programs.map((program, index) => (
                <Card
                  key={index}
                  className="p-4 hover:shadow-lg transition-shadow animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-4 flex-1">
                      <Badge variant="outline" className="text-lg font-bold min-w-[70px] justify-center">
                        {program.time}
                      </Badge>
                      <div>
                        <h4 className="text-lg font-bold text-primary">{program.title}</h4>
                        <p className="text-sm text-muted-foreground">{program.channel}</p>
                      </div>
                    </div>
                    <Badge className={typeColors[program.type] || 'bg-gray-100 text-gray-800'}>
                      {program.type}
                    </Badge>
                  </div>
                </Card>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
