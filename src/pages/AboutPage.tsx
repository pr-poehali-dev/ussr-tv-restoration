import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

export default function AboutPage() {
  const milestones = [
    { year: '1951', event: 'Начало регулярного вещания Центрального телевидения' },
    { year: '1961', event: 'Запуск второй программы ЦТ' },
    { year: '1964', event: 'Первый выпуск "Спокойной ночи, малыши!"' },
    { year: '1968', event: 'Запуск программы "Время"' },
    { year: '1970', event: 'Внедрение цветного телевидения' },
    { year: '1982', event: 'Начало спутникового вещания' },
  ];

  const legends = [
    {
      name: 'Валентина Леонтьева',
      role: 'Ведущая "Спокойной ночи, малыши!"',
      icon: 'User',
    },
    {
      name: 'Игорь Кириллов',
      role: 'Диктор программы "Время"',
      icon: 'Mic',
    },
    {
      name: 'Николай Дроздов',
      role: 'Ведущий "В мире животных"',
      icon: 'PawPrint',
    },
    {
      name: 'Капитолина Кеворкова',
      role: 'Диктор Центрального телевидения',
      icon: 'Radio',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12 text-center animate-fade-in">
        <h2 className="text-4xl md:text-6xl font-bold text-primary mb-4 flex items-center justify-center gap-4">
          <Icon name="BookOpen" size={48} className="text-secondary" />
          О ПРОЕКТЕ
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Восстановление легендарного центрального телевидения СССР — 
          возвращение золотого века советского эфира
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-16">
        <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/10 animate-fade-in">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-secondary p-3 rounded-full">
              <Icon name="Tv" size={32} className="text-primary" />
            </div>
            <h3 className="text-3xl font-bold text-primary">Миссия проекта</h3>
          </div>
          <p className="text-lg leading-relaxed mb-4">
            Центральное телевидение СССР было не просто источником информации — 
            это была часть культуры, объединявшая миллионы людей по всей стране.
          </p>
          <p className="text-lg leading-relaxed">
            Наша цель — сохранить и восстановить легендарные передачи, 
            которые формировали сознание и ценности целого поколения. 
            Это проект о памяти, культуре и истории.
          </p>
        </Card>

        <Card className="p-8 bg-gradient-to-br from-accent/10 to-secondary/5 animate-fade-in" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-accent p-3 rounded-full">
              <Icon name="Target" size={32} className="text-accent-foreground" />
            </div>
            <h3 className="text-3xl font-bold text-primary">Наши цели</h3>
          </div>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <Icon name="CheckCircle" size={24} className="text-secondary mt-1 flex-shrink-0" />
              <span className="text-lg">Оцифровка архивных программ высокого качества</span>
            </li>
            <li className="flex items-start gap-3">
              <Icon name="CheckCircle" size={24} className="text-secondary mt-1 flex-shrink-0" />
              <span className="text-lg">Воссоздание атмосферы советского телеэфира</span>
            </li>
            <li className="flex items-start gap-3">
              <Icon name="CheckCircle" size={24} className="text-secondary mt-1 flex-shrink-0" />
              <span className="text-lg">Доступ к легендарным передачам 24/7</span>
            </li>
            <li className="flex items-start gap-3">
              <Icon name="CheckCircle" size={24} className="text-secondary mt-1 flex-shrink-0" />
              <span className="text-lg">Образовательная платформа для молодого поколения</span>
            </li>
          </ul>
        </Card>
      </div>

      <div className="mb-16">
        <h3 className="text-3xl font-bold text-primary mb-8 flex items-center gap-3 justify-center">
          <Icon name="Calendar" size={36} className="text-secondary" />
          Вехи истории ЦТ СССР
        </h3>
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-secondary/30 hidden md:block" />
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`flex items-center gap-8 animate-fade-in ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card className={`flex-1 p-6 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <Badge variant="secondary" className="text-xl px-4 py-2 mb-3">
                    {milestone.year}
                  </Badge>
                  <p className="text-lg">{milestone.event}</p>
                </Card>
                <div className="hidden md:block">
                  <div className="w-6 h-6 bg-secondary rounded-full border-4 border-background shadow-lg" />
                </div>
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-3xl font-bold text-primary mb-8 flex items-center gap-3 justify-center">
          <Icon name="Users" size={36} className="text-secondary" />
          Легенды советского телевидения
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {legends.map((legend, index) => (
            <Card
              key={index}
              className="p-6 text-center hover:shadow-xl transition-all hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-secondary/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name={legend.icon} size={40} className="text-primary" />
              </div>
              <h4 className="text-xl font-bold text-primary mb-2">{legend.name}</h4>
              <p className="text-sm text-muted-foreground">{legend.role}</p>
            </Card>
          ))}
        </div>
      </div>

      <Card className="mt-16 p-8 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 text-center">
        <Icon name="Heart" size={48} className="text-accent mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-primary mb-4">
          Проект создан с любовью к истории
        </h3>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Мы верим, что культурное наследие должно быть доступно каждому. 
          Присоединяйтесь к нам в путешествии по золотому веку советского телевидения!
        </p>
      </Card>
    </div>
  );
}
