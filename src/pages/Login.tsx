
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      // For demo purposes, any login works
      if (email && password) {
        toast({
          title: "Login bem-sucedido!",
          description: "Você foi autenticado com sucesso.",
        });
        navigate("/dashboard");
      } else {
        toast({
          title: "Erro ao fazer login",
          description: "Por favor, verifique seu email e senha.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="absolute top-6 left-6">
        <Link 
          to="/" 
          className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para a página inicial
        </Link>
      </div>
      
      <div className="max-w-md w-full mx-auto animate-fadeIn">
        <div className="text-center mb-8">
          <Link 
            to="/" 
            className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-700 inline-block"
          >
            EduPrime
          </Link>
          <h1 className="text-2xl font-bold mt-6 mb-2">Bem-vindo de volta</h1>
          <p className="text-muted-foreground">
            Faça login para continuar sua jornada de aprendizado
          </p>
        </div>
        
        <div className="bg-white rounded-2xl border border-border/50 shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Senha</Label>
                <Link 
                  to="/esqueci-senha" 
                  className="text-xs text-primary hover:underline"
                >
                  Esqueceu a senha?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <label
                htmlFor="remember"
                className="text-sm text-muted-foreground cursor-pointer"
              >
                Lembrar de mim
              </label>
            </div>
            
            <Button 
              type="submit" 
              className="w-full rounded-full py-6" 
              disabled={isLoading}
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Não tem uma conta?{" "}
              <Link to="/registro" className="text-primary hover:underline">
                Criar conta
              </Link>
            </p>
          </div>
        </div>
        
        <p className="text-xs text-center text-muted-foreground mt-8">
          Ao fazer login, você concorda com nossos{" "}
          <Link to="/termos" className="hover:underline">
            Termos de Serviço
          </Link>{" "}
          e{" "}
          <Link to="/privacidade" className="hover:underline">
            Política de Privacidade
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;
