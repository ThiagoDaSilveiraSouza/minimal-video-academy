
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, Star, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for featured courses
const featuredCourses = [
  {
    id: 1,
    title: "Design de Interfaces Modernas",
    description: "Aprenda a criar interfaces elegantes e intuitivas seguindo princípios modernos de design.",
    instructor: "Ana Silveira",
    duration: "10 horas",
    level: "Intermediário",
    students: 1234,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80",
    price: "R$ 129,90",
    tag: "Mais popular",
    modules: 8,
  },
  {
    id: 2,
    title: "Desenvolvimento Web Full Stack",
    description: "Domine as tecnologias front-end e back-end para construir aplicações web completas.",
    instructor: "Rafael Costa",
    duration: "32 horas",
    level: "Avançado",
    students: 985,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
    price: "R$ 219,90",
    tag: "Certificado",
    modules: 12,
  },
  {
    id: 3,
    title: "Marketing Digital Estratégico",
    description: "Estratégias eficazes para aumentar sua presença online e converter leads em clientes.",
    instructor: "Carla Mendes",
    duration: "16 horas",
    level: "Iniciante",
    students: 2156,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=800&q=80",
    price: "R$ 149,90",
    tag: "Novidade",
    modules: 10,
  },
  {
    id: 4,
    title: "Inteligência Artificial Aplicada",
    description: "Conceitos e aplicações práticas de IA para resolver problemas do mundo real.",
    instructor: "Pedro Almeida",
    duration: "24 horas",
    level: "Avançado",
    students: 763,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=800&q=80",
    price: "R$ 299,90",
    tag: "Hot",
    modules: 14,
  },
  {
    id: 5,
    title: "Fotografia Profissional",
    description: "Técnicas de composição, iluminação e edição para fotos de nível profissional.",
    instructor: "Marina Santos",
    duration: "20 horas",
    level: "Intermediário",
    students: 1872,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
    price: "R$ 179,90",
    tag: "Best-seller",
    modules: 9,
  },
];

const FeaturedCourses = () => {
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
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div className="space-y-4 max-w-xl">
            <h2 className="text-3xl font-bold animate-fadeIn">Cursos em Destaque</h2>
            <p className="text-muted-foreground animate-fadeIn animation-delay-100">
              Escolhidos a dedo para iniciar ou avançar sua jornada de aprendizado com qualidade premium.
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
          {featuredCourses.map((course, index) => (
            <div 
              key={course.id}
              className="min-w-[340px] max-w-[340px] animate-fadeIn card-hover"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Card className="h-full border border-border/50 overflow-hidden">
                <div className="relative">
                  <div className="h-48 w-full blur-load" style={{ backgroundImage: `url(${course.image}?w=30&q=10)` }}>
                    <img
                      src={course.image}
                      alt={course.title}
                      className="h-48 w-full object-cover transition-opacity duration-300"
                      onLoad={(e) => e.currentTarget.parentElement?.classList.add("loaded")}
                    />
                  </div>
                  
                  {course.tag && (
                    <Badge className="absolute top-4 left-4 bg-primary/90 hover:bg-primary">
                      {course.tag}
                    </Badge>
                  )}
                </div>
                
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div className="space-y-1">
                      <h3 className="font-semibold text-lg line-clamp-1">{course.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {course.instructor}
                      </p>
                    </div>
                    <div className="flex items-center bg-secondary rounded-lg px-2 py-1">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor" />
                      <span className="text-sm font-medium">{course.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                    {course.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                      <span className="text-xs text-muted-foreground">{course.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-muted-foreground mr-2" />
                      <span className="text-xs text-muted-foreground">{course.students} alunos</span>
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 text-muted-foreground mr-2" />
                      <span className="text-xs text-muted-foreground">{course.modules} módulos</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-4 w-4 rounded-full bg-primary/20 text-primary text-[10px] flex items-center justify-center font-bold mr-2">N</div>
                      <span className="text-xs text-muted-foreground">{course.level}</span>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="p-6 pt-0 flex justify-between items-center">
                  <div className="font-bold text-lg">{course.price}</div>
                  <Link to={`/curso/${course.id}`}>
                    <Button size="sm" variant="outline" className="rounded-full">
                      Ver detalhes
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/cursos">
            <Button variant="outline" size="lg" className="rounded-full px-8">
              Ver todos os cursos
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
