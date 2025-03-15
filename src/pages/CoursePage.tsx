
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Play, BookOpen, Users, Star, Clock, CheckCircle, LockKeyhole, Award, Download, Share2 } from "lucide-react";
import { toast } from "sonner";

// Mock data para um curso específico (normalmente viria de uma API)
const coursesData = {
  1: {
    id: 1,
    title: "Desenvolvimento Web Completo",
    description: "Aprenda HTML, CSS, JavaScript, React, Node.js e mais. Este curso abrange todo o espectro de desenvolvimento web, desde os conceitos básicos de front-end até o back-end avançado.",
    longDescription: "Este curso foi desenvolvido para levar você da estaca zero ao nível profissional em desenvolvimento web. Começamos explorando os fundamentos do HTML e CSS, avançamos para JavaScript com projetos práticos, e mergulhamos em frameworks modernos como React. Na parte de back-end, você aprenderá Node.js, Express e integração com bancos de dados. Ao final do curso, você será capaz de criar aplicações web completas e responsivas.",
    instructor: {
      id: 101,
      name: "João Silva",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      role: "Desenvolvedor Full Stack Senior",
      bio: "Com mais de 10 anos de experiência em desenvolvimento web, João já trabalhou em grandes empresas de tecnologia e participou de dezenas de projetos importantes."
    },
    rating: 4.8,
    students: 1253,
    reviews: 348,
    duration: "40 horas",
    level: "Iniciante",
    lastUpdated: "Outubro 2023",
    language: "Português",
    price: 129.90,
    discountPrice: 89.90,
    features: [
      "Acesso vitalício",
      "Certificado de conclusão",
      "Projetos práticos",
      "Suporte do instrutor",
      "Material complementar"
    ],
    requirements: [
      "Computador com acesso à internet",
      "Conhecimentos básicos de informática",
      "Desejo de aprender"
    ],
    target: [
      "Iniciantes em programação",
      "Estudantes de tecnologia",
      "Profissionais buscando atualização"
    ],
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop",
    modules: [
      {
        id: 1,
        title: "Introdução ao Desenvolvimento Web",
        description: "Visão geral sobre como a web funciona",
        duration: "2 horas",
        lessons: [
          { id: 1, title: "Boas vindas ao curso", duration: "5 min", free: true, completed: true },
          { id: 2, title: "Como a internet funciona", duration: "15 min", free: true, completed: true },
          { id: 3, title: "Ferramentas necessárias", duration: "20 min", free: true, completed: false },
          { id: 4, title: "Configurando seu ambiente", duration: "30 min", free: false, completed: false }
        ]
      },
      {
        id: 2,
        title: "HTML5 Básico e Semântico",
        description: "Fundamentos da linguagem de marcação",
        duration: "5 horas",
        lessons: [
          { id: 5, title: "Introdução ao HTML", duration: "20 min", free: true, completed: false },
          { id: 6, title: "Estrutura básica de uma página", duration: "25 min", free: false, completed: false },
          { id: 7, title: "Tags semânticas", duration: "30 min", free: false, completed: false },
          { id: 8, title: "Formulários e validação", duration: "45 min", free: false, completed: false },
          { id: 9, title: "Projeto prático: Criando sua primeira página", duration: "1 hora", free: false, completed: false }
        ]
      },
      {
        id: 3,
        title: "CSS3 e Estilização",
        description: "Aprenda a estilizar suas páginas web",
        duration: "6 horas",
        lessons: [
          { id: 10, title: "Introdução ao CSS", duration: "20 min", free: false, completed: false },
          { id: 11, title: "Seletores e propriedades", duration: "35 min", free: false, completed: false },
          { id: 12, title: "Modelo de caixa e posicionamento", duration: "40 min", free: false, completed: false },
          { id: 13, title: "Flexbox e Grid Layout", duration: "50 min", free: false, completed: false },
          { id: 14, title: "Responsividade e media queries", duration: "45 min", free: false, completed: false },
          { id: 15, title: "Projeto prático: Site responsivo", duration: "1.5 horas", free: false, completed: false }
        ]
      },
      {
        id: 4,
        title: "JavaScript Fundamentals",
        description: "Base sólida de programação com JavaScript",
        duration: "8 horas",
        lessons: [
          { id: 16, title: "Introdução ao JavaScript", duration: "25 min", free: false, completed: false },
          { id: 17, title: "Variáveis, tipos de dados e operadores", duration: "40 min", free: false, completed: false },
          { id: 18, title: "Estruturas de controle", duration: "35 min", free: false, completed: false },
          { id: 19, title: "Funções e escopo", duration: "45 min", free: false, completed: false },
          { id: 20, title: "Arrays e objetos", duration: "50 min", free: false, completed: false },
          { id: 21, title: "DOM e eventos", duration: "55 min", free: false, completed: false },
          { id: 22, title: "Projeto prático: Aplicação interativa", duration: "2 horas", free: false, completed: false }
        ]
      },
      {
        id: 5,
        title: "React.js",
        description: "Construindo interfaces modernas com React",
        duration: "10 horas",
        lessons: [
          { id: 23, title: "Introdução ao React", duration: "30 min", free: false, completed: false },
          { id: 24, title: "Componentes e props", duration: "45 min", free: false, completed: false },
          { id: 25, title: "Estado e ciclo de vida", duration: "50 min", free: false, completed: false },
          { id: 26, title: "Hooks e efeitos", duration: "55 min", free: false, completed: false },
          { id: 27, title: "Roteamento com React Router", duration: "40 min", free: false, completed: false },
          { id: 28, title: "Gerenciamento de estado global", duration: "60 min", free: false, completed: false },
          { id: 29, title: "Projeto final: Aplicação React completa", duration: "3 horas", free: false, completed: false }
        ]
      }
    ]
  },
  // Outros cursos podem ser adicionados aqui
};

