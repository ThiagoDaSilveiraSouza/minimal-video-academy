
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Facebook, Twitter, Instagram, Linkedin, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-20 bg-background border-t border-border/50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <Link 
              to="/" 
              className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-700"
            >
              EduPrime
            </Link>
            <p className="text-sm text-muted-foreground">
              Transformando conhecimento em oportunidades com uma plataforma de cursos simples e elegante.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase mb-4">
              Navegação
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/" 
                  className="text-muted-foreground text-sm hover:text-primary transition-colors"
                >
                  Início
                </Link>
              </li>
              <li>
                <Link 
                  to="/cursos" 
                  className="text-muted-foreground text-sm hover:text-primary transition-colors"
                >
                  Cursos
                </Link>
              </li>
              <li>
                <Link 
                  to="/instrutores" 
                  className="text-muted-foreground text-sm hover:text-primary transition-colors"
                >
                  Instrutores
                </Link>
              </li>
              <li>
                <Link 
                  to="/planos" 
                  className="text-muted-foreground text-sm hover:text-primary transition-colors"
                >
                  Planos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/termos" 
                  className="text-muted-foreground text-sm hover:text-primary transition-colors"
                >
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link 
                  to="/privacidade" 
                  className="text-muted-foreground text-sm hover:text-primary transition-colors"
                >
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link 
                  to="/cookies" 
                  className="text-muted-foreground text-sm hover:text-primary transition-colors"
                >
                  Cookies
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase mb-4">
              Suporte
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/faq" 
                  className="text-muted-foreground text-sm hover:text-primary transition-colors"
                >
                  Perguntas Frequentes
                </Link>
              </li>
              <li>
                <Link 
                  to="/contato" 
                  className="text-muted-foreground text-sm hover:text-primary transition-colors"
                >
                  Contato
                </Link>
              </li>
              <li>
                <Link 
                  to="/ajuda" 
                  className="text-muted-foreground text-sm hover:text-primary transition-colors"
                >
                  Central de Ajuda
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <div className="mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} EduPrime. Todos os direitos reservados.
          </div>
          <div className="flex items-center">
            Feito com <Heart className="w-4 h-4 mx-1 text-red-500" /> para educação
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
