
import MainLayout from "@/layouts/MainLayout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";

const Privacy = () => {
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
              <BreadcrumbLink href="/privacidade" className="font-medium">
                Política de Privacidade
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="space-y-8 animate-fadeIn">
          <h1 className="text-3xl md:text-4xl font-bold">Política de Privacidade</h1>
          <p className="text-muted-foreground">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>

          <div className="prose prose-slate max-w-none">
            <h2 className="text-xl font-semibold mt-8 mb-4">1. Informações que Coletamos</h2>
            <p>
              Podemos coletar os seguintes tipos de informações:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>
                <strong>Informações pessoais:</strong> nome, endereço de e-mail, informações de contato e pagamento.
              </li>
              <li>
                <strong>Informações de uso:</strong> como você interage com nossa plataforma, incluindo cursos acessados, tempo gasto e progresso.
              </li>
              <li>
                <strong>Informações técnicas:</strong> endereço IP, tipo de navegador, dispositivo utilizado e dados de acesso.
              </li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">2. Como Usamos suas Informações</h2>
            <p>
              Utilizamos suas informações para:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Fornecer, manter e melhorar nossos serviços</li>
              <li>Processar pagamentos e gerenciar sua conta</li>
              <li>Personalizar sua experiência e recomendar conteúdo</li>
              <li>Comunicar-se com você sobre atualizações, ofertas e recursos</li>
              <li>Garantir a segurança da plataforma e detectar fraudes</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">3. Compartilhamento de Informações</h2>
            <p>
              Podemos compartilhar suas informações com:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Provedores de serviços que nos ajudam a operar a plataforma</li>
              <li>Parceiros de negócios, com seu consentimento</li>
              <li>Autoridades legais, quando exigido por lei</li>
            </ul>
            <p>
              Não vendemos ou alugamos suas informações pessoais a terceiros para fins de marketing.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">4. Segurança de Dados</h2>
            <p>
              Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações contra acesso 
              não autorizado, alteração, divulgação ou destruição. No entanto, nenhum método de transmissão pela Internet 
              ou armazenamento eletrônico é 100% seguro.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">5. Seus Direitos de Privacidade</h2>
            <p>
              Dependendo da sua localização, você pode ter direitos relacionados às suas informações pessoais, incluindo:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Acessar ou obter uma cópia das suas informações</li>
              <li>Corrigir informações imprecisas</li>
              <li>Excluir suas informações</li>
              <li>Restringir ou opor-se ao processamento de suas informações</li>
              <li>Portar suas informações para outro serviço</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">6. Cookies e Tecnologias Semelhantes</h2>
            <p>
              Utilizamos cookies e tecnologias semelhantes para melhorar a funcionalidade da plataforma, 
              analisar o tráfego e personalizar conteúdo. Você pode configurar seu navegador para recusar 
              cookies, mas isso pode afetar a funcionalidade de algumas partes da plataforma.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">7. Privacidade de Crianças</h2>
            <p>
              Nossa plataforma não é destinada a crianças menores de 13 anos, e não coletamos intencionalmente 
              informações pessoais de crianças menores de 13 anos.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">8. Alterações nesta Política</h2>
            <p>
              Podemos atualizar nossa Política de Privacidade periodicamente. Notificaremos você sobre mudanças 
              significativas por e-mail ou por meio de um aviso em nossa plataforma.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">9. Contato</h2>
            <p>
              Se você tiver dúvidas ou preocupações sobre nossa Política de Privacidade ou práticas de dados, 
              entre em contato conosco através do email: privacidade@eduprime.com
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Privacy;
