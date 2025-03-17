
import MainLayout from "@/layouts/MainLayout";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AdminPanel from "@/components/AdminPanel";

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Se o usuário não estiver autenticado e o carregamento terminou, redireciona para o login
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);
  
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
          <p className="text-muted-foreground">
            Bem-vindo ao seu painel de controle, {user.email}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Conteúdo do dashboard aqui */}
          <div className="col-span-full">
            <p>Conteúdo do dashboard em construção...</p>
          </div>
        </div>
        
        {/* Painel Admin para inicializar banco de dados */}
        <AdminPanel />
      </div>
    </MainLayout>
  );
};

export default Dashboard;
