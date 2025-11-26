import { Navigation, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { getTranslation, type Language } from "@/utils/translations";

interface HeaderProps {
  currentLang: string;
  onLanguageChange: (lang: string) => void;
}

const Header = ({ currentLang, onLanguageChange }: HeaderProps) => {
  const [isDark, setIsDark] = useState(false);
  const t = getTranslation(currentLang as Language);
  
  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);
  
  const toggleTheme = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    document.documentElement.classList.toggle('dark', newMode);
  };

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'te', label: 'తె' },
    { code: 'hi', label: 'हि' }
  ];

  return (
    <header className="sticky top-0 z-50 glass-card border-b">
      <div className="flex items-center justify-between max-w-[1800px] mx-auto px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
            <div className="relative bg-gradient-to-br from-primary to-primary-light p-3 rounded-2xl shadow-lg">
              <Navigation className="h-6 w-6 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              {t.appTitle}
            </h1>
            <p className="text-xs text-muted-foreground font-medium">{t.appSubtitle}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-xl hover:bg-muted smooth-transition"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          
          <div className="flex gap-1 bg-muted/50 p-1 rounded-xl">
            {languages.map((lang) => (
              <Button
                key={lang.code}
                variant={currentLang === lang.code ? "default" : "ghost"}
                size="sm"
                onClick={() => onLanguageChange(lang.code)}
                className={`
                  px-3 py-1.5 rounded-lg text-xs font-semibold smooth-transition
                  ${currentLang === lang.code 
                    ? 'bg-primary text-white shadow-md' 
                    : 'hover:bg-white/50'
                  }
                `}
              >
                {lang.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
