
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXH7JgXIWzi76QEuPf1YS0irbLFfpDMyw",
  authDomain: "eduprime-platform.firebaseapp.com",
  projectId: "eduprime-platform",
  storageBucket: "eduprime-platform.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123def456ghi789jkl"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

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
