
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Pencil, Save, User as UserIcon } from "lucide-react";
import { User } from "@/types";

interface ProfileFormProps {
  user: User;
  onUpdate: (data: Partial<User>) => Promise<void>;
}

export function ProfileForm({ user, onUpdate }: ProfileFormProps) {
  const [name, setName] = useState(user.name);
  const [surname, setSurname] = useState(user.surname);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarFile(e.target.files[0]);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (password !== confirmPassword) {
        setPasswordError("Пароли не совпадают");
        setIsLoading(false);
        return;
      }
      
      const updateData: Partial<User> = {
        name,
        surname,
        email,
        phone
      };
      
      await onUpdate(updateData);
      
      setIsEditing(false);
      toast({
        title: "Профиль обновлен",
        description: "Ваш профиль был успешно обновлен.",
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось обновить профиль. Пожалуйста, попробуйте снова.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full bg-white shadow-md animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Профиль</CardTitle>
        <CardDescription>
          Управление вашей учетной записью и личными данными
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Avatar section */}
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-32 w-32 border-4 border-gray-100 shadow">
              <AvatarImage src={avatarFile ? URL.createObjectURL(avatarFile) : user.photoUrl} />
              <AvatarFallback className="bg-brand-DEFAULT text-white text-2xl">
                {user.name.charAt(0)}{user.surname.charAt(0)}
              </AvatarFallback>
            </Avatar>
            
            <Label
              htmlFor="avatar-upload"
              className="bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 font-medium py-2 px-4 rounded cursor-pointer transition-colors flex items-center gap-2"
            >
              <UserIcon className="h-4 w-4" />
              Выбрать фото
            </Label>
            <Input
              id="avatar-upload"
              type="file"
              className="hidden"
              onChange={handleAvatarChange}
              accept="image/*"
            />
          </div>

          {/* Profile form */}
          <div className="md:col-span-2">
            <form onSubmit={handleUpdateProfile}>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Основная Информация</h3>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? (
                        <>
                          <Pencil className="h-4 w-4 mr-2" />
                          Отменить
                        </>
                      ) : (
                        <>
                          <Pencil className="h-4 w-4 mr-2" />
                          Редактировать
                        </>
                      )}
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Имя</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        readOnly={!isEditing}
                        className={!isEditing ? "bg-gray-50" : ""}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="surname">Фамилия</Label>
                      <Input
                        id="surname"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        readOnly={!isEditing}
                        className={!isEditing ? "bg-gray-50" : ""}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2 mt-4">
                    <Label htmlFor="phone">Номер Телефона</Label>
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      readOnly={!isEditing}
                      className={!isEditing ? "bg-gray-50" : ""}
                    />
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">Настройки</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Электронная Почта</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      readOnly={!isEditing}
                      className={!isEditing ? "bg-gray-50" : ""}
                    />
                  </div>
                  
                  {isEditing && (
                    <>
                      <div className="space-y-2 mt-4">
                        <Label htmlFor="password">Пароль</Label>
                        <Input
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                            setPasswordError("");
                          }}
                          placeholder="••••••••"
                        />
                      </div>
                      
                      <div className="space-y-2 mt-4">
                        <Label htmlFor="confirmPassword">Подтвердите Пароль</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            setPasswordError("");
                          }}
                          placeholder="••••••••"
                        />
                        {passwordError && (
                          <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                        )}
                      </div>
                    </>
                  )}
                </div>

                {isEditing && (
                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      className="w-full bg-brand-DEFAULT hover:bg-brand-light"
                      disabled={isLoading}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Сохранить Изменения
                    </Button>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
