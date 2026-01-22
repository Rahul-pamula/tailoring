import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Scissors, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t, languageNames } = useLanguage();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { name: t.home, path: "/" },
    { name: t.designs, path: "/designs" },
    { name: t.reviews, path: "/reviews" },
    { name: t.contact, path: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <Scissors className="h-6 w-6 text-primary transition-transform group-hover:rotate-45" />
            <span className="font-serif text-xl md:text-2xl font-semibold text-foreground">
              RAJESHWARI TAILORING
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative text-sm font-medium transition-colors hover:text-primary ${isActive(item.path)
                  ? "text-primary"
                  : "text-muted-foreground"
                  } after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full ${isActive(item.path) ? "after:w-full" : ""
                  }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Languages className="h-4 w-4" />
                  <span className="hidden lg:inline">{languageNames[language]}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage('en')}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('te')}>
                  తెలుగు
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('hi')}>
                  हिंदी
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="secondary" size="sm" asChild>
              <a href="https://rajeshwari-tailoring-backend.onrender.com/admin/" target="_blank" rel="noopener noreferrer">
                {t.adminLogin}
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-md text-sm font-medium transition-colors ${isActive(item.path)
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile Language Selector */}
              <div className="px-4 py-2">
                <p className="text-xs text-muted-foreground mb-2">Language</p>
                <div className="flex gap-2">
                  <Button
                    variant={language === 'en' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setLanguage('en')}
                    className="flex-1"
                  >
                    EN
                  </Button>
                  <Button
                    variant={language === 'te' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setLanguage('te')}
                    className="flex-1"
                  >
                    తె
                  </Button>
                  <Button
                    variant={language === 'hi' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setLanguage('hi')}
                    className="flex-1"
                  >
                    हि
                  </Button>
                </div>
              </div>

              <Button variant="secondary" size="sm" asChild className="mx-4 mt-2">
                <a href="https://rajeshwari-tailoring-backend.onrender.com/admin/" target="_blank" rel="noopener noreferrer">
                  {t.adminLogin}
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
