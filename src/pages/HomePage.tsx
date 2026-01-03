import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

const channels = [
  {
    id: 1,
    name: 'Первая программа',
    currentShow: 'Время',
    description: 'Главная информационная программа страны',
    videoUrl: 'https://www.youtube.com/embed/qTAzOgjAoco',
    time: '21:00',
  },
  {
    id: 2,
    name: 'Вторая программа',
    currentShow: 'Спокойной ночи, малыши!',
    description: 'Легендарная детская передача',
    videoUrl: 'https://www.youtube.com/embed/iQdDRrcAOjA',
    time: '20:45',
  },
  {
    id: 3,
    name: 'Музыкальный канал',
    currentShow: 'Голубой огонёк',
    description: 'Музыкально-развлекательная программа',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    time: '22:00',
  },
  {
    id: 4,
    name: 'Образовательный канал',
    currentShow: 'Очевидное - невероятное',
    description: 'Научно-популярная программа',
    videoUrl: 'https://www.youtube.com/embed/jNQXAC9IVRw',
    time: '19:30',
  },
];

export default function HomePage() {
  const [selectedChannel, setSelectedChannel] = useState(channels[0]);
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center animate-fade-in">
        <h2 className="text-4xl md:text-6xl font-bold text-primary mb-4 flex items-center justify-center gap-4">
          <Icon name="Tv" size={48} className="text-secondary" />
          ПРЯМОЙ ЭФИР
        </h2>
        <p className="text-lg text-muted-foreground">
          Смотрите легендарные программы центрального телевидения СССР
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="tv-frame overflow-hidden bg-black p-4">
            <div className="aspect-video relative">
              <iframe
                src={`${selectedChannel.videoUrl}?autoplay=${isPlaying ? '1' : '0'}&mute=0&controls=1&loop=1`}
                title={selectedChannel.currentShow}
                className="w-full h-full rounded"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <Button
                    size="lg"
                    onClick={() => setIsPlaying(true)}
                    className="bg-secondary hover:bg-secondary/90 text-primary"
                  >
                    <Icon name="Play" size={32} />
                  </Button>
                </div>
              )}
            </div>
            <div className="mt-4 p-4 bg-primary/10 rounded">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-2xl font-bold text-primary">{selectedChannel.currentShow}</h3>
                <Badge variant="secondary" className="text-lg px-3 py-1">
                  <Icon name="Clock" size={16} className="mr-1" />
                  {selectedChannel.time}
                </Badge>
              </div>
              <p className="text-muted-foreground">{selectedChannel.description}</p>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <div className="vintage-border bg-card p-4 rounded-lg">
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              <Icon name="Radio" size={24} />
              Выбрать программу
            </h3>
            <div className="space-y-3">
              {channels.map((channel) => (
                <button
                  key={channel.id}
                  onClick={() => {
                    setSelectedChannel(channel);
                    setIsPlaying(true);
                  }}
                  className={`w-full text-left p-4 rounded-lg transition-all hover:scale-105 ${
                    selectedChannel.id === channel.id
                      ? 'bg-secondary text-primary shadow-lg'
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold">{channel.name}</h4>
                    <Badge variant={selectedChannel.id === channel.id ? 'default' : 'outline'}>
                      {channel.time}
                    </Badge>
                  </div>
                  <p className="text-sm opacity-80">{channel.currentShow}</p>
                </button>
              ))}
            </div>
          </div>

          <Card className="p-4 bg-accent text-accent-foreground">
            <div className="flex items-center gap-3 mb-3">
              <Icon name="Star" size={24} />
              <h3 className="text-lg font-bold">Сегодня в эфире</h3>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Icon name="Circle" size={8} className="text-secondary" />
                <span>19:00 - Новости</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Circle" size={8} className="text-secondary" />
                <span>19:30 - Очевидное - невероятное</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Circle" size={8} className="text-secondary" />
                <span>20:45 - Спокойной ночи, малыши!</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Circle" size={8} className="text-secondary" />
                <span>21:00 - Время</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Circle" size={8} className="text-secondary" />
                <span>22:00 - Голубой огонёк</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
