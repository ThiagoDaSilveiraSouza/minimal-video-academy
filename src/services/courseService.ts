import { collection, getDocs, getDoc, doc, query, where, addDoc, updateDoc, deleteDoc, QueryConstraint } from "firebase/firestore";
import { db, ACCESS_LEVELS } from "@/lib/firebase";

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
  accessLevel: string;
}

const COLLECTION_NAME = "courses";

// Dados fallback para quando o banco de dados não estiver disponível
const fallbackCourses: Course[] = [
  {
    id: "fallback-1",
    title: "Desenvolvimento Web Completo",
    description: "Aprenda HTML, CSS, JavaScript, React, Node.js e mais",
    instructor: "João Silva",
    rating: 4.8,
    students: 1253,
    duration: "40 horas",
    level: "Iniciante",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=500&auto=format&fit=crop",
    accessLevel: ACCESS_LEVELS.FREE
  },
  {
    id: "fallback-2",
    title: "Marketing Digital",
    description: "Domine estratégias de SEO, mídias sociais e tráfego pago",
    instructor: "Ana Costa",
    rating: 4.9,
    students: 987,
    duration: "32 horas",
    level: "Intermediário",
    image: "https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=500&auto=format&fit=crop",
    accessLevel: ACCESS_LEVELS.FREE
  },
  {
    id: "fallback-3",
    title: "Excel Avançado",
    description: "Fórmulas avançadas, dashboards e automação com VBA",
    instructor: "Carlos Mendes",
    rating: 4.7,
    students: 785,
    duration: "24 horas",
    level: "Avançado",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=500&auto=format&fit=crop",
    accessLevel: ACCESS_LEVELS.BASIC
  },
  {
    id: "fallback-4",
    title: "Introdução à Inteligência Artificial",
    description: "Conceitos fundamentais de IA, machine learning e aplicações",
    instructor: "Ricardo Lopes",
    rating: 4.9,
    students: 1089,
    duration: "36 horas",
    level: "Intermediário",
    image: "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?q=80&w=500&auto=format&fit=crop",
    accessLevel: ACCESS_LEVELS.PREMIUM
  }
];

// Função para buscar todos os cursos
export const getAllCourses = async (): Promise<Course[]> => {
  try {
    const coursesCollection = collection(db, COLLECTION_NAME);
    const courseSnapshot = await getDocs(coursesCollection);
    const courseList = courseSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Course[];
    
    return courseList.length > 0 ? courseList : fallbackCourses;
  } catch (error) {
    console.error("Erro ao buscar cursos:", error);
    return fallbackCourses;
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
    
    if (courseList.length === 0) {
      return fallbackCourses.filter(course => course.accessLevel === accessLevel);
    }
    
    return courseList;
  } catch (error) {
    console.error(`Erro ao buscar cursos com nível de acesso ${accessLevel}:`, error);
    return fallbackCourses.filter(course => course.accessLevel === accessLevel);
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
      // Verificar se existe nos cursos fallback
      const fallbackCourse = fallbackCourses.find(course => course.id === courseId);
      if (fallbackCourse) {
        return fallbackCourse;
      }
      
      console.log(`Curso com ID ${courseId} não encontrado.`);
      return null;
    }
  } catch (error) {
    console.error(`Erro ao buscar curso com ID ${courseId}:`, error);
    // Buscar nos dados de fallback
    const fallbackCourse = fallbackCourses.find(course => course.id === courseId);
    return fallbackCourse || null;
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
