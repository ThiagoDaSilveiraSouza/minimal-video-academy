
import MainLayout from "@/layouts/MainLayout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";

const Terms = () => {
  return (
    <MainLayout>
      <div className="pt-28 pb-20 px-6 md:px-12 max-w-4xl mx-auto">
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <Home className="h-4 w-4 mr-1" />
                Início
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/termos" className="font-medium">
                Termos de Serviço
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="space-y-8 animate-fadeIn">
          <h1 className="text-3xl md:text-4xl font-bold">Termos de Serviço</h1>
          <p className="text-muted-foreground">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>

          <div className="prose prose-slate max-w-none">
            <h2 className="text-xl font-semibold mt-8 mb-4">1. Aceitação dos Termos</h2>
            <p>
              Ao acessar ou usar a plataforma EduPrime, você concorda em cumprir e estar vinculado a estes Termos de Serviço. 
              Se você não concordar com qualquer parte destes termos, não poderá acessar ou usar nossos serviços.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">2. Descrição do Serviço</h2>
            <p>
              A EduPrime é uma plataforma de educação online que oferece cursos, conteúdos e recursos educacionais. 
              Nos reservamos o direito de modificar, suspender ou descontinuar qualquer aspecto do serviço a qualquer momento.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">3. Contas de Usuário</h2>
            <p>
              Para acessar certos recursos da plataforma, você precisará criar uma conta. Você é responsável por manter a 
              confidencialidade de suas credenciais e por todas as atividades realizadas em sua conta.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">4. Pagamentos e Assinaturas</h2>
            <p>
              Alguns cursos ou recursos podem exigir pagamento ou assinatura. Os preços e termos de pagamento serão claramente 
              informados antes da compra. Reembolsos estão sujeitos à nossa política de reembolso em vigor no momento da compra.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">5. Propriedade Intelectual</h2>
            <p>
              Todo o conteúdo disponível na plataforma, incluindo cursos, vídeos, textos e materiais relacionados, está 
              protegido por direitos autorais e outras leis de propriedade intelectual. Você não pode reproduzir, distribuir 
              ou criar trabalhos derivados desse conteúdo sem autorização expressa.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">6. Conduta do Usuário</h2>
            <p>
              Você concorda em usar a plataforma apenas para fins legais e de maneira que não infrinja os direitos de 
              terceiros. Comportamentos proibidos incluem disseminação de conteúdo ilegal, invasão de privacidade, 
              assédio e qualquer atividade que possa prejudicar a plataforma ou outros usuários.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">7. Limitação de Responsabilidade</h2>
            <p>
              A EduPrime não será responsável por danos indiretos, incidentais, especiais, consequenciais ou punitivos 
              decorrentes do uso ou incapacidade de usar nossos serviços.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">8. Modificações dos Termos</h2>
            <p>
              Podemos atualizar estes Termos de Serviço periodicamente. Continuando a usar a plataforma após tais 
              modificações, você concorda com os termos revisados.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">9. Lei Aplicável</h2>
            <p>
              Estes termos serão regidos e interpretados de acordo com as leis do Brasil, independentemente de 
              conflitos de disposições legais.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">10. Contato</h2>
            <p>
              Se você tiver dúvidas sobre estes Termos de Serviço, entre em contato conosco através do email: 
              suporte@eduprime.com
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Terms;
