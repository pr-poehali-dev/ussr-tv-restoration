import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { useState } from 'react';
import Icon from '@/components/ui/icon';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import HomePage from '@/pages/HomePage';
import SchedulePage from '@/pages/SchedulePage';
import AboutPage from '@/pages/AboutPage';
import SearchPage from '@/pages/SearchPage';

const queryClient = new QueryClient();

function Navigation() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Главная', icon: 'Tv' },
    { path: '/schedule', label: 'Афиша', icon: 'Calendar' },
    { path: '/about', label: 'О проекте', icon: 'Info' },
    { path: '/search', label: 'Поиск', icon: 'Search' },
  ];

  return (
    <nav className="sticky top-0 z-50 vintage-border bg-primary text-primary-foreground shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="bg-secondary p-2 rounded-md">
              <Icon name="Radio" size={32} className="text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-wider">ЦЕНТРАЛЬНОЕ ТЕЛЕВИДЕНИЕ</h1>
              <p className="text-xs text-primary-foreground/80">Программы СССР</p>
            </div>
          </Link>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-primary/80 rounded transition-colors"
          >
            <Icon name={isMenuOpen ? 'X' : 'Menu'} size={24} />
          </button>

          <div className="hidden md:flex gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-6 py-3 rounded transition-all ${
                  location.pathname === item.path
                    ? 'bg-secondary text-primary font-semibold'
                    : 'hover:bg-primary/80'
                }`}
              >
                <Icon name={item.icon} size={20} />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-fade-in">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-2 px-6 py-3 rounded transition-all ${
                  location.pathname === item.path
                    ? 'bg-secondary text-primary font-semibold'
                    : 'hover:bg-primary/80'
                }`}
              >
                <Icon name={item.icon} size={20} />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="vintage-border bg-primary text-primary-foreground mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
              <Icon name="Radio" size={24} />
              ЦТ СССР
            </h3>
            <p className="text-sm text-primary-foreground/80">
              Восстановление легендарного центрального телевидения Советского Союза
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-3">Программы</h3>
            <ul className="text-sm space-y-2 text-primary-foreground/80">
              <li>• Время</li>
              <li>• Спокойной ночи, малыши!</li>
              <li>• КВН</li>
              <li>• Голубой огонёк</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-3">Контакты</h3>
            <p className="text-sm text-primary-foreground/80">
              Москва, Центральное телевидение<br />
              © 2026 Восстановлено с любовью
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen grain-effect flex flex-col">
          <Navigation />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/schedule" element={<SchedulePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
