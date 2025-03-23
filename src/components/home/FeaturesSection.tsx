
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Shield, Eye, MousePointer } from "lucide-react";

export function FeaturesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const features = [
    {
      icon: <Eye className="h-12 w-12 text-white" />,
      title: "Биометрическая верификация",
      description: "Быстрое и безопасное подтверждение личности без лишних действий.",
    },
    {
      icon: <Shield className="h-12 w-12 text-white" />,
      title: "Гарантированная Безопасность",
      description: "Мы используем современные протоколы шифрования.",
    },
    {
      icon: <MousePointer className="h-12 w-12 text-white" />,
      title: "Удобный интерфейс",
      description: "Простой и интуитивно понятный дизайн.",
    },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand-DEFAULT">Почему мы?</h2>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-brand-DEFAULT rounded-lg p-8 text-center shadow-lg hover:translate-y-[-5px] transition-transform duration-300"
            >
              <div className="bg-brand-light rounded-full p-4 mx-auto w-20 h-20 flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">{feature.title}</h3>
              <p className="text-white/80">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
