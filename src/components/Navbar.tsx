
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { UserCircle, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-6 md:px-12",
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="text-xl md:text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-700"
        >
          EduPrime
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              location.pathname === "/" ? "text-primary" : "text-foreground/80"
            )}
          >
            Início
          </Link>
          <Link
            to="/cursos"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              location.pathname === "/cursos" ? "text-primary" : "text-foreground/80"
            )}
          >
            Cursos
          </Link>
          <Link
            to="/instrutores"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              location.pathname === "/instrutores" ? "text-primary" : "text-foreground/80"
            )}
          >
            Instrutores
          </Link>
          <Link
            to="/planos"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              location.pathname === "/planos" ? "text-primary" : "text-foreground/80"
            )}
          >
            Planos
          </Link>
        </nav>

        {/* Auth buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/login">
            <Button variant="outline" className="rounded-full px-5 py-2 h-auto">
              Entrar
            </Button>
          </Link>
          <Link to="/registro">
            <Button className="rounded-full px-5 py-2 h-auto">
              Começar
            </Button>
          </Link>
        </div>
        
        {/* Mobile menu button */}
        <button
          className="md:hidden flex items-center"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-foreground" />
          ) : (
            <Menu className="w-6 h-6 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-white/95 backdrop-blur-lg transform transition-transform duration-300 ease-in-out md:hidden flex flex-col pt-20",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col space-y-6 px-8 py-6">
          <Link
            to="/"
            className={cn(
              "text-lg font-medium py-2 border-b border-border/50",
              location.pathname === "/" ? "text-primary" : "text-foreground/80"
            )}
          >
            Início
          </Link>
          <Link
            to="/cursos"
            className={cn(
              "text-lg font-medium py-2 border-b border-border/50",
              location.pathname === "/cursos" ? "text-primary" : "text-foreground/80"
            )}
          >
            Cursos
          </Link>
          <Link
            to="/instrutores"
            className={cn(
              "text-lg font-medium py-2 border-b border-border/50",
              location.pathname === "/instrutores" ? "text-primary" : "text-foreground/80"
            )}
          >
            Instrutores
          </Link>
          <Link
            to="/planos"
            className={cn(
              "text-lg font-medium py-2 border-b border-border/50",
              location.pathname === "/planos" ? "text-primary" : "text-foreground/80"
            )}
          >
            Planos
          </Link>
          
          <div className="flex flex-col space-y-4 mt-4">
            <Link to="/login" className="w-full">
              <Button variant="outline" className="w-full rounded-full py-6">
                Entrar
              </Button>
            </Link>
            <Link to="/registro" className="w-full">
              <Button className="w-full rounded-full py-6">
                Começar
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
