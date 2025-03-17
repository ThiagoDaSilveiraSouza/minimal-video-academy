
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";

const coursesData = [
  {
    title: "Desenvolvimento Web Completo",
    description: "Aprenda HTML, CSS, JavaScript, React, Node.js e mais",
    instructor: "João Silva",
    rating: 4.8,
    students: 1253,
    duration: "40 horas",
    level: "Iniciante",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=500&auto=format&fit=crop",
    featured: true,
    price: 197.00,
    modules: [
      {
        title: "Introdução ao HTML5",
        duration: "4 horas",
        lessons: [
          { title: "Estrutura básica do HTML", duration: "25 min" },
          { title: "Tags e atributos", duration: "30 min" },
          { title: "Semântica no HTML5", duration: "40 min" }
        ]
      },
      {
        title: "CSS Moderno",
        duration: "6 horas",
        lessons: [
          { title: "Seletores e propriedades", duration: "35 min" },
          { title: "Flexbox e Grid", duration: "45 min" },
          { title: "Responsividade", duration: "50 min" }
        ]
      }
    ]
  },
  {
    title: "Marketing Digital",
    description: "Domine estratégias de SEO, mídias sociais e tráfego pago",
    instructor: "Ana Costa",
    rating: 4.9,
    students: 987,
    duration: "32 horas",
    level: "Intermediário",
    image: "https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=500&auto=format&fit=crop",
    featured: true,
    price: 219.00,
    modules: [
      {
        title: "Fundamentos de SEO",
        duration: "5 horas",
        lessons: [
          { title: "Pesquisa de palavras-chave", duration: "40 min" },
          { title: "Otimização on-page", duration: "35 min" },
          { title: "Link building", duration: "45 min" }
        ]
      },
      {
        title: "Marketing de Conteúdo",
        duration: "4 horas",
        lessons: [
          { title: "Estratégia de conteúdo", duration: "30 min" },
          { title: "Criação de blog", duration: "40 min" },
          { title: "Métricas e análise", duration: "35 min" }
        ]
      }
    ]
  },
  {
    title: "Excel Avançado",
    description: "Fórmulas avançadas, dashboards e automação com VBA",
    instructor: "Carlos Mendes",
    rating: 4.7,
    students: 785,
    duration: "24 horas",
    level: "Avançado",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=500&auto=format&fit=crop",
    featured: false,
    price: 179.00,
    modules: [
      {
        title: "Fórmulas Avançadas",
        duration: "6 horas",
        lessons: [
          { title: "PROCV e PROCH", duration: "30 min" },
          { title: "Funções de texto e data", duration: "45 min" },
          { title: "Funções lógicas", duration: "40 min" }
        ]
      },
      {
        title: "Tabelas Dinâmicas",
        duration: "4 horas",
        lessons: [
          { title: "Criação de tabelas dinâmicas", duration: "35 min" },
          { title: "Campos calculados", duration: "30 min" },
          { title: "Gráficos dinâmicos", duration: "40 min" }
        ]
      }
    ]
  },
  {
    title: "Produtividade e Gestão do Tempo",
    description: "Técnicas e métodos para otimizar seu tempo e produtividade",
    instructor: "Mariana Alves",
    rating: 4.6,
    students: 632,
    duration: "18 horas",
    level: "Todos os níveis",
    image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?q=80&w=500&auto=format&fit=crop",
    featured: false,
    price: 149.00,
    modules: [
      {
        title: "Fundamentos da Produtividade",
        duration: "3 horas",
        lessons: [
          { title: "Princípios da produtividade", duration: "25 min" },
          { title: "Definição de objetivos", duration: "30 min" },
          { title: "Criação de hábitos", duration: "35 min" }
        ]
      },
      {
        title: "Técnicas de Gestão do Tempo",
        duration: "4 horas",
        lessons: [
          { title: "Método Pomodoro", duration: "20 min" },
          { title: "Matriz de Eisenhower", duration: "25 min" },
          { title: "GTD (Getting Things Done)", duration: "30 min" }
        ]
      }
    ]
  },
  {
    title: "Introdução à Inteligência Artificial",
    description: "Conceitos fundamentais de IA, machine learning e aplicações",
    instructor: "Ricardo Lopes",
    rating: 4.9,
    students: 1089,
    duration: "36 horas",
    level: "Intermediário",
    image: "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?q=80&w=500&auto=format&fit=crop",
    featured: true,
    price: 249.00,
    modules: [
      {
        title: "Fundamentos de IA",
        duration: "5 horas",
        lessons: [
          { title: "História da IA", duration: "35 min" },
          { title: "Tipos de IA", duration: "40 min" },
          { title: "Aplicações práticas", duration: "45 min" }
        ]
      },
      {
        title: "Machine Learning",
        duration: "7 horas",
        lessons: [
          { title: "Aprendizado supervisionado", duration: "50 min" },
          { title: "Aprendizado não supervisionado", duration: "45 min" },
          { title: "Redes neurais", duration: "60 min" }
        ]
      }
    ]
  },
  {
    title: "Fotografia para Iniciantes",
    description: "Aprenda composição, iluminação e edição de imagens",
    instructor: "Luciana Ferreira",
    rating: 4.8,
    students: 845,
    duration: "28 horas",
    level: "Iniciante",
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=500&auto=format&fit=crop",
    featured: true,
    price: 189.00,
    modules: [
      {
        title: "Fundamentos da Fotografia",
        duration: "4 horas",
        lessons: [
          { title: "Tipos de câmeras", duration: "30 min" },
          { title: "Exposição (ISO, abertura, velocidade)", duration: "45 min" },
          { title: "Composição básica", duration: "40 min" }
        ]
      },
      {
        title: "Iluminação",
        duration: "5 horas",
        lessons: [
          { title: "Luz natural", duration: "35 min" },
          { title: "Luz artificial", duration: "40 min" },
          { title: "Técnicas de iluminação", duration: "50 min" }
        ]
      }
    ]
  }
];

export const seedDatabase = async () => {
  try {
    const coursesRef = collection(db, "courses");
    
    // Adiciona cada curso ao Firestore
    for (const course of coursesData) {
      await addDoc(coursesRef, course);
      console.log(`Curso "${course.title}" adicionado com sucesso!`);
    }
    
    console.log("Banco de dados populado com sucesso!");
    return true;
  } catch (error) {
    console.error("Erro ao popular banco de dados:", error);
    return false;
  }
};
