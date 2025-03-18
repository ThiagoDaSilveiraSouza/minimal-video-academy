
import { useEffect, useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { getAllCourses } from "@/services/courseService";
import { useAuth } from "@/context/AuthContext";
import CourseSearch from "@/components/courses/CourseSearch";
import CourseList from "@/components/courses/CourseList";
import OfflineNotice from "@/components/common/OfflineNotice";

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { user, loading, hasAccess, isOfflineMode } = useAuth();
  const navigate = useNavigate();

  const {
    data: courses = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: getAllCourses,
    retry: 1,
    staleTime: isOfflineMode ? Infinity : 1000 * 60 * 5, // 5 minutos em modo normal, infinito em modo offline
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login", { state: { from: "/cursos" } });
    }
  }, [user, loading, navigate]);

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
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Nossos Cursos</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore nossa biblioteca completa de cursos ministrados por
            especialistas em suas áreas
          </p>
          
          {isOfflineMode && <OfflineNotice />}
        </div>

        <div className="flex flex-wrap md:flex-nowrap gap-6 mb-12">
          <CourseSearch 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
          />
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p>Carregando cursos...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-destructive">
              Erro ao carregar cursos. Tente novamente mais tarde.
            </p>
          </div>
        ) : (
          <CourseList 
            courses={courses} 
            searchTerm={searchTerm} 
            hasAccess={hasAccess} 
          />
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
