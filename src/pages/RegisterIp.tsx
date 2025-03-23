
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { PatentUploadForm } from "@/components/patents/PatentUploadForm";
import { useAuth } from "@/context/AuthContext";

const RegisterIp = () => {
  const { authState } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!authState.isAuthenticated) {
      navigate("/login");
    }
  }, [authState.isAuthenticated, navigate]);
  
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Регистрация Интеллектуальной Собственности</h1>
        <p className="text-gray-600 mb-8">
          Добавление нового объекта ИС
        </p>
        
        <div className="border-b border-gray-200 mb-8 pb-4">
          <h2 className="text-xl font-semibold">Загрузка Интеллектуальной Собственности</h2>
        </div>
        
        <PatentUploadForm />
      </div>
    </Layout>
  );
};

export default RegisterIp;
