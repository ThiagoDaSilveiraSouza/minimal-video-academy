
import { User as FirebaseUser } from "firebase/auth";

// User type with additional information
export type User = FirebaseUser & {
  accessLevel?: string;
  displayName?: string | null;
};

// User data structure stored in Firestore
export interface UserData {
  accessLevel: string;
  email: string;
  displayName?: string;
}

// Auth context properties interface
export interface AuthContextProps {
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