const CoursePage = () => {
  const { courseId } = useParams();
  const [activeTab, setActiveTab] = useState("conteudo");
  const [expandedModules, setExpandedModules] = useState<number[]>([1]);
  
  // Obter dados do curso com base no ID da URL
  const course = coursesData[Number(courseId)];
  
  // Calcular progresso do curso (normalmente viria de uma API)
  const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);
  const completedLessons = course.modules.reduce((acc, module) => 
    acc + module.lessons.filter(lesson => lesson.completed).length, 0);
  const progress = Math.round((completedLessons / totalLessons) * 100);
  
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
      description: `Você agora tem acesso ao curso "${course.title}"`,
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
  
  // Se o curso não for encontrado
  if (!course) {
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
                  <Badge variant="outline" className="text-slate-300 border-slate-600">
                    Atualizado em {course.lastUpdated}
                  </Badge>
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
                
                <p className="text-slate-300 mb-6">{course.description}</p>
                
                <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6 text-sm">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" />
                    <span className="mr-1 font-medium">{course.rating}</span>
                    <span className="text-slate-400">({course.reviews} avaliações)</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 text-slate-400 mr-1" />
                    <span>{course.students} alunos</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-slate-400 mr-1" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="w-4 h-4 text-slate-400 mr-1" />
                    <span>{course.modules.length} módulos</span>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <img 
                    src={course.instructor.avatar} 
                    alt={course.instructor.name} 
                    className="w-10 h-10 rounded-full border-2 border-white mr-3"
                  />
                  <div>
                    <p className="font-medium">Criado por <Link to={`/instrutor/${course.instructor.id}`} className="text-primary hover:underline">{course.instructor.name}</Link></p>
                    <p className="text-sm text-slate-400">{course.instructor.role}</p>
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
                    <div className="flex items-baseline mb-4">
                      <span className="text-3xl font-bold text-slate-900">R$ {course.discountPrice.toFixed(2).replace(".", ",")}</span>
                      {course.discountPrice < course.price && (
                        <span className="ml-2 text-lg line-through text-slate-500">
                          R$ {course.price.toFixed(2).replace(".", ",")}
                        </span>
                      )}
                    </div>
                    
                    <Button className="w-full mb-4" size="lg" onClick={handleEnroll}>
                      Inscrever-se agora
                    </Button>
                    
                    <div className="text-center text-sm text-slate-500 mb-6">
                      Garantia de devolução do dinheiro em 30 dias
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      <p className="font-medium">Este curso inclui:</p>
                      {course.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          <span>{feature}</span>
                        </div>
                      ))}
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
                  <span className="text-sm">{completedLessons}/{totalLessons} aulas concluídas</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
              
              <div className="space-y-4">
                {course.modules.map((module) => (
                  <Card key={module.id} className="overflow-hidden">
                    <div 
                      className="p-4 flex justify-between items-center cursor-pointer bg-secondary hover:bg-secondary/80 transition-colors"
                      onClick={() => toggleModule(module.id)}
                    >
                      <div>
                        <h3 className="font-medium">{module.title}</h3>
                        <p className="text-sm text-muted-foreground">{module.description}</p>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 mr-1" />
                        <span className="mr-4">{module.duration}</span>
                        <span className={`transform transition-transform ${expandedModules.includes(module.id) ? 'rotate-180' : ''}`}>
                          ▼
                        </span>
                      </div>
                    </div>
                    
                    {expandedModules.includes(module.id) && (
                      <CardContent className="p-0">
                        <ul className="divide-y">
                          {module.lessons.map((lesson) => (
                            <li 
                              key={lesson.id} 
                              className={`flex items-center justify-between p-4 hover:bg-muted transition-colors ${lesson.completed ? 'bg-muted/50' : ''}`}
                            >
                              <div className="flex items-center">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="mr-3 text-primary"
                                  onClick={() => playLesson(lesson.id, lesson.free)}
                                >
                                  <Play className="w-5 h-5" fill={lesson.completed ? "currentColor" : ""} />
                                </Button>
                                <div>
                                  <div className="flex items-center">
                                    <span className={`font-medium ${lesson.completed ? 'line-through opacity-70' : ''}`}>
                                      {lesson.title}
                                    </span>
                                    {lesson.free && (
                                      <Badge variant="outline" className="ml-2 text-xs">Grátis</Badge>
                                    )}
                                  </div>
                                  <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                                </div>
                              </div>
                              {!lesson.free && (
                                <LockKeyhole className="w-4 h-4 text-muted-foreground" />
                              )}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
              
              <div className="mt-8 flex justify-center">
                <Button size="lg" onClick={handleEnroll}>
                  <Award className="w-5 h-5 mr-2" /> Inscrever-se para acessar o curso completo
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="sobre" className="pt-6 space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">Sobre este curso</h3>
                <p className="text-muted-foreground">{course.longDescription}</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">O que você vai aprender</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {course.modules.map((module) => (
                    <div key={module.id} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                      <span>{module.title} - {module.description}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Requisitos</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  {course.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Público-alvo</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  {course.target.map((target, index) => (
                    <li key={index}>{target}</li>
                  ))}
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="instrutor" className="pt-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/4">
                  <img 
                    src={course.instructor.avatar} 
                    alt={course.instructor.name} 
                    className="w-40 h-40 object-cover rounded-full border-4 border-secondary mx-auto"
                  />
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-2xl font-semibold mb-2">{course.instructor.name}</h3>
                  <p className="text-primary font-medium mb-4">{course.instructor.role}</p>
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
                      <span>5 Cursos</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{course.instructor.bio}</p>
                  
                  <div className="mt-6">
                    <Link to={`/instrutor/${course.instructor.id}`}>
                      <Button variant="outline">Ver perfil completo</Button>
                    </Link>
                  </div>
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
