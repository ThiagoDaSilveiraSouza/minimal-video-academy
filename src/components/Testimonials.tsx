
import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for testimonials
const testimonials = [
  {
    id: 1,
    name: "Carlos Oliveira",
    role: "Desenvolvedor Web",
    content: "Os cursos são incrivelmente bem estruturados e o conteúdo é apresentado de forma clara e objetiva. Consegui aplicar o conhecimento imediatamente em meus projetos.",
    avatar: "https://i.pravatar.cc/150?img=33",
    rating: 5,
  },
  {
    id: 2,
    name: "Fernanda Silva",
    role: "Designer UX/UI",
    content: "A qualidade do material e a didática dos instrutores são excepcionais. Em menos de três meses, consegui uma promoção graças às novas habilidades que adquiri.",
    avatar: "https://i.pravatar.cc/150?img=5",
    rating: 5,
  },
  {
    id: 3,
    name: "Ricardo Mendes",
    role: "Analista de Marketing",
    content: "Plataforma minimalista e intuitiva, sem distrações. Foco total no aprendizado. Os cursos de marketing digital transformaram minha carreira.",
    avatar: "https://i.pravatar.cc/150?img=65",
    rating: 4,
  },
  {
    id: 4,
    name: "Juliana Costa",
    role: "Empreendedora",
    content: "Investi em vários cursos e o retorno foi extraordinário. A qualidade do conteúdo e a praticidade da plataforma fazem toda a diferença para quem tem pouco tempo.",
    avatar: "https://i.pravatar.cc/150?img=9",
    rating: 5,
  },
  {
    id: 5,
    name: "André Martins",
    role: "Estudante de Engenharia",
    content: "Como estudante, encontrei aqui um complemento perfeito para minha formação acadêmica. Conteúdo prático que a universidade não oferece.",
    avatar: "https://i.pravatar.cc/150?img=12",
    rating: 5,
  },
  {
    id: 6,
    name: "Beatriz Almeida",
    role: "Gerente de Projetos",
    content: "Excelente custo-benefício. Os cursos são completos e abordam tanto aspectos teóricos quanto práticos, o que é fundamental para quem gerencia equipes.",
    avatar: "https://i.pravatar.cc/150?img=10",
    rating: 4,
  },
];

const Testimonials = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollable = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      );
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollable);
      // Initial check
      checkScrollable();
      
      // Check on window resize
      window.addEventListener("resize", checkScrollable);
      
      return () => {
        container.removeEventListener("scroll", checkScrollable);
        window.removeEventListener("resize", checkScrollable);
      };
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = container.clientWidth * 0.8;
      if (direction === "left") {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div className="space-y-4 max-w-xl">
            <h2 className="text-3xl font-bold animate-fadeIn">O que nossos alunos dizem</h2>
            <p className="text-muted-foreground animate-fadeIn animation-delay-100">
              Histórias reais de pessoas que transformaram suas carreiras com nossos cursos.
            </p>
          </div>
          
          <div className="flex mt-6 md:mt-0">
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "rounded-full mr-2 transition-opacity",
                !canScrollLeft && "opacity-50 cursor-not-allowed"
              )}
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "rounded-full transition-opacity",
                !canScrollRight && "opacity-50 cursor-not-allowed"
              )}
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="Scroll right"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto pb-8 -mx-4 px-4 space-x-6 no-scrollbar"
          style={{ scrollbarWidth: "none" }}
        >
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className="min-w-[340px] max-w-[340px] animate-fadeIn card-hover"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Card className="h-full p-6 border border-border/50">
                <div className="flex space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="h-4 w-4 text-yellow-500" 
                      fill={i < testimonial.rating ? "currentColor" : "none"} 
                    />
                  ))}
                </div>
                
                <blockquote className="text-foreground mb-6 flex-grow">
                  "{testimonial.content}"
                </blockquote>
                
                <div className="flex items-center mt-auto">
                  <div className="mr-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
