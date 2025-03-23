
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Upload, FileCheck, FilePlus2 } from "lucide-react";

export function PatentUploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [acceptedPolicy, setAcceptedPolicy] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, выберите файл для загрузки",
        variant: "destructive",
      });
      return;
    }
    
    if (!acceptedPolicy) {
      setShowPrivacyPolicy(true);
      return;
    }
    
    // In a real app, this would upload the file
    toast({
      title: "Успех",
      description: `Файл "${file.name}" успешно загружен`,
    });
    
    // Reset form
    setFile(null);
    setAcceptedPolicy(false);
  };

  const handleContinue = () => {
    setShowPrivacyPolicy(false);
    setAcceptedPolicy(true);
    
    // Submit the form now that policy is accepted
    if (file) {
      toast({
        title: "Успех",
        description: `Файл "${file.name}" успешно загружен`,
      });
      
      // Reset form
      setFile(null);
    }
  };

  return (
    <>
      <Card className="w-full bg-white shadow-md animate-fade-in">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Загрузка Интеллектуальной Собственности</CardTitle>
          <CardDescription>
            Выберите и загрузите файл электронной цифровой подписи (ЭЦП) для подтверждения вашей личности и подписания документов
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div
              className={`border-2 border-dashed rounded-lg p-10 text-center transition-colors ${
                isDragging 
                  ? "border-brand-accent bg-brand-accent/5" 
                  : file 
                    ? "border-green-500 bg-green-50" 
                    : "border-gray-300 hover:border-brand-accent hover:bg-gray-50"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {file ? (
                <div className="flex flex-col items-center">
                  <FileCheck className="h-16 w-16 text-green-500 mb-2" />
                  <p className="font-medium text-green-600">{file.name}</p>
                  <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    onClick={() => setFile(null)}
                  >
                    Выбрать другой файл
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <FilePlus2 className="h-16 w-16 text-gray-400 mb-2" />
                  <p className="font-medium">Выберите и загрузите файл ЭЦП</p>
                  <p className="text-sm text-gray-500 mb-4">или перетащите файл сюда</p>
                  <Label
                    htmlFor="file-upload"
                    className="bg-brand-DEFAULT hover:bg-brand-light text-white font-medium py-2 px-4 rounded cursor-pointer transition-colors"
                  >
                    Выбрать файл
                  </Label>
                  <Input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".p12,.pfx,.key"
                  />
                </div>
              )}
            </div>

            <div className="flex items-start space-x-2">
              <Input
                type="checkbox"
                id="privacy-policy"
                className="h-4 w-4 mt-1"
                checked={acceptedPolicy}
                onChange={(e) => setAcceptedPolicy(e.target.checked)}
              />
              <Label htmlFor="privacy-policy" className="text-sm">
                Я принимаю <Button
                  type="button"
                  variant="link"
                  className="p-0 h-auto text-brand-accent"
                  onClick={() => setShowPrivacyPolicy(true)}
                >
                  политику конфиденциальности
                </Button> и согласен на обработку персональных данных
              </Label>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full bg-brand-DEFAULT hover:bg-brand-light transition-colors"
            >
              <Upload className="mr-2 h-4 w-4" />
              Загрузить файл
            </Button>
          </CardFooter>
        </form>
      </Card>

      {/* Privacy Policy Dialog */}
      <Dialog open={showPrivacyPolicy} onOpenChange={setShowPrivacyPolicy}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Политика Конфиденциальности и Обработка Персональных Данных</DialogTitle>
            <DialogDescription>
              Пожалуйста, внимательно ознакомьтесь с нашей политикой конфиденциальности
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-bold">1. Общие положения</h3>
              <p>1.1. Настоящая Политика конфиденциальности и обработки персональных данных регулирует порядок сбора, использования, хранения и защиты персональных данных пользователей в рамках использования платформы QazBrand.</p>
              <p>1.2. Политика разработана в соответствии с требованиями действующего законодательства в области защиты персональных данных.</p>
              <p>1.3. Использование платформы означает, что пользователь ознакомился и согласен с условиями обработки персональных данных.</p>
              <p>1.4. Персональные данные – это любая информация, относящаяся к прямо или косвенно определенному физическому лицу, включая, но не ограничиваясь:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Фамилия, имя, отчество;</li>
                <li>Контактные данные (номер телефона, адрес электронной почты);</li>
                <li>Идентификационные данные (ИИН, паспортные данные, ЭЦП и др.);</li>
                <li>Биометрические данные (изображение лица, голос);</li>
                <li>Платежная информация (реквизиты банковских карт, счета);</li>
                <li>Иные данные, переданные пользователем при использовании сервиса.</li>
              </ul>
            </div>

            <Separator />

            <div>
              <h3 className="font-bold">2. Сбор и обработка персональных данных</h3>
              <p>2.1. Персональные данные пользователей собираются исключительно с их согласия при регистрации, использовании сервисов и выполнении юридически значимых действий.</p>
              <p>2.2. Обработка персональных данных осуществляется в следующих целях:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Обеспечение корректной работы сервиса;</li>
                <li>Подтверждение личности пользователя для подписания документов с использованием ЭЦП и биометрической аутентификации;</li>
                <li>Ведение учета, выполнение обязательств перед пользователем, включая оплату и предоставление услуг;</li>
                <li>Соблюдение требований законодательства;</li>
                <li>Улучшение качества сервиса и персонализация пользовательского опыта.</li>
              </ul>
              <p>2.3. Мы не передаем персональные данные третьим лицам без согласия пользователя, за исключением случаев, предусмотренных законодательством.</p>
              <p>2.4. Все персональные данные хранятся в защищенных системах с использованием современных методов шифрования и защиты от несанкционированного доступа.</p>
              <p>2.5. В случае утечки данных или выявления нарушений безопасности пользователи будут своевременно уведомлены в соответствии с требованиями законодательства.</p>
            </div>
          </div>
          
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button 
              variant="outline" 
              onClick={() => setShowPrivacyPolicy(false)}
            >
              Отмена
            </Button>
            <Button 
              onClick={handleContinue}
              className="bg-brand-DEFAULT hover:bg-brand-light"
            >
              Принять и Продолжить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
