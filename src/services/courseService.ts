
import { collection, getDocs, getDoc, doc, query, where, addDoc, updateDoc, deleteDoc, QueryConstraint } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: string;
  rating: number;
  students: number;
  image: string;
  accessLevel: string; // Adicionado campo de nível de acesso
}

const COLLECTION_NAME = "courses";

// Função para buscar todos os cursos
export const getAllCourses = async (): Promise<Course[]> => {
  try {
    const coursesCollection = collection(db, COLLECTION_NAME);
    const courseSnapshot = await getDocs(coursesCollection);
    const courseList = courseSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Course[];
    
    return courseList;
  } catch (error) {
    console.error("Erro ao buscar cursos:", error);
    return [];
  }
};

// Função para buscar cursos por nível de acesso
export const getCoursesByAccessLevel = async (accessLevel: string): Promise<Course[]> => {
  try {
    const coursesCollection = collection(db, COLLECTION_NAME);
    const accessLevelQuery = query(
      coursesCollection, 
      where("accessLevel", "==", accessLevel)
    );
    
    const courseSnapshot = await getDocs(accessLevelQuery);
    const courseList = courseSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Course[];
    
    return courseList;
  } catch (error) {
    console.error(`Erro ao buscar cursos com nível de acesso ${accessLevel}:`, error);
    return [];
  }
};

// Função para buscar um curso específico por ID
export const getCourseById = async (courseId: string): Promise<Course | null> => {
  try {
    const courseDoc = doc(db, COLLECTION_NAME, courseId);
    const courseSnapshot = await getDoc(courseDoc);
    
    if (courseSnapshot.exists()) {
      return {
        id: courseSnapshot.id,
        ...courseSnapshot.data()
      } as Course;
    } else {
      console.log(`Curso com ID ${courseId} não encontrado.`);
      return null;
    }
  } catch (error) {
    console.error(`Erro ao buscar curso com ID ${courseId}:`, error);
    return null;
  }
};

// Função para adicionar um novo curso
export const addCourse = async (courseData: Omit<Course, "id">): Promise<string | null> => {
  try {
    const coursesCollection = collection(db, COLLECTION_NAME);
    const docRef = await addDoc(coursesCollection, courseData);
    return docRef.id;
  } catch (error) {
    console.error("Erro ao adicionar curso:", error);
    return null;
  }
};

// Função para atualizar um curso existente
export const updateCourse = async (courseId: string, courseData: Partial<Course>): Promise<boolean> => {
  try {
    const courseDoc = doc(db, COLLECTION_NAME, courseId);
    await updateDoc(courseDoc, courseData);
    return true;
  } catch (error) {
    console.error(`Erro ao atualizar curso com ID ${courseId}:`, error);
    return false;
  }
};

// Função para excluir um curso
export const deleteCourse = async (courseId: string): Promise<boolean> => {
  try {
    const courseDoc = doc(db, COLLECTION_NAME, courseId);
    await deleteDoc(courseDoc);
    return true;
  } catch (error) {
    console.error(`Erro ao excluir curso com ID ${courseId}:`, error);
    return false;
  }
};
