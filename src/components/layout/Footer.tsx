
import { Link } from "react-router-dom";
import { PhoneCall, Mail, MapPin, Linkedin, Send } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-DEFAULT text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* About column */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold mb-4">О Нас</h3>
            <p className="text-sm text-white/80">
              Ассоциация правообладателей
              интеллектуальной собственности
            </p>
            <div className="mt-4">
              <div className="logo text-white font-bold text-2xl flex items-center gap-2">
                <span className="text-3xl">QB</span>
              </div>
            </div>
          </div>

          {/* Navigation column */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold mb-4">Навигация</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/80 hover:text-white transition-colors">
                  Главная
                </Link>
              </li>
              <li>
                <Link to="/patents" className="text-white/80 hover:text-white transition-colors">
                  Мои Объекты
                </Link>
              </li>
              <li>
                <Link to="/register-ip" className="text-white/80 hover:text-white transition-colors">
                  Регистрация ИС
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacts column */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold mb-4">Контакты</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <PhoneCall size={16} className="text-white/60" />
                <span className="text-white/80">+7 (701) 801-88-82</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={16} className="text-white/60" />
                <span className="text-white/80">Астана пр.Кабанбай батыра 29/2</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-white/60" />
                <span className="text-white/80">dinara.s@qazbrand.kz</span>
              </li>
            </ul>
          </div>

          {/* Social column */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold mb-4">Соц. Сети</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Linkedin size={16} className="text-white/60" />
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-white/80 hover:text-white">
                  LinkedIn
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Send size={16} className="text-white/60" />
                <a href="https://t.me" target="_blank" rel="noreferrer" className="text-white/80 hover:text-white">
                  Telegram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center text-white/60 text-sm">
          <p>© {currentYear} QazBrand. Все Права Защищены.</p>
        </div>
      </div>
    </footer>
  );
}
