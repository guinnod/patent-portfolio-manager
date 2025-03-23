
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Layout } from "@/components/layout/Layout";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { Loader2 } from "lucide-react";
import { api } from "@/services/api";
import { useAuth } from "@/context/AuthContext";

const Profile = () => {
  const { authState } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!authState.isAuthenticated) {
      navigate("/login");
    }
  }, [authState.isAuthenticated, navigate]);
  
  const { data: user, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: () => api.users.getProfile(),
  });
  
  const updateProfileMutation = useMutation({
    mutationFn: (data: Partial<typeof user>) => api.users.updateProfile(data),
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
  
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-8">Профиль</h1>
      
      {user && <ProfileForm user={user} onUpdate={updateProfileMutation.mutateAsync} />}
      
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Мои Объекты</h2>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  №
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Название Объекта
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Дата Регистрации
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Уникальный идентификатор (UID)
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  1
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  TradeMarkX
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  13/05/2024
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                  QP-8745-ABCD-2024
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  2
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  NeuroScan
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  22/05/2024
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                  ALG-1524-XZ98-2024
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 text-right">
          <a href="/patents" className="text-brand-accent hover:underline">
            Смотреть Все
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
