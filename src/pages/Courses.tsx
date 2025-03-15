
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Star, Play } from "lucide-react";
import { Link } from "react-router-dom";

const coursesData = [
  {
    id: 1,
    title: "Desenvolvimento Web Completo",
    description: "Aprenda HTML, CSS, JavaScript, React, Node.js e mais",
    instructor: "João Silva",
    rating: 4.8,
    students: 1253,
    duration: "40 horas",
    level: "Iniciante",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Marketing Digital",
    description: "Domine estratégias de SEO, mídias sociais e tráfego pago",
    instructor: "Ana Costa",
    rating: 4.9,
    students: 987,
    duration: "32 horas",
    level: "Intermediário",
    image: "https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Excel Avançado",
    description: "Fórmulas avançadas, dashboards e automação com VBA",
    instructor: "Carlos Mendes",
    rating: 4.7,
    students: 785,
    duration: "24 horas",
    level: "Avançado",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Produtividade e Gestão do Tempo",
    description: "Técnicas e métodos para otimizar seu tempo e produtividade",
    instructor: "Mariana Alves",
    rating: 4.6,
    students: 632,
    duration: "18 horas",
    level: "Todos os níveis",
    image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Introdução à Inteligência Artificial",
    description: "Conceitos fundamentais de IA, machine learning e aplicações",
    instructor: "Ricardo Lopes",
    rating: 4.9,
    students: 1089,
    duration: "36 horas",
    level: "Intermediário",
    image: "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "Fotografia para Iniciantes",
    description: "Aprenda composição, iluminação e edição de imagens",
    instructor: "Luciana Ferreira",
    rating: 4.8,
    students: 845,
    duration: "28 horas",
    level: "Iniciante",
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=500&auto=format&fit=crop"
  }
];

const CourseCard = ({ course }: { course: typeof coursesData[0] }) => {
  return (
    <Card className="overflow-hidden h-full transition-all hover:shadow-md">
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={course.image} 
          alt={course.title} 
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
        <div className="absolute top-3 right-3">
          <Badge className="bg-primary/90 hover:bg-primary">{course.level}</Badge>
        </div>
      </div>
      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-lg font-semibold line-clamp-2">{course.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pb-0">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{course.description}</p>
        <div className="flex items-center text-sm mb-1">
          <p className="font-medium">Instrutor:</p>
          <span className="ml-1 text-muted-foreground">{course.instructor}</span>
        </div>
        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground my-3">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-500 mr-1" />
            {course.rating}
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 text-gray-500 mr-1" />
            {course.students} alunos
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 text-gray-500 mr-1" />
            {course.duration}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4">
        <Link to={`/curso/${course.id}`} className="w-full">
          <Button className="w-full" variant="default">
            <Play className="w-4 h-4 mr-2" /> Ver curso
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

const Courses = () => {
  return (
    <MainLayout>
      <div className="pt-28 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Nossos Cursos</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore nossa biblioteca completa de cursos ministrados por especialistas em suas áreas
          </p>
        </div>

        <div className="flex flex-wrap md:flex-nowrap gap-6 mb-12">
          <div className="w-full">
            <div className="relative">
              <input
                type="text"
                placeholder="Pesquisar cursos..."
                className="w-full px-4 py-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <Button
                className="absolute right-1 top-1/2 -translate-y-1/2 rounded-md px-3 py-1 h-auto"
                size="sm"
              >
                Buscar
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coursesData.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" className="px-8">
            Ver todos os cursos
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Courses;
