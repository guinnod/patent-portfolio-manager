
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { AuthState, User } from "@/types";

interface AuthContextProps {
  authState: AuthState;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, surname: string, email: string, password: string) => Promise<void>;
}

const initialAuthState: AuthState = {
  isAuthenticated: false,
  user: null,
  isLoading: true,
  error: null,
};

const AuthContext = createContext<AuthContextProps>({
  authState: initialAuthState,
  login: async () => {},
  logout: () => {},
  register: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>(initialAuthState);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in from localStorage
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    
    if (storedUser && storedToken) {
      setAuthState({
        isAuthenticated: true,
        user: JSON.parse(storedUser),
        isLoading: false,
        error: null,
      });
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    try {
      // Mock login - in a real app this would call an API
      if (email === "test@example.com" && password === "password") {
        const mockUser: User = {
          id: "1",
          name: "Алибек",
          surname: "Кенесов",
          email: "test@example.com",
          phone: "+7 (701) 801-88-82"
        };
        
        localStorage.setItem("user", JSON.stringify(mockUser));
        localStorage.setItem("token", "mock-jwt-token");
        
        setAuthState({
          isAuthenticated: true,
          user: mockUser,
          isLoading: false,
          error: null,
        });
        
        toast({
          title: "Вход выполнен успешно",
          description: "Добро пожаловать в систему управления патентами.",
          variant: "default",
        });
      } else {
        throw new Error("Неверный email или пароль");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Произошла ошибка при входе";
      setAuthState({
        isAuthenticated: false,
        user: null,
        isLoading: false,
        error: errorMessage,
      });
      
      toast({
        title: "Ошибка входа",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    
    setAuthState({
      isAuthenticated: false,
      user: null,
      isLoading: false,
      error: null,
    });
    
    toast({
      title: "Выход выполнен",
      description: "Вы успешно вышли из системы.",
      variant: "default",
    });
  };

  const register = async (name: string, surname: string, email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    try {
      // Mock registration - in a real app this would call an API
      const mockUser: User = {
        id: "1",
        name,
        surname,
        email,
        phone: "",
      };
      
      localStorage.setItem("user", JSON.stringify(mockUser));
      localStorage.setItem("token", "mock-jwt-token");
      
      setAuthState({
        isAuthenticated: true,
        user: mockUser,
        isLoading: false,
        error: null,
      });
      
      toast({
        title: "Регистрация выполнена успешно",
        description: "Ваша учетная запись создана.",
        variant: "default",
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Произошла ошибка при регистрации";
      setAuthState({
        isAuthenticated: false,
        user: null,
        isLoading: false,
        error: errorMessage,
      });
      
      toast({
        title: "Ошибка регистрации",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
