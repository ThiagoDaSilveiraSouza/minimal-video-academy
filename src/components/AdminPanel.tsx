
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
      // Demo mode will always show an error for database operations
      setError(true);
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
          <span className="text-xs font-medium text-blue-500">
            Modo Demo
          </span>
        </div>
        
        <p className="text-xs text-muted-foreground mb-4">
          Aplicação em modo demo com dados locais.
        </p>
        
        {error && (
          <Alert className="mb-4 bg-blue-50 border-blue-200">
            <AlertTitle className="text-blue-800">Modo Demo</AlertTitle>
            <AlertDescription className="text-blue-700 text-xs">
              Operações de banco de dados não estão disponíveis no modo demo.
            </AlertDescription>
          </Alert>
        )}
        
        <Button 
          onClick={handleSeedDatabase} 
          className="w-full"
          disabled={true}
        >
          Inicializar Banco de Dados (Indisponível)
        </Button>
      </div>
    </div>
  );
};

export default AdminPanel;
