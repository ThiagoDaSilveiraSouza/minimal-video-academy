
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";

const benefits = [
  "Acesso a todos os cursos",
  "Certificados inclusos",
  "Suporte prioritário",
  "Atualizações gratuitas",
  "Comunidade exclusiva",
  "Garantia de 30 dias"
];

const CTASection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/90 to-blue-700">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full" 
                 style={{ 
                   backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)", 
                   backgroundSize: "20px 20px" 
                 }}>
            </div>
          </div>
          
          <div className="relative z-10 px-8 py-16 md:p-16 flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-10 md:mb-0 md:pr-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 animate-fadeIn">
                Comece sua jornada de aprendizado hoje mesmo
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-xl animate-fadeIn animation-delay-100">
                Invista em você mesmo com acesso ilimitado a cursos de alta qualidade ministrados por especialistas no assunto.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {benefits.map((benefit, index) => (
                  <div 
                    key={index} 
                    className="flex items-center animate-fadeIn" 
                    style={{ animationDelay: `${100 + (index * 100)}ms` }}
                  >
                    <CheckCircle className="h-5 w-5 mr-2 text-white" />
                    <span className="text-white">{benefit}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 animate-fadeIn animation-delay-300">
                <Link to="/registro">
                  <Button size="lg" className="w-full sm:w-auto bg-white text-primary hover:bg-white/90 rounded-full px-8">
                    Começar agora <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/planos">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="w-full sm:w-auto text-white border-white hover:bg-white/10 rounded-full px-8"
                  >
                    Ver planos e preços
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="md:w-1/3 relative animate-fadeIn animation-delay-200">
              <div className="relative z-10">
                <div className="relative bg-white rounded-xl shadow-xl overflow-hidden">
                  <div className="p-1 bg-gradient-to-r from-blue-500 to-primary">
                    <div className="bg-white p-1 rounded-lg">
                      <div className="p-6 space-y-6">
                        <div className="space-y-2">
                          <div className="h-6 w-28 bg-primary/10 rounded-full"></div>
                          <div className="h-10 w-full bg-gray-100 rounded-lg"></div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="h-6 w-32 bg-primary/10 rounded-full"></div>
                          <div className="h-10 w-full bg-gray-100 rounded-lg"></div>
                        </div>
                        
                        <div className="h-14 w-full bg-primary/90 rounded-lg flex items-center justify-center">
                          <div className="h-4 w-28 bg-white/80 rounded-full"></div>
                        </div>
                        
                        <div className="h-4 w-full bg-gray-100 rounded-full"></div>
                        <div className="h-4 w-3/4 bg-gray-100 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
                <div className="absolute -top-12 -left-12 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
