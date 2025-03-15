
import MainLayout from "@/layouts/MainLayout";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bookmark, GraduationCap, Star, Users } from "lucide-react";

const instructorsData = [
  {
    id: 1,
    name: "João Silva",
    role: "Desenvolvedor Web Senior",
    bio: "Especialista em React e Node.js com mais de 10 anos de experiência em desenvolvimento web e mobile.",
    courses: 12,
    students: 4300,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Ana Costa",
    role: "Especialista em Marketing Digital",
    bio: "Consultora de marketing digital com experiência em grandes empresas como Google e Meta.",
    courses: 8,
    students: 3200,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Ricardo Lopes",
    role: "Cientista de Dados",
    bio: "PhD em Ciência da Computação com foco em Machine Learning e Inteligência Artificial.",
    courses: 6,
    students: 2800,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Mariana Alves",
    role: "Coach de Produtividade",
    bio: "Especialista em técnicas de produtividade e gestão do tempo para profissionais e empresas.",
    courses: 5,
    students: 1900,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: 5,
    name: "Carlos Mendes",
    role: "Especialista em Excel e BI",
    bio: "Consultor de Business Intelligence com especialização em Excel, Power BI e Tableau.",
    courses: 10,
    students: 3600,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: 6,
    name: "Luciana Ferreira",
    role: "Fotógrafa Profissional",
    bio: "Fotógrafa premiada com experiência em fotografia comercial, retratos e natureza.",
    courses: 7,
    students: 2100,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=500&auto=format&fit=crop"
  },
];

const InstructorCard = ({ instructor }: { instructor: typeof instructorsData[0] }) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative p-6 flex flex-col items-center text-center">
        <div className="w-28 h-28 rounded-full overflow-hidden mb-4 border-4 border-primary/10">
          <img 
            src={instructor.image} 
            alt={instructor.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-xl font-semibold mb-1">{instructor.name}</h3>
        <p className="text-sm text-primary mb-3">{instructor.role}</p>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{instructor.bio}</p>
        
        <div className="flex justify-center gap-4 w-full mb-5">
          <div className="flex flex-col items-center">
            <GraduationCap className="w-5 h-5 text-primary mb-1" />
            <p className="text-sm font-medium">{instructor.courses}</p>
            <p className="text-xs text-muted-foreground">Cursos</p>
          </div>
          <div className="flex flex-col items-center">
            <Users className="w-5 h-5 text-primary mb-1" />
            <p className="text-sm font-medium">{instructor.students}</p>
            <p className="text-xs text-muted-foreground">Alunos</p>
          </div>
          <div className="flex flex-col items-center">
            <Star className="w-5 h-5 text-yellow-500 mb-1" />
            <p className="text-sm font-medium">{instructor.rating}</p>
            <p className="text-xs text-muted-foreground">Avaliação</p>
          </div>
        </div>
        
        <div className="flex gap-3 w-full">
          <Button variant="default" className="flex-1">Ver cursos</Button>
          <Button variant="outline" size="icon" className="h-9 w-9">
            <Bookmark className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

const Instructors = () => {
  return (
    <MainLayout>
      <div className="pt-28 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Instrutores Especialistas</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Conheça nossos instrutores especialistas que compartilham conhecimento e experiência em cada curso
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {instructorsData.map(instructor => (
            <InstructorCard key={instructor.id} instructor={instructor} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" className="px-8">
            Ver todos os instrutores
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Instructors;
