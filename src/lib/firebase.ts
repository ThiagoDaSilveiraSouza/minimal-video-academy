
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Define we're using offline mode by default
export const isUsingFallback = true;

console.log("Usando aplicação em modo offline (demo)");

// Initialize with fallback values
const firebaseConfig = { 
  projectId: 'fallback-project',
  apiKey: 'fallback-key',
  authDomain: 'fallback-project.firebaseapp.com',
  storageBucket: 'fallback-project.appspot.com',
  messagingSenderId: '000000000000',
  appId: '1:000000000000:web:0000000000000000000000'
};

// Initialize Firebase with fallback config
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Export the variables
export { auth, db };

// Application access levels
export const ACCESS_LEVELS = {
  FREE: "free",
  BASIC: "basic",
  PREMIUM: "premium",
  ADMIN: "admin"
};

// Function to map access levels to readable values
export const accessLevelNames = {
  [ACCESS_LEVELS.FREE]: "Gratuito",
  [ACCESS_LEVELS.BASIC]: "Básico",
  [ACCESS_LEVELS.PREMIUM]: "Premium",
  [ACCESS_LEVELS.ADMIN]: "Administrador"
};
