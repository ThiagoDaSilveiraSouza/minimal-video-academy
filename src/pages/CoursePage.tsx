
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import MainLayout from "@/layouts/MainLayout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Home, Play, BookOpen, Users, Star, Clock, CheckCircle, LockKeyhole, Award, Download, Share2, Shield, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { getCourseById } from "@/services/courseService";
import { accessLevelNames } from "@/lib/firebase";
import { useQuery } from "@tanstack/react-query";

const CoursePage = () => {
  const { courseId } = useParams();
  const [activeTab, setActiveTab] = useState("conteudo");
  const [expandedModules, setExpandedModules] = useState<number[]>([1]);
  const { user, loading, hasAccess } = useAuth();
  const navigate = useNavigate();
  
  const { data: course, isLoading: courseLoading, error } = useQuery({
    queryKey: ['course', courseId],
    queryFn: () => getCourseById(courseId || ''),
    enabled: !!courseId
  });
  
  useEffect(() => {
    if (!loading && !user) {
      navigate("/login", { state: { from: `/curso/${courseId}` } });
    }
  }, [user, loading, navigate, courseId]);
  
  // Função para alternar a expansão de um módulo
  const toggleModule = (moduleId: number) => {
    setExpandedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId) 
        : [...prev, moduleId]
    );
  };
  
  // Função para inscrever-se no curso
  const handleEnroll = () => {
    toast.success("Inscrição realizada com sucesso!", {
      description: `Você agora tem acesso ao curso "${course?.title}"`,
    });
  };
  
  // Função para reproduzir uma aula
  const playLesson = (lessonId: number, isFree: boolean) => {
    if (isFree) {
      toast.info("Reproduzindo aula gratuita", {
        description: "Esta é uma aula de demonstração gratuita"
      });
    } else {
      toast.info("Inscreva-se para assistir esta aula", {
        description: "Adquira o curso para acessar o conteúdo completo"
      });
    }
  };
  
  // Verifica se o usuário tem acesso ao curso
  const userHasAccess = course ? hasAccess(course.accessLevel) : false;
  
  // Se estiver carregando, mostra um indicador de carregamento
  if (loading || courseLoading) {
    return (
      <MainLayout>
        <div className="pt-28 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[300px]">
            <p>Carregando...</p>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  // Se o usuário não estiver autenticado, não renderiza nada (será redirecionado pelo useEffect)
  if (!user) {
    return null;
  }
  
  // Se o curso não for encontrado
  if (error || !course) {
    return (
      <MainLayout>
        <div className="pt-28 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Curso não encontrado</h1>
            <p className="text-muted-foreground mb-6">O curso que você está procurando não existe.</p>
            <Link to="/cursos">
              <Button>Ver todos os cursos</Button>
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="pt-28 pb-20">
        {/* Header do curso */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-12">
          <div className="px-6 md:px-12 max-w-7xl mx-auto">
            <Breadcrumb className="mb-6 text-slate-300">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">
                    <Home className="h-4 w-4 mr-1" />
                    Início
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/cursos">
                    Cursos
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink className="font-medium text-white">
                    {course.title}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="flex gap-2 mb-4">
                  <Badge className="bg-primary/90 hover:bg-primary">{course.level}</Badge>
                  {course.accessLevel && (
                    <Badge variant="outline" className="text-slate-300 border-slate-600 flex items-center gap-1">
                      <Shield className="w-3 h-3" /> Nível {accessLevelNames[course.accessLevel]}
                    </Badge>
                  )}
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
                
                <p className="text-slate-300 mb-6">{course.description}</p>
                
                <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6 text-sm">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" />
                    <span className="mr-1 font-medium">{course.rating}</span>
                    <span className="text-slate-400">({course.rating * 10} avaliações)</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 text-slate-400 mr-1" />
                    <span>{course.students} alunos</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-slate-400 mr-1" />
                    <span>{course.duration}</span>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-slate-700 mr-3 flex items-center justify-center">
                    <span className="text-white font-bold">{course.instructor.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-medium">Criado por <span className="text-primary">{course.instructor}</span></p>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-white text-slate-900 rounded-lg overflow-hidden shadow-xl">
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Button variant="default" size="lg" className="rounded-full">
                        <Play className="w-5 h-5 mr-2" fill="currentColor" /> Assistir prévia
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    {!userHasAccess && (
                      <Alert variant="destructive" className="mb-4">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Acesso restrito</AlertTitle>
                        <AlertDescription>
                          Este curso requer plano {accessLevelNames[course.accessLevel]} ou superior.
                        </AlertDescription>
                      </Alert>
                    )}
                    
                    <Button 
                      className="w-full mb-4" 
                      size="lg" 
                      onClick={handleEnroll}
                      disabled={!userHasAccess}
                    >
                      {userHasAccess ? "Inscrever-se agora" : "Fazer upgrade de plano"}
                    </Button>
                    
                    <div className="text-center text-sm text-slate-500 mb-6">
                      Garantia de devolução do dinheiro em 30 dias
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      <p className="font-medium">Este curso inclui:</p>
                      <div className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Acesso vitalício</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Certificado de conclusão</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Projetos práticos</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        <Share2 className="w-4 h-4 mr-2" /> Compartilhar
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Download className="w-4 h-4 mr-2" /> Recursos
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Conteúdo do curso */}
        <div className="px-6 md:px-12 max-w-7xl mx-auto mt-8">
          {!userHasAccess && (
            <div className="mb-8">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Conteúdo bloqueado</AlertTitle>
                <AlertDescription>
                  Faça upgrade para o plano {accessLevelNames[course.accessLevel]} para acessar este curso.
                </AlertDescription>
              </Alert>
            </div>
          )}
          
          <Tabs defaultValue="conteudo" onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 md:w-[400px]">
              <TabsTrigger value="conteudo">Conteúdo</TabsTrigger>
              <TabsTrigger value="sobre">Sobre</TabsTrigger>
              <TabsTrigger value="instrutor">Instrutor</TabsTrigger>
            </TabsList>
            
            <TabsContent value="conteudo" className="pt-6">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Seu progresso</h3>
                  <span className="text-sm">0/0 aulas concluídas</span>
                </div>
                <Progress value={0} className="h-2" />
              </div>
              
              {userHasAccess ? (
                <div className="space-y-4">
                  {/* Conteúdo do curso aqui - utilizando dados fictícios */ }
                  <Card>
                    <div 
                      className="p-4 flex justify-between items-center cursor-pointer bg-secondary hover:bg-secondary/80 transition-colors"
                      onClick={() => toggleModule(1)}
                    >
                      <div>
                        <h3 className="font-medium">Módulo 1: Introdução ao Curso</h3>
                        <p className="text-sm text-muted-foreground">Visão geral do conteúdo</p>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 mr-1" />
                        <span className="mr-4">1 hora</span>
                        <span className={`transform transition-transform ${expandedModules.includes(1) ? 'rotate-180' : ''}`}>
                          ▼
                        </span>
                      </div>
                    </div>
                    
                    {expandedModules.includes(1) && (
                      <CardContent className="p-0">
                        <ul className="divide-y">
                          <li className="flex items-center justify-between p-4 hover:bg-muted transition-colors">
                            <div className="flex items-center">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="mr-3 text-primary"
                                onClick={() => playLesson(1, true)}
                              >
                                <Play className="w-5 h-5" />
                              </Button>
                              <div>
                                <div className="flex items-center">
                                  <span className="font-medium">
                                    Introdução e objetivos
                                  </span>
                                  <Badge variant="outline" className="ml-2 text-xs">Grátis</Badge>
                                </div>
                                <span className="text-xs text-muted-foreground">15 minutos</span>
                              </div>
                            </div>
                          </li>
                          <li className="flex items-center justify-between p-4 hover:bg-muted transition-colors">
                            <div className="flex items-center">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="mr-3 text-primary"
                                onClick={() => playLesson(2, false)}
                              >
                                <Play className="w-5 h-5" />
                              </Button>
                              <div>
                                <div className="flex items-center">
                                  <span className="font-medium">
                                    Configuração do ambiente
                                  </span>
                                </div>
                                <span className="text-xs text-muted-foreground">25 minutos</span>
                              </div>
                            </div>
                          </li>
                          <li className="flex items-center justify-between p-4 hover:bg-muted transition-colors">
                            <div className="flex items-center">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="mr-3 text-primary"
                                onClick={() => playLesson(3, false)}
                              >
                                <Play className="w-5 h-5" />
                              </Button>
                              <div>
                                <div className="flex items-center">
                                  <span className="font-medium">
                                    Primeiros passos
                                  </span>
                                </div>
                                <span className="text-xs text-muted-foreground">30 minutos</span>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </CardContent>
                    )}
                  </Card>
                </div>
              ) : (
                <div className="text-center py-12 bg-muted rounded-lg">
                  <LockKeyhole className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Conteúdo bloqueado</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Este curso requer o plano {accessLevelNames[course.accessLevel]}. 
                    Faça upgrade para acessar este conteúdo.
                  </p>
                  <Button size="lg">
                    <Award className="w-5 h-5 mr-2" /> Fazer upgrade de plano
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="sobre" className="pt-6 space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">Sobre este curso</h3>
                <p className="text-muted-foreground">{course.description}</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">O que você vai aprender</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                    <span>Fundamentos essenciais do assunto</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                    <span>Aplicações práticas do conhecimento</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                    <span>Técnicas avançadas de resolução de problemas</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                    <span>Métodos de implementação eficientes</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Requisitos</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Conhecimentos básicos da área</li>
                  <li>Computador com conexão à internet</li>
                  <li>Disposição para aprender</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Público-alvo</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Estudantes interessados na área</li>
                  <li>Profissionais buscando atualização</li>
                  <li>Entusiastas do assunto</li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="instrutor" className="pt-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/4 flex justify-center">
                  <div className="w-40 h-40 rounded-full bg-slate-200 flex items-center justify-center">
                    <span className="text-5xl font-bold text-slate-500">{course.instructor.charAt(0)}</span>
                  </div>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-2xl font-semibold mb-2">{course.instructor}</h3>
                  <p className="text-primary font-medium mb-4">Especialista em {course.title.split(' ')[0]}</p>
                  <div className="flex gap-4 mb-6">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-500 mr-1" fill="currentColor" />
                      <span className="font-medium">{course.rating} Avaliação média</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-5 h-5 text-muted-foreground mr-1" />
                      <span>{course.students} Alunos</span>
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="w-5 h-5 text-muted-foreground mr-1" />
                      <span>3 Cursos</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Professor experiente com anos de atuação no mercado e na academia. 
                    Especialista em transmitir conhecimentos complexos de forma clara e didática.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default CoursePage;
