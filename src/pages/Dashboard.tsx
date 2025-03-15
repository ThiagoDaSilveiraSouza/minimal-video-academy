
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserCircle, Bell, Search, BookOpen, Clock, BarChart, PlayCircle } from "lucide-react";
import MainLayout from "@/layouts/MainLayout";

// Mock data for user courses
const userCourses = [
  {
    id: 1,
    title: "Design de Interfaces Modernas",
    instructor: "Ana Silveira",
    progress: 65,
    lastWatched: "Módulo 4: Princípios de UX",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80",
    totalLessons: 24,
    completedLessons: 16,
  },
  {
    id: 2,
    title: "Marketing Digital Estratégico",
    instructor: "Carla Mendes",
    progress: 32,
    lastWatched: "Módulo 2: SEO Avançado",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=800&q=80",
    totalLessons: 30,
    completedLessons: 10,
  },
  {
    id: 3,
    title: "Desenvolvimento Web Full Stack",
    instructor: "Rafael Costa",
    progress: 10,
    lastWatched: "Módulo 1: Introdução ao HTML",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
    totalLessons: 42,
    completedLessons: 4,
  },
];

// Mock data for certificates
const certificates = [
  {
    id: 1,
    title: "Fundamentos do Design de Produto",
    date: "10 de Janeiro, 2023",
    image: "https://images.unsplash.com/photo-1588691551142-3052b076c475?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Copywriting para Mídias Sociais",
    date: "23 de Março, 2023",
    image: "https://images.unsplash.com/photo-1523120974498-9d764390d8e5?auto=format&fit=crop&w=800&q=80",
  },
];

// Mock data for recommended courses
const recommendedCourses = [
  {
    id: 4,
    title: "Inteligência Artificial Aplicada",
    instructor: "Pedro Almeida",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=800&q=80",
    price: "R$ 299,90",
  },
  {
    id: 5,
    title: "Fotografia Profissional",
    instructor: "Marina Santos",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
    price: "R$ 179,90",
  },
];

interface UserStatsCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  bgColor: string;
  textColor: string;
}

const UserStatsCard = ({ title, value, icon: Icon, bgColor, textColor }: UserStatsCardProps) => (
  <Card className="border border-border/50">
    <CardContent className="p-6 flex items-center">
      <div 
        className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${bgColor}`}
      >
        <Icon className={`h-6 w-6 ${textColor}`} />
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Bom dia");
    else if (hour < 18) setGreeting("Boa tarde");
    else setGreeting("Boa noite");
  }, []);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 animate-fadeIn">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              {greeting}, José Silva
            </h1>
            <p className="text-muted-foreground">
              Continue de onde parou em seus cursos.
            </p>
          </div>
          
          <div className="flex mt-4 md:mt-0 space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar cursos..."
                className="pl-10 pr-4 py-2 rounded-lg border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/30 w-full md:w-auto"
              />
            </div>
            <Button size="icon" variant="outline" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full text-[10px] text-white flex items-center justify-center">3</span>
            </Button>
            <Button size="icon" variant="outline">
              <UserCircle className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <UserStatsCard
            title="Cursos em Andamento"
            value={userCourses.length}
            icon={BookOpen}
            bgColor="bg-blue-100"
            textColor="text-blue-600"
          />
          <UserStatsCard
            title="Horas de Estudo"
            value="42h"
            icon={Clock}
            bgColor="bg-green-100"
            textColor="text-green-600"
          />
          <UserStatsCard
            title="Certificados"
            value={certificates.length}
            icon={BarChart}
            bgColor="bg-purple-100"
            textColor="text-purple-600"
          />
        </div>
        
        <Tabs defaultValue="courses" className="animate-fadeIn animation-delay-200">
          <TabsList className="mb-8">
            <TabsTrigger value="courses">Meus Cursos</TabsTrigger>
            <TabsTrigger value="certificates">Certificados</TabsTrigger>
            <TabsTrigger value="recommended">Recomendados</TabsTrigger>
          </TabsList>
          
          <TabsContent value="courses" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userCourses.map((course) => (
                <Link 
                  to={`/curso/${course.id}`} 
                  key={course.id}
                  className="card-hover"
                >
                  <Card className="h-full border border-border/50 overflow-hidden">
                    <div className="h-40 w-full relative">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                        <div className="text-white">
                          <p className="text-sm font-medium">Continuar assistindo</p>
                          <p className="text-xs opacity-90">{course.lastWatched}</p>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <h3 className="font-semibold text-lg mb-1">{course.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {course.instructor}
                        </p>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                          <span>{course.progress}% concluído</span>
                          <span>{course.completedLessons}/{course.totalLessons} aulas</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                        
                        <Button size="sm" className="w-full rounded-lg" variant="outline">
                          <PlayCircle className="h-4 w-4 mr-2" /> Continuar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
              
              <div className="flex items-center justify-center h-full">
                <Link to="/cursos" className="w-full">
                  <Card className="h-full border border-dashed border-border hover:border-primary/50 transition-colors flex flex-col items-center justify-center p-8 text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <BookOpen className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Explorar mais cursos</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Descubra novos cursos para expandir seus conhecimentos
                    </p>
                    <Button variant="outline" className="rounded-full">
                      Ver catálogo
                    </Button>
                  </Card>
                </Link>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="certificates">
            {certificates.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates.map((certificate) => (
                  <Card key={certificate.id} className="border border-border/50 card-hover">
                    <div className="p-1 bg-gradient-to-r from-primary to-blue-600 rounded-t-lg">
                      <div className="bg-white p-5 rounded-t">
                        <div className="aspect-[1.414/1] border border-border rounded-md overflow-hidden">
                          <img
                            src={certificate.image}
                            alt={certificate.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6 space-y-4">
                      <div>
                        <h3 className="font-semibold">{certificate.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          Concluído em {certificate.date}
                        </p>
                      </div>
                      <Button variant="outline" className="w-full rounded-lg">
                        Baixar PDF
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border border-border/50 p-8 text-center">
                <div className="max-w-sm mx-auto">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    Nenhum certificado ainda
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Complete um curso para ganhar seu primeiro certificado
                  </p>
                  <Button variant="outline" className="rounded-full">
                    Explorar cursos
                  </Button>
                </div>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="recommended">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedCourses.map((course) => (
                <Link 
                  to={`/curso/${course.id}`} 
                  key={course.id}
                  className="card-hover"
                >
                  <Card className="h-full border border-border/50 overflow-hidden">
                    <div className="h-40 relative">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-1">{course.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {course.instructor}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold">{course.price}</span>
                        <Button size="sm" className="rounded-lg">
                          Saiba mais
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
