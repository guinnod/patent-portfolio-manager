
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { authState, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  // Check if current path matches the given path
  const isActive = (path: string) => location.pathname === path;

  // Handle scroll event to change header appearance
  useState(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-brand-DEFAULT shadow-md py-2" 
          : "bg-brand-DEFAULT/95 backdrop-blur-sm py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="logo text-white font-bold text-2xl flex items-center gap-2"
        >
          <span className="text-3xl">QB</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            to="/patents" 
            className={`nav-link text-white/90 hover:text-white transition-colors ${isActive("/patents") ? "active" : ""}`}
          >
            Мои Объекты
          </Link>
          <Link 
            to="/register-ip" 
            className={`nav-link text-white/90 hover:text-white transition-colors ${isActive("/register-ip") ? "active" : ""}`}
          >
            Регистрация ИС
          </Link>
        </nav>

        {/* Auth Section */}
        <div className="flex items-center gap-4">
          {authState.isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="relative h-10 w-10 rounded-full hover:bg-brand-light/40 transition-colors"
                >
                  <Avatar className="h-10 w-10 border-2 border-white/20">
                    <AvatarImage src={authState.user?.photoUrl} />
                    <AvatarFallback className="bg-brand-lighter text-white">
                      {authState.user?.name.charAt(0)}{authState.user?.surname.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-1 animate-slide-down">
                <div className="flex items-center justify-start p-2">
                  <div className="flex flex-col space-y-0.5">
                    <p className="text-sm font-medium">{authState.user?.name} {authState.user?.surname}</p>
                    <p className="text-xs text-muted-foreground">{authState.user?.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="cursor-pointer"
                  onClick={() => navigate("/profile")}
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Личный Кабинет</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="cursor-pointer text-red-500"
                  onClick={logout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Выйти</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/login">
                <Button 
                  variant="outline" 
                  className="text-white border-white/30 hover:bg-white/10 hover:text-white"
                >
                  Регистрация
                </Button>
              </Link>
              <Link to="/login">
                <Button 
                  className="bg-white text-brand-DEFAULT hover:bg-white/90"
                >
                  Войти
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
