
import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div 
      ref={heroRef}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-brand-DEFAULT bg-hero-pattern bg-cover bg-center py-24"
    >
      <div className="absolute inset-0 bg-brand-DEFAULT/70"></div>
      
      <div className="container mx-auto px-4 z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center gap-8 mb-10"
          >
            <div className="glass-effect text-white text-6xl font-bold p-6 rounded-full h-24 w-24 flex items-center justify-center">
              TM
            </div>
            <div className="glass-effect text-white text-6xl font-bold p-6 rounded-full h-24 w-24 flex items-center justify-center">
              ©
            </div>
            <div className="glass-effect text-white text-6xl font-bold p-6 rounded-full h-24 w-24 flex items-center justify-center">
              ®
            </div>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Регистрируйте договоры и отслеживайте свои авторские права онлайн —
            <span className="text-brand-yellow"> быстро, прозрачно и безопасно</span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-8"
          >
            <Link to="/register-ip">
              <Button size="lg" className="bg-brand-yellow text-brand-DEFAULT hover:bg-brand-yellow/90 text-lg px-8 py-6">
                Подать Заявку
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
