
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/layout/Layout";
import { PatentTable } from "@/components/patents/PatentTable";
import { Button } from "@/components/ui/button";
import { Loader2, FilePlus } from "lucide-react";
import { api } from "@/services/api";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Patents = () => {
  const { authState } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!authState.isAuthenticated) {
      navigate("/login");
    }
  }, [authState.isAuthenticated, navigate]);
  
  const { data: patents, isLoading, error } = useQuery({
    queryKey: ["patents"],
    queryFn: () => api.patents.getAll(),
  });
  
  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center">
          <Loader2 className="h-12 w-12 text-brand-DEFAULT animate-spin" />
        </div>
      </Layout>
    );
  }
  
  if (error) {
    return (
      <Layout>
        <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Ошибка загрузки данных</h2>
            <p className="text-gray-600 mb-6">Произошла ошибка при загрузке объектов интеллектуальной собственности.</p>
            <Button onClick={() => window.location.reload()}>Повторить попытку</Button>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Мои Объекты</h1>
          <p className="text-gray-600">
            Просмотр и управление объектами интеллектуальной собственности
          </p>
        </div>
        
        <div className="flex gap-4">
          <Button variant="outline">Виды Объектов</Button>
          <Link to="/register-ip">
            <Button className="bg-brand-DEFAULT hover:bg-brand-light">
              <FilePlus className="mr-2 h-4 w-4" />
              Добавить Объект
            </Button>
          </Link>
        </div>
      </div>
      
      {patents && patents.length > 0 ? (
        <PatentTable patents={patents} />
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-medium text-gray-600 mb-4">Нет зарегистрированных объектов</h3>
          <p className="text-gray-500 mb-6">
            Зарегистрируйте вашу первую интеллектуальную собственность
          </p>
          <Link to="/register-ip">
            <Button className="bg-brand-DEFAULT hover:bg-brand-light">
              <FilePlus className="mr-2 h-4 w-4" />
              Добавить Объект
            </Button>
          </Link>
        </div>
      )}
    </Layout>
  );
};

export default Patents;
