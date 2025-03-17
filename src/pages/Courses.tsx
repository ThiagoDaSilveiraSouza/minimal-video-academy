
import { useEffect, useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Star, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { getAllCourses, type Course } from "@/services/courseService";
import { useQuery } from "@tanstack/react-query";

const CourseCard = ({ course }: { course: Course }) => {
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
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: courses = [], isLoading, error } = useQuery({
    queryKey: ['courses'],
    queryFn: getAllCourses
  });
  
  // Filtra os cursos com base no termo de busca
  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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

        {isLoading ? (
          <div className="text-center py-12">
            <p>Carregando cursos...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-destructive">Erro ao carregar cursos. Tente novamente mais tarde.</p>
          </div>
        ) : (
          <>
            {filteredCourses.length === 0 ? (
              <div className="text-center py-12">
                <p>Nenhum curso encontrado para "{searchTerm}"</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            )}
          </>
        )}

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
