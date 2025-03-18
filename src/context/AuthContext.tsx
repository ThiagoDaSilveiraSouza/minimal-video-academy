
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User as FirebaseUser,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, db, ACCESS_LEVELS } from "@/lib/firebase";
import { useToast } from "@/components/ui/use-toast";
import { doc, getDoc, setDoc } from "firebase/firestore";

// Interface para o usuário com informações adicionais
type User = FirebaseUser & {
  accessLevel?: string;
  displayName?: string | null;
};

interface UserData {
  accessLevel: string;
  email: string;
  displayName?: string;
}

interface AuthContextProps {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserAccessLevel: (userId: string, accessLevel: string) => Promise<void>;
  hasAccess: (requiredLevel: string) => boolean;
  isOfflineMode: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const { toast } = useToast();

  // Função para buscar dados adicionais do usuário no Firestore
  const fetchUserData = async (uid: string) => {
    try {
      const userDocRef = doc(db, "users", uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data() as UserData;
        setUserData(userData);
        return userData;
      } else {
        // Se não houver dados do usuário, cria um documento com nível de acesso gratuito
        const newUserData: UserData = {
          email: user?.email || "",
          accessLevel: ACCESS_LEVELS.FREE,
        };
        await setDoc(userDocRef, newUserData);
        setUserData(newUserData);
        return newUserData;
      }
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
      // Em caso de erro, configura um usuário com nível gratuito
      const fallbackUserData: UserData = {
        email: user?.email || "",
        accessLevel: ACCESS_LEVELS.FREE,
      };
      setUserData(fallbackUserData);
      setIsOfflineMode(true);
      toast({
        title: "Modo offline ativado",
        description: "Alguns recursos podem estar limitados",
        variant: "destructive",
      });
      return fallbackUserData;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (currentUser) {
          setUser(currentUser);
          await fetchUserData(currentUser.uid);
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

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      await fetchUserData(userCredential.user.uid);
      toast({
        title: "Login bem-sucedido!",
        description: "Você foi autenticado com sucesso.",
      });
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      // Permitir login offline com conta de demonstração
      if (email === "demo@example.com" && password === "demo123") {
        const demoUser = {
          uid: "demo-user",
          email: "demo@example.com",
          emailVerified: true,
        } as FirebaseUser;
        
        setUser(demoUser);
        const demoUserData: UserData = {
          email: "demo@example.com",
          accessLevel: ACCESS_LEVELS.FREE,
        };
        setUserData(demoUserData);
        setIsOfflineMode(true);
        
        toast({
          title: "Login de demonstração",
          description: "Modo offline ativado. Alguns recursos estão limitados.",
        });
        return;
      }
      
      toast({
        title: "Erro ao fazer login",
        description: "Email ou senha incorretos.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Criar documento do usuário com nível de acesso gratuito
      const userDocRef = doc(db, "users", userCredential.user.uid);
      const userData: UserData = {
        email,
        accessLevel: ACCESS_LEVELS.FREE,
      };

      await setDoc(userDocRef, userData);
      setUserData(userData);

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
      await signOut(auth);
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
      await sendPasswordResetEmail(auth, email);
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

  // Função para atualizar o nível de acesso do usuário
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
      
      const userDocRef = doc(db, "users", userId);
      await setDoc(userDocRef, { accessLevel }, { merge: true });

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

  // Função para verificar se o usuário tem um determinado nível de acesso
  const hasAccess = (requiredLevel: string): boolean => {
    if (!user || !userData) return false;

    const accessLevels = [
      ACCESS_LEVELS.FREE,
      ACCESS_LEVELS.BASIC,
      ACCESS_LEVELS.PREMIUM,
      ACCESS_LEVELS.ADMIN,
    ];
    const userLevelIndex = accessLevels.indexOf(userData.accessLevel);
    const requiredLevelIndex = accessLevels.indexOf(requiredLevel);

    // Se o usuário for admin, tem acesso a tudo
    if (userData.accessLevel === ACCESS_LEVELS.ADMIN) return true;

    // Caso contrário, verifica se o nível do usuário é maior ou igual ao nível requerido
    return userLevelIndex >= requiredLevelIndex;
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
