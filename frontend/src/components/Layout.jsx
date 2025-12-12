import { Link, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { cn } from "../lib/utils";
import { Stethoscope, UserCog, Search } from "lucide-react";

export default function Layout() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-6">
        <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-md border border-white/20 rounded-full shadow-sm px-6 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-primary/10 p-2 rounded-full group-hover:bg-primary/20 transition-colors">
              <Stethoscope className="w-6 h-6 text-primary" />
            </div>
            <span className="font-serif font-bold text-xl text-primary-900 tracking-tight">
              MedAssoc
            </span>
          </Link>

          <div className="flex items-center gap-1 md:gap-4">
            <NavLink to="/" active={isActive("/")}>Home</NavLink>
            <NavLink to="/directory" active={isActive("/directory")}>Directory</NavLink>
            <Link 
              to="/admin" 
              className={cn(
                "ml-2 p-2 rounded-full transition-colors",
                isActive("/admin") ? "bg-primary/10 text-primary" : "text-stone-400 hover:text-primary hover:bg-stone-50"
              )}
            >
              <UserCog className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-24 md:pt-32 pb-12 px-4 md:px-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-stone-100 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="font-serif font-bold text-lg text-primary-900">Medical Association</h3>
            <p className="text-stone-500 text-sm mt-2">Advancing healthcare, together.</p>
          </div>
          <div className="text-stone-400 text-sm">
            © {new Date().getFullYear()} MedAssoc. All rights reserved.
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
