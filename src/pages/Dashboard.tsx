
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Folder, FileText, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent } from "@/components/ui/card";

const Dashboard = () => {
  const { authState } = useAuth();
  
  if (!authState.isAuthenticated) {
    return null; // Will be redirected by the protected route
  }

  const actions = [
    {
      icon: <Folder className="h-12 w-12 text-white" />,
      title: "Мои Объекты",
      description: "Просматривайте ваши объекты за все время",
      link: "/patents",
    },
    {
      icon: <FileText className="h-12 w-12 text-white" />,
      title: "Регистрация ИС",
      description: "Добавляйте новые объекты",
      link: "/register-ip",
    },
    {
      icon: <User className="h-12 w-12 text-white" />,
      title: "Личный Кабинет",
      description: "Просмотрите ваш профиль",
      link: "/profile",
    },
  ];

  return (
    <Layout>
      <div className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-brand-DEFAULT bg-hero-pattern bg-cover bg-center py-16 mb-16 rounded-xl">
        <div className="absolute inset-0 bg-brand-DEFAULT/70"></div>
        
        <div className="container mx-auto px-4 z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 animate-fade-in">
              Регистрируйте договоры и отслеживайте свои авторские права онлайн
            </h1>
            
            <div className="mt-8 animate-slide-up">
              <Link to="/register-ip">
                <Button size="lg" className="bg-brand-yellow text-brand-DEFAULT hover:bg-brand-yellow/90 text-lg px-8">
                  Подать Заявку
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-8">Действия</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {actions.map((action, index) => (
          <Link key={index} to={action.link} className="block h-full">
            <Card className="h-full bg-white hover:shadow-lg transition-shadow duration-300 patent-card">
              <CardContent className="p-8 flex flex-col items-center text-center h-full">
                <div className="bg-brand-DEFAULT rounded-full p-4 mb-6">
                  {action.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{action.title}</h3>
                <p className="text-gray-500">{action.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="bg-brand-DEFAULT rounded-xl p-8 text-center animate-fade-in">
        <h2 className="text-2xl font-bold text-white mb-4">
          Создавайте новые заявки на регистрацию интеллектуальной собственности
        </h2>
        <p className="text-white/80 mb-6">
          Ваши данные защищены. Управляйте своей интеллектуальной собственностью безопасно.
        </p>
        <Link to="/register-ip">
          <Button className="bg-white text-brand-DEFAULT hover:bg-white/90">
            Зарегистрировать Объект
          </Button>
        </Link>
      </div>
    </Layout>
  );
};

export default Dashboard;
