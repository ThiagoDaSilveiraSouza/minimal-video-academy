
import MainLayout from "@/layouts/MainLayout";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminPanel from "@/components/AdminPanel";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { getCoursesByAccessLevel, Course } from "@/services/courseService";
import { accessLevelNames, ACCESS_LEVELS } from "@/lib/firebase";
import { Clock, Users, Star, BookOpen } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";

const CourseCard = ({ course }: { course: Course }) => {
  return (
    <Card className="h-full hover:shadow-md transition-all">
      <div className="aspect-video relative overflow-hidden">
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
      <CardContent className="p-4 pb-2">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{course.description}</p>
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
      <CardFooter className="p-4 pt-0">
        <Link to={`/curso/${course.id}`} className="w-full">
          <Button className="w-full">Ver curso</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

const Dashboard = () => {
  const { user, userData, loading, hasAccess } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(userData?.accessLevel || ACCESS_LEVELS.FREE);
  
  // Consultas para cada nível de acesso
  const { data: freeCourses = [], isLoading: loadingFreeCourses } = useQuery({
    queryKey: ['courses', ACCESS_LEVELS.FREE],
    queryFn: () => getCoursesByAccessLevel(ACCESS_LEVELS.FREE),
    enabled: !!user,
  });
  
  const { data: basicCourses = [], isLoading: loadingBasicCourses } = useQuery({
    queryKey: ['courses', ACCESS_LEVELS.BASIC],
    queryFn: () => getCoursesByAccessLevel(ACCESS_LEVELS.BASIC),
    enabled: !!user && hasAccess(ACCESS_LEVELS.BASIC),
  });
  
  const { data: premiumCourses = [], isLoading: loadingPremiumCourses } = useQuery({
    queryKey: ['courses', ACCESS_LEVELS.PREMIUM],
    queryFn: () => getCoursesByAccessLevel(ACCESS_LEVELS.PREMIUM),
    enabled: !!user && hasAccess(ACCESS_LEVELS.PREMIUM),
  });
  
  useEffect(() => {
    // Se o usuário não estiver autenticado e o carregamento terminou, redireciona para o login
    if (!loading && !user) {
      navigate("/login");
    }
    
    // Atualiza a aba ativa com base no nível de acesso do usuário
    if (userData) {
      setActiveTab(userData.accessLevel);
    }
  }, [user, loading, navigate, userData]);
  
  // Renderiza o dashboard somente se o usuário estiver autenticado
  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <p>Carregando...</p>
        </div>
      </MainLayout>
    );
  }
  
  if (!user) {
    return null; // Não renderiza nada enquanto redireciona
  }
  
  return (
    <MainLayout>
      <div className="pt-28 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <p className="text-muted-foreground">
              Bem-vindo ao seu painel de controle, {user.email}
            </p>
            <Badge className="w-fit" variant="outline">
              Plano: {userData?.accessLevel ? accessLevelNames[userData.accessLevel] : "Carregando..."}
            </Badge>
          </div>
        </div>
        
        <div className="mb-12">
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value={ACCESS_LEVELS.FREE} disabled={!hasAccess(ACCESS_LEVELS.FREE)}>
                Cursos Gratuitos
              </TabsTrigger>
              <TabsTrigger value={ACCESS_LEVELS.BASIC} disabled={!hasAccess(ACCESS_LEVELS.BASIC)}>
                Cursos Básicos
              </TabsTrigger>
              <TabsTrigger value={ACCESS_LEVELS.PREMIUM} disabled={!hasAccess(ACCESS_LEVELS.PREMIUM)}>
                Cursos Premium
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value={ACCESS_LEVELS.FREE}>
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Cursos Gratuitos</h2>
                {loadingFreeCourses ? (
                  <p>Carregando cursos...</p>
                ) : freeCourses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {freeCourses.map(course => (
                      <CourseCard key={course.id} course={course} />
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">Nenhum curso gratuito disponível no momento.</p>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value={ACCESS_LEVELS.BASIC}>
              {hasAccess(ACCESS_LEVELS.BASIC) ? (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-4">Cursos Básicos</h2>
                  {loadingBasicCourses ? (
                    <p>Carregando cursos...</p>
                  ) : basicCourses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {basicCourses.map(course => (
                        <CourseCard key={course.id} course={course} />
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">Nenhum curso básico disponível no momento.</p>
                  )}
                </div>
              ) : (
                <div className="text-center py-12 px-4">
                  <h3 className="text-xl font-semibold mb-4">Faça upgrade para o plano Básico</h3>
                  <p className="text-muted-foreground mb-6">
                    Adquira o plano Básico para acessar cursos exclusivos e expandir seu conhecimento.
                  </p>
                  <Button size="lg">Fazer upgrade agora</Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value={ACCESS_LEVELS.PREMIUM}>
              {hasAccess(ACCESS_LEVELS.PREMIUM) ? (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-4">Cursos Premium</h2>
                  {loadingPremiumCourses ? (
                    <p>Carregando cursos...</p>
                  ) : premiumCourses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {premiumCourses.map(course => (
                        <CourseCard key={course.id} course={course} />
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">Nenhum curso premium disponível no momento.</p>
                  )}
                </div>
              ) : (
                <div className="text-center py-12 px-4">
                  <h3 className="text-xl font-semibold mb-4">Faça upgrade para o plano Premium</h3>
                  <p className="text-muted-foreground mb-6">
                    O plano Premium oferece acesso a todos os cursos da plataforma, incluindo conteúdos exclusivos.
                  </p>
                  <Button size="lg">Fazer upgrade agora</Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Painel Admin para inicializar banco de dados */}
        {userData?.accessLevel === ACCESS_LEVELS.ADMIN && <AdminPanel />}
      </div>
    </MainLayout>
  );
};

export default Dashboard;
