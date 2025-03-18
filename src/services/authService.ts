
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  User as FirebaseUser,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db, ACCESS_LEVELS } from "@/lib/firebase";
import { UserData } from "@/types/auth";

// Function to fetch user data from Firestore
export const fetchUserData = async (uid: string, email: string | null, setIsOfflineMode: (value: boolean) => void): Promise<UserData> => {
  try {
    const userDocRef = doc(db, "users", uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      return userDoc.data() as UserData;
    } else {
      // If no user data exists, create a document with free access level
      const newUserData: UserData = {
        email: email || "",
        accessLevel: ACCESS_LEVELS.FREE,
      };
      await setDoc(userDocRef, newUserData);
      return newUserData;
    }
  } catch (error) {
    console.error("Erro ao buscar dados do usuário:", error);
    // Fallback user data for offline mode
    setIsOfflineMode(true);
    return {
      email: email || "",
      accessLevel: ACCESS_LEVELS.FREE,
    };
  }
};

// Login function
export const loginUser = async (email: string, password: string): Promise<FirebaseUser> => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

// Register function
export const registerUser = async (email: string, password: string): Promise<FirebaseUser> => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  
  // Create user document with free access level
  const userDocRef = doc(db, "users", userCredential.user.uid);
  const userData: UserData = {
    email,
    accessLevel: ACCESS_LEVELS.FREE,
  };
  
  await setDoc(userDocRef, userData);
  return userCredential.user;
};

// Logout function
export const logoutUser = async (): Promise<void> => {
  await signOut(auth);
};

// Reset password function
export const resetUserPassword = async (email: string): Promise<void> => {
  await sendPasswordResetEmail(auth, email);
};

// Update user access level
export const updateAccessLevel = async (userId: string, accessLevel: string): Promise<void> => {
  const userDocRef = doc(db, "users", userId);
  await setDoc(userDocRef, { accessLevel }, { merge: true });
};

// Check user access level against required level
export const checkAccessLevel = (userLevel: string, requiredLevel: string, accessLevels: string[]): boolean => {
  if (userLevel === ACCESS_LEVELS.ADMIN) return true;
  
  const userLevelIndex = accessLevels.indexOf(userLevel);
  const requiredLevelIndex = accessLevels.indexOf(requiredLevel);
  
  return userLevelIndex >= requiredLevelIndex;
};
