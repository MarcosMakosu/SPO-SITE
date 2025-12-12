import { Link, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { cn } from "../lib/utils";
import { UserCog, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Layout() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-6">
        <div className="max-w-5xl mx-auto bg-white/90 backdrop-blur-md border border-white/20 rounded-full shadow-sm px-6 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-white p-1 rounded-full border border-stone-100 group-hover:border-primary/20 transition-colors">
              <img 
                src="https://customer-assets.emergentagent.com/job_6e125dd0-724d-42ad-90c4-2b3d56d9357e/artifacts/cf3fmqvu_IMG-20251201-WA0116.jpg" 
                alt="Logo Sociedade Paraense de Oftalmologia" 
                className="w-8 h-8 md:w-10 md:h-10 object-contain rounded-full"
              />
            </div>
            <span className="font-serif font-bold text-sm md:text-lg text-primary-900 tracking-tight leading-tight hidden md:block">
              Sociedade Paraense <br className="hidden lg:block"/> de Oftalmologia
            </span>
            <span className="font-serif font-bold text-sm text-primary-900 tracking-tight leading-tight md:hidden">
              S.P.O.
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1 md:gap-4">
            <NavLink to="/" active={isActive("/")}>Início</NavLink>
            <NavLink to="/directory" active={isActive("/directory")}>Diretório</NavLink>
            <Link 
              to="/admin" 
              className={cn(
                "ml-2 p-2 rounded-full transition-colors",
                isActive("/admin") ? "bg-primary/10 text-primary" : "text-stone-400 hover:text-primary hover:bg-stone-50"
              )}
              title="Área Administrativa"
            >
              <UserCog className="w-5 h-5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-primary-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
             {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileMenuOpen && (
           <div className="absolute top-20 left-4 right-4 bg-white rounded-2xl shadow-xl p-4 flex flex-col gap-2 md:hidden animate-in slide-in-from-top-4 duration-200 border border-stone-100">
             <Link 
               to="/" 
               className={cn("px-4 py-3 rounded-xl font-medium", isActive("/") ? "bg-primary/10 text-primary" : "text-stone-600")}
               onClick={() => setMobileMenuOpen(false)}
             >
               Início
             </Link>
             <Link 
               to="/directory" 
               className={cn("px-4 py-3 rounded-xl font-medium", isActive("/directory") ? "bg-primary/10 text-primary" : "text-stone-600")}
               onClick={() => setMobileMenuOpen(false)}
             >
               Diretório
             </Link>
             <Link 
               to="/admin" 
               className={cn("px-4 py-3 rounded-xl font-medium flex items-center gap-2", isActive("/admin") ? "bg-primary/10 text-primary" : "text-stone-600")}
               onClick={() => setMobileMenuOpen(false)}
             >
               <UserCog className="w-4 h-4" /> Acesso Admin
             </Link>
           </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-24 md:pt-32 pb-12 px-4 md:px-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-stone-100 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="font-serif font-bold text-lg text-primary-900">Sociedade Paraense de Oftalmologia</h3>
            <p className="text-stone-500 text-sm mt-2">Promovendo a saúde ocular no Pará.</p>
          </div>
          <div className="text-stone-400 text-sm">
            © {new Date().getFullYear()} S.P.O. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}

function NavLink({ to, children, active }) {
  return (
    <Link
      to={to}
      className={cn(
        "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
        active 
          ? "bg-primary text-white shadow-md" 
          : "text-stone-600 hover:text-primary hover:bg-primary/5"
      )}
    >
      {children}
    </Link>
  );
}
