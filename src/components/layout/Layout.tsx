
import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
  fullWidth?: boolean;
  showFooter?: boolean;
}

export function Layout({ children, fullWidth = false, showFooter = true }: LayoutProps) {
  const { authState } = useAuth();
  
  if (authState.isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-50">
        <Loader2 className="h-12 w-12 text-brand-DEFAULT animate-spin" />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className={`flex-grow ${fullWidth ? "" : "container mx-auto px-4"} pt-24 pb-10`}>
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
}
