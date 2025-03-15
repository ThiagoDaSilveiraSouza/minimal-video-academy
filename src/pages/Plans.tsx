
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const plansData = [
  {
    id: "basic",
    name: "Básico",
    description: "Ideal para estudantes e iniciantes",
    price: "R$ 29,90",
    period: "por mês",
    features: [
      "Acesso a 20+ cursos básicos",
      "Certificado de conclusão",
      "Suporte por email",
      "Acesso à comunidade básica",
      "1 download por curso"
    ],
    limitations: [
      "Sem acesso a cursos premium",
      "Sem aulas ao vivo",
      "Sem projetos práticos avançados"
    ],
    popular: false,
    buttonText: "Assinar plano Básico",
    buttonVariant: "outline" as const
  },
  {
    id: "pro",
    name: "Profissional",
    description: "Para profissionais que buscam se destacar",
    price: "R$ 59,90",
    period: "por mês",
    features: [
      "Acesso a 100+ cursos completos",
      "Certificados em todos os cursos",
      "Suporte prioritário",
      "Acesso à comunidade completa",
      "Downloads ilimitados",
      "8 aulas ao vivo por mês",
      "Projetos práticos com feedback"
    ],
    limitations: [
      "Sem acesso antecipado a novos cursos"
    ],
    popular: true,
    buttonText: "Assinar plano Profissional",
    buttonVariant: "default" as const
  },
  {
    id: "enterprise",
    name: "Empresarial",
    description: "Solução completa para equipes e empresas",
    price: "R$ 119,90",
    period: "por mês",
    features: [
      "Acesso a todos os cursos da plataforma",
      "Certificados e credenciais avançadas",
      "Suporte dedicado 24/7",
      "Comunidade exclusiva de líderes",
      "Downloads e recursos ilimitados",
      "Aulas ao vivo ilimitadas",
      "Mentorias mensais exclusivas",
      "Conteúdo antecipado",
      "Dashboard de progresso da equipe"
    ],
    limitations: [],
    popular: false,
    buttonText: "Fale com nossa equipe",
    buttonVariant: "outline" as const
  }
];

const PlanCard = ({ plan }: { plan: typeof plansData[0] }) => {
  return (
    <Card className={cn(
      "flex flex-col border-2 transition-all", 
      plan.popular ? "border-primary/50 shadow-lg shadow-primary/10" : "border-border"
    )}>
      {plan.popular && (
        <div className="bg-primary text-white text-xs font-semibold uppercase tracking-wide py-1 px-3 text-center">
          Mais Popular
        </div>
      )}
      <CardHeader className="pb-0">
        <div className="mb-1">
          <CardTitle className="text-2xl font-semibold">{plan.name}</CardTitle>
          <p className="text-sm text-muted-foreground">{plan.description}</p>
        </div>
        <div className="mt-4">
          <span className="text-3xl font-bold">{plan.price}</span>
          <span className="text-sm text-muted-foreground ml-1">{plan.period}</span>
        </div>
      </CardHeader>
      <CardContent className="flex-grow pt-6">
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-3">O que está incluído:</h4>
            <ul className="space-y-2">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex text-sm">
                  <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {plan.limitations.length > 0 && (
            <div className="pt-2">
              <h4 className="text-sm font-medium mb-3">Limitações:</h4>
              <ul className="space-y-2">
                {plan.limitations.map((limitation, i) => (
                  <li key={i} className="flex text-sm text-muted-foreground">
                    <HelpCircle className="h-4 w-4 shrink-0 mr-2" />
                    <span>{limitation}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-4">
        <Button 
          variant={plan.buttonVariant} 
          className={cn(
            "w-full", 
            plan.popular ? "py-6" : "py-5"
          )}
        >
          {plan.buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
};

const Plans = () => {
  return (
    <MainLayout>
      <div className="pt-28 pb-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Planos e Preços</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Escolha o plano ideal para suas necessidades e comece a aprender hoje mesmo
            </p>
          </div>

          <div className="flex gap-6 justify-center mb-10">
            <div className="bg-muted px-3 py-1 rounded-full flex items-center">
              <button className="px-4 py-2 rounded-full bg-background shadow-sm">Mensal</button>
              <button className="px-4 py-2 rounded-full">Anual</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plansData.map(plan => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <h3 className="text-xl font-semibold mb-3">Ainda com dúvidas?</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Oferecemos garantia de 7 dias de satisfação. Se você não ficar satisfeito, devolvemos seu dinheiro.
            </p>
            <Button variant="link" className="text-primary">
              Ver perguntas frequentes
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Plans;
