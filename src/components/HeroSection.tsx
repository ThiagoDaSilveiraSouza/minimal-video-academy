
import { ArrowRight, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative min-h-screen flex items-center">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-40 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 pt-32 md:pt-0 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fadeIn">
            <div className="inline-block">
              <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary">
                Aprenda no seu ritmo
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
              Eleve seus 
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600"> conhecimentos </span>
              com os melhores cursos
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-xl">
              Uma plataforma minimalista para aprender habilidades que transformam sua carreira e vida.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/registro">
                <Button size="lg" className="w-full sm:w-auto rounded-full px-8 py-6 h-auto text-base">
                  Começar agora <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/cursos">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full sm:w-auto rounded-full px-8 py-6 h-auto text-base"
                >
                  <PlayCircle className="mr-2 h-5 w-5" /> Explorar cursos
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                    <img 
                      src={`https://i.pravatar.cc/100?img=${i + 10}`} 
                      alt="User avatar" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <span className="text-primary font-semibold">+2500</span> alunos satisfeitos
              </div>
            </div>
          </div>
          
          <div className="relative hidden lg:block animate-fadeIn animation-delay-200">
            <div className="glass absolute -top-10 -left-10 w-20 h-20 rounded-xl flex items-center justify-center animate-pulse">
              <img src="https://cdn-icons-png.flaticon.com/512/2232/2232688.png" alt="Course icon" className="w-10 h-10" />
            </div>
            <div className="glass absolute top-1/3 -right-10 w-20 h-20 rounded-xl flex items-center justify-center animate-pulse" style={{ animationDelay: "1s" }}>
              <img src="https://cdn-icons-png.flaticon.com/512/3406/3406995.png" alt="Certificate icon" className="w-10 h-10" />
            </div>
            <div className="glass absolute -bottom-10 left-1/3 w-20 h-20 rounded-xl flex items-center justify-center animate-pulse" style={{ animationDelay: "2s" }}>
              <img src="https://cdn-icons-png.flaticon.com/512/1902/1902569.png" alt="Play icon" className="w-10 h-10" />
            </div>
            
            <div className="relative w-full overflow-hidden rounded-2xl border border-border/50 shadow-xl">
              <div className="aspect-video blur-load" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=30&q=10')" }}>
                <img 
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&q=80" 
                  alt="Student learning online" 
                  className="w-full h-full object-cover transition-opacity duration-300"
                  onLoad={(e) => e.currentTarget.parentElement?.classList.add("loaded")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
