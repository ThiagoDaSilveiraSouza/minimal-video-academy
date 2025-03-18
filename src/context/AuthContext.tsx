import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, ACCESS_LEVELS, isUsingFallback } from "@/lib/firebase";
import { useToast } from "@/components/ui/use-toast";
import { UserData, AuthContextProps } from "@/types/auth";
import { 
  fetchUserData,
  loginUser,
  registerUser,
  logoutUser,
  resetUserPassword,
  updateAccessLevel,
  checkAccessLevel
} from "@/services/authService";

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOfflineMode, setIsOfflineMode] = useState(isUsingFallback);
  const { toast } = useToast();

  useEffect(() => {
    let unsubscribe = () => {};
    
    if (isOfflineMode) {
      setTimeout(() => {
        const demoUser = {
          uid: "demo-user",
          email: "demo@example.com",
          emailVerified: true,
        } as User;
        
        setUser(null);
        setUserData(null);
        setLoading(false);
      }, 500);
    } else {
      unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        try {
          if (currentUser) {
            setUser(currentUser);
            const data = await fetchUserData(currentUser.uid, currentUser.email, setIsOfflineMode);
            setUserData(data);
          } else {
            setUser(null);
            setUserData(null);
          }
        } catch (error) {
          console.error("Erro ao processar autenticação:", error);
          setIsOfflineMode(true);
        } finally {
          setLoading(false);
        }
      });
    }

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      if (isOfflineMode) {
        if (email === "demo@example.com" && password === "demo123") {
          const demoUser = {
            uid: "demo-user",
            email: "demo@example.com",
            emailVerified: true,
          } as User;
          
          setUser(demoUser);
          const demoUserData: UserData = {
            email: "demo@example.com",
            accessLevel: ACCESS_LEVELS.FREE,
          };
          setUserData(demoUserData);
          
          toast({
            title: "Login de demonstração",
            description: "Modo offline ativado. Alguns recursos estão limitados.",
          });
          return;
        } else {
          toast({
            title: "Erro ao fazer login",
            description: "No modo demo, use email: demo@example.com e senha: demo123",
            variant: "destructive",
          });
          throw new Error("Credenciais inválidas no modo demo");
        }
      } else {
        const user = await loginUser(email, password);
        const userData = await fetchUserData(user.uid, user.email, setIsOfflineMode);
        setUserData(userData);
        
        toast({
          title: "Login bem-sucedido!",
          description: "Você foi autenticado com sucesso.",
        });
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      
      toast({
        title: "Erro ao fazer login",
        description: isOfflineMode ? 
          "No modo demo, use email: demo@example.com e senha: demo123" :
          "Email ou senha incorretos.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const register = async (email: string, password: string) => {
    try {
      await registerUser(email, password);
      
      toast({
        title: "Conta criada com sucesso!",
        description: "Bem-vindo à plataforma EduPrime.",
      });
    } catch (error) {
      console.error("Erro ao criar conta:", error);
      toast({
        title: "Erro ao criar conta",
        description: "Verifique os dados informados e tente novamente.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      setUserData(null);
      toast({
        title: "Logout realizado",
        description: "Você saiu da sua conta.",
      });
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      toast({
        title: "Erro ao fazer logout",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await resetUserPassword(email);
      toast({
        title: "Email enviado",
        description: "Verifique sua caixa de entrada para redefinir sua senha.",
      });
    } catch (error) {
      console.error("Erro ao resetar senha:", error);
      toast({
        title: "Erro ao enviar email",
        description: "Verifique se o email informado está correto.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateUserAccessLevel = async (userId: string, accessLevel: string) => {
    try {
      if (isOfflineMode) {
        toast({
          title: "Operação indisponível",
          description: "Esta funcionalidade não está disponível no modo offline.",
          variant: "destructive",
        });
        return;
      }
      
      await updateAccessLevel(userId, accessLevel);

      if (user && user.uid === userId) {
        setUserData((prev) => (prev ? { ...prev, accessLevel } : null));
      }

      toast({
        title: "Nível de acesso atualizado",
        description: `O nível de acesso foi alterado para ${accessLevel}.`,
      });
    } catch (error) {
      console.error("Erro ao atualizar nível de acesso:", error);
      toast({
        title: "Erro na atualização",
        description: "Não foi possível atualizar o nível de acesso.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const hasAccess = (requiredLevel: string): boolean => {
    if (!user || !userData) return false;

    const accessLevels = [
      ACCESS_LEVELS.FREE,
      ACCESS_LEVELS.BASIC,
      ACCESS_LEVELS.PREMIUM,
      ACCESS_LEVELS.ADMIN,
    ];
    
    return checkAccessLevel(userData.accessLevel, requiredLevel, accessLevels);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userData,
        loading,
        login,
        register,
        logout,
        resetPassword,
        updateUserAccessLevel,
        hasAccess,
        isOfflineMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
