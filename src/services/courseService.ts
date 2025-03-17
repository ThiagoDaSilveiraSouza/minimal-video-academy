
import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  query, 
  where, 
  limit, 
  orderBy,
  addDoc,
  updateDoc,
  deleteDoc,
  DocumentData
} from "firebase/firestore";
import { db } from "@/lib/firebase";

// Tipos
export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  rating: number;
  students: number;
  duration: string;
  level: string;
  image: string;
  price?: number;
  modules?: CourseModule[];
}

export interface CourseModule {
  id: string;
  title: string;
  duration: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl?: string;
  completed?: boolean;
}

// Converter documento do Firestore para o tipo Course
const courseConverter = (doc: DocumentData): Course => {
  const data = doc.data();
  return {
    id: doc.id,
    title: data.title,
    description: data.description,
    instructor: data.instructor,
    rating: data.rating,
    students: data.students,
    duration: data.duration,
    level: data.level,
    image: data.image,
    price: data.price,
    modules: data.modules
  };
};

// Obter todos os cursos
export const getAllCourses = async (): Promise<Course[]> => {
  try {
    const coursesRef = collection(db, "courses");
    const querySnapshot = await getDocs(coursesRef);
    
    return querySnapshot.docs.map(doc => courseConverter(doc));
  } catch (error) {
    console.error("Erro ao buscar cursos:", error);
    return [];
  }
};

// Obter cursos em destaque
export const getFeaturedCourses = async (limit: number = 6): Promise<Course[]> => {
  try {
    const coursesRef = collection(db, "courses");
    const q = query(
      coursesRef,
      where("featured", "==", true),
      orderBy("rating", "desc"),
      limit
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => courseConverter(doc));
  } catch (error) {
    console.error("Erro ao buscar cursos em destaque:", error);
    return [];
  }
};

// Obter um curso pelo ID
export const getCourseById = async (courseId: string): Promise<Course | null> => {
  try {
    const courseRef = doc(db, "courses", courseId);
    const courseSnap = await getDoc(courseRef);
    
    if (courseSnap.exists()) {
      return courseConverter(courseSnap);
    } else {
      console.log("Curso não encontrado!");
      return null;
    }
  } catch (error) {
    console.error("Erro ao buscar curso:", error);
    return null;
  }
};

// Adicionar um novo curso
export const addCourse = async (courseData: Omit<Course, "id">): Promise<string | null> => {
  try {
    const coursesRef = collection(db, "courses");
    const newCourseRef = await addDoc(coursesRef, courseData);
    return newCourseRef.id;
  } catch (error) {
    console.error("Erro ao adicionar curso:", error);
    return null;
  }
};

// Atualizar um curso
export const updateCourse = async (courseId: string, courseData: Partial<Course>): Promise<boolean> => {
  try {
    const courseRef = doc(db, "courses", courseId);
    await updateDoc(courseRef, courseData);
    return true;
  } catch (error) {
    console.error("Erro ao atualizar curso:", error);
    return false;
  }
};

// Excluir um curso
export const deleteCourse = async (courseId: string): Promise<boolean> => {
  try {
    const courseRef = doc(db, "courses", courseId);
    await deleteDoc(courseRef);
    return true;
  } catch (error) {
    console.error("Erro ao excluir curso:", error);
    return false;
  }
};
