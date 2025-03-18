
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

console.log("firebaseConfig", firebaseConfig);

// Variável para controlar se estamos em modo de fallback
let isUsingFallback = false;

// Initialize Firebase with error handling
let app, auth, db;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  
  // Tenta verificar conexão com o Firestore
  const connectionTimeout = setTimeout(() => {
    console.warn("Timeout ao conectar com Firebase, usando modo fallback");
    isUsingFallback = true;
  }, 5000); // 5 segundos de timeout
  
  // Limpa o timeout se a conexão for bem-sucedida
  db.app.INTERNAL.getToken()
    .then(() => clearTimeout(connectionTimeout))
    .catch(() => {
      isUsingFallback = true;
      clearTimeout(connectionTimeout);
    });
  
} catch (error) {
  console.error("Erro ao inicializar Firebase:", error);
  isUsingFallback = true;
  
  // Inicializa com valores de fallback se ocorrer um erro
  try {
    app = initializeApp({ projectId: 'fallback-project' });
    auth = getAuth(app);
    db = getFirestore(app);
  } catch (fallbackError) {
    console.error("Erro crítico:", fallbackError);
    // Cria objetos mock básicos para evitar erros
    auth = {} as any;
    db = {} as any;
  }
}

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
