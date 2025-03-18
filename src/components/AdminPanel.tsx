
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { seedDatabase } from "@/utils/seedDatabase";
import { useAuth } from "@/context/AuthContext";
import { isUsingFallback } from "@/lib/firebase";

const AdminPanel = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const { user, isOfflineMode } = useAuth();
  
  const handleSeedDatabase = async () => {
    setLoading(true);
    setSuccess(false);
    setError(false);
    
    try {
      if (isOfflineMode || isUsingFallback) {
        setError(true);
        return;
      }
      
      const result = await seedDatabase();
      
      if (result) {
        setSuccess(true);
      } else {
        setError(true);
      }
    } catch (err) {
      console.error("Erro:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  
  // Somente mostrar o painel se o usuário estiver logado
  if (!user) {
    return null;
  }
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg border border-border w-72">
        <h3 className="font-semibold mb-2">Painel de Administração</h3>
        
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs">Status do Banco:</span>
          <span className={`text-xs font-medium ${isOfflineMode || isUsingFallback ? 'text-red-500' : 'text-green-500'}`}>
            {isOfflineMode || isUsingFallback ? 'Offline' : 'Online'}
          </span>
        </div>
        
        <p className="text-xs text-muted-foreground mb-4">
          Este painel permite inicializar o banco de dados com dados de exemplo.
        </p>
        
        {success && (
          <Alert className="mb-4 bg-green-50 border-green-200">
            <AlertTitle className="text-green-800">Sucesso!</AlertTitle>
            <AlertDescription className="text-green-700 text-xs">
              Banco de dados inicializado com sucesso.
            </AlertDescription>
          </Alert>
        )}
        
        {error && (
          <Alert className="mb-4 bg-red-50 border-red-200" variant="destructive">
            <AlertTitle>Erro!</AlertTitle>
            <AlertDescription className="text-xs">
              {isOfflineMode || isUsingFallback 
                ? "Operação indisponível no modo offline." 
                : "Ocorreu um erro ao inicializar o banco de dados."}
            </AlertDescription>
          </Alert>
        )}
        
        <Button 
          onClick={handleSeedDatabase} 
          className="w-full"
          disabled={loading || isOfflineMode || isUsingFallback}
        >
          {loading ? "Inicializando..." : "Inicializar Banco de Dados"}
        </Button>
      </div>
    </div>
  );
};

export default AdminPanel;
