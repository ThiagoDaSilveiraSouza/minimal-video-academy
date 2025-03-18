
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Definir que estamos usando o modo offline por padrão
let isUsingFallback = true;

console.log("Usando aplicação em modo offline");

// Inicializa com valores de fallback
const app = initializeApp({ projectId: 'fallback-project' });
const auth = {} as any;
const db = {} as any;

// Exporta as variáveis
export { auth, db, isUsingFallback };

// Níveis de acesso da aplicação
export const ACCESS_LEVELS = {
  FREE: "free",
  BASIC: "basic",
  PREMIUM: "premium",
  ADMIN: "admin"
};

// Função para mapear níveis de acesso para valores legíveis
export const accessLevelNames = {
  [ACCESS_LEVELS.FREE]: "Gratuito",
  [ACCESS_LEVELS.BASIC]: "Básico",
  [ACCESS_LEVELS.PREMIUM]: "Premium",
  [ACCESS_LEVELS.ADMIN]: "Administrador"
};
