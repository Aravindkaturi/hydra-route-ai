import { Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  currentLang: string;
  onLanguageChange: (lang: string) => void;
}

const Header = ({ currentLang, onLanguageChange }: HeaderProps) => {
  const languages = [
    { code: 'en', label: 'English' },
    { code: 'te', label: 'తెలుగు' },
    { code: 'hi', label: 'हिन्दी' }
  ];

  return (
    <header className="bg-card border-b border-border px-4 py-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="bg-primary text-primary-foreground p-2.5 rounded-xl">
            <Navigation className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">Smart Route Planner</h1>
            <p className="text-sm text-muted-foreground hidden sm:block">for Hyderabad</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          {languages.map((lang) => (
            <Button
              key={lang.code}
              variant={currentLang === lang.code ? "default" : "ghost"}
              size="sm"
              onClick={() => onLanguageChange(lang.code)}
              className="text-sm font-medium transition-all duration-150"
            >
              {lang.label}
            </Button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
