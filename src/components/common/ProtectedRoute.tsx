
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { authState } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!authState.isAuthenticated && !authState.isLoading) {
      navigate("/login");
    }
  }, [authState.isAuthenticated, authState.isLoading, navigate]);
  
  if (authState.isLoading) {
    return null;
  }
  
  return authState.isAuthenticated ? <>{children}</> : null;
}
