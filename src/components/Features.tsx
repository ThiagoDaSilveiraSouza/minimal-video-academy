
import { Play, FileText, Award, Users, BookOpen, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Play,
    title: "Aulas em vídeo HD",
    description: "Conteúdo gravado em alta definição para você aprender com clareza e qualidade visual excepcional."
  },
  {
    icon: FileText,
    title: "Material complementar",
    description: "Recursos adicionais para aprofundar seus conhecimentos e praticar o que aprendeu nas aulas."
  },
  {
    icon: Award,
    title: "Certificado reconhecido",
    description: "Ao concluir o curso, receba um certificado que valoriza seu currículo e comprova suas novas habilidades."
  },
  {
    icon: Users,
    title: "Comunidade de alunos",
    description: "Conecte-se com outros estudantes, compartilhe experiências e amplie seu networking profissional."
  },
  {
    icon: BookOpen,
    title: "Atualização constante",
    description: "Conteúdo sempre atualizado para acompanhar as tendências e novidades do mercado."
  },
  {
    icon: Clock,
    title: "Acesso vitalício",
    description: "Estude quando e onde quiser, com acesso permanente ao curso após a compra."
  }
];

const Features = () => {
  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-secondary/30 opacity-50" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl font-bold animate-fadeIn">Por que escolher nossa plataforma?</h2>
          <p className="text-muted-foreground animate-fadeIn animation-delay-100">
            Uma experiência de aprendizado diferenciada com recursos que realmente fazem a diferença.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={cn(
                "glass rounded-2xl p-8 border border-white/20 animate-fadeIn",
                "transition duration-300 hover:shadow-lg hover:-translate-y-1"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-primary/10 rounded-xl w-12 h-12 flex items-center justify-center mb-6">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
