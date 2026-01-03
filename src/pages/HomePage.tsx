import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

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

export default function HomePage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setPrograms(data.slice(0, 4));
      if (data.length > 0) {
        setSelectedProgram(data[0]);
      }
    } catch (error) {
      console.error('Error fetching programs:', error);
    } finally {
      setLoading(false);
    }
  };

  const incrementViews = async (programId: number) => {
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ program_id: programId })
      });
    } catch (error) {
      console.error('Error incrementing views:', error);
    }
  };

  const handleProgramSelect = (program: Program) => {
    setSelectedProgram(program);
    setIsPlaying(true);
    incrementViews(program.id);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Icon name="Tv" size={64} className="text-secondary mx-auto mb-4 animate-pulse" />
          <p className="text-lg text-muted-foreground">Загрузка программ...</p>
        </div>
      </div>
    );
  }

  if (!selectedProgram) return null;

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
                key={selectedProgram.id}
                src={`${selectedProgram.video_url}?autoplay=${isPlaying ? '1' : '0'}&mute=0&controls=1&loop=1`}
                title={selectedProgram.title}
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
                <h3 className="text-2xl font-bold text-primary">{selectedProgram.title}</h3>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-sm">
                    <Icon name="Eye" size={14} className="mr-1" />
                    {selectedProgram.views}
                  </Badge>
                  <Badge variant="secondary" className="text-lg px-3 py-1">
                    <Icon name="Clock" size={16} className="mr-1" />
                    {selectedProgram.time}
                  </Badge>
                </div>
              </div>
              <p className="text-muted-foreground mb-2">{selectedProgram.description}</p>
              <Badge className="mt-2">{selectedProgram.category}</Badge>
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
              {programs.map((program) => (
                <button
                  key={program.id}
                  onClick={() => handleProgramSelect(program)}
                  className={`w-full text-left p-4 rounded-lg transition-all hover:scale-105 ${
                    selectedProgram?.id === program.id
                      ? 'bg-secondary text-primary shadow-lg'
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold">{program.title}</h4>
                    <Badge variant={selectedProgram?.id === program.id ? 'default' : 'outline'}>
                      {program.time}
                    </Badge>
                  </div>
                  <p className="text-sm opacity-80 mb-1">{program.channel}</p>
                  <div className="flex items-center gap-2 text-xs opacity-70">
                    <Icon name="Eye" size={12} />
                    <span>{program.views} просмотров</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <Card className="p-4 bg-accent text-accent-foreground">
            <div className="flex items-center gap-3 mb-3">
              <Icon name="Star" size={24} />
              <h3 className="text-lg font-bold">Популярные программы</h3>
            </div>
            <ul className="space-y-2 text-sm">
              {programs.slice(0, 4).map((program) => (
                <li key={program.id} className="flex items-center gap-2">
                  <Icon name="Circle" size={8} className="text-secondary" />
                  <span>{program.time} - {program.title}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
