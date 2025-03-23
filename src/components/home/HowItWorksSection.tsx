
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Upload, FileCheck, CreditCard, CheckCircle } from "lucide-react";

export function HowItWorksSection() {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const steps = [
    {
      icon: <Upload className="h-12 w-12 text-white" />,
      title: "Загрузите",
      description: "Добавьте объект в систему",
    },
    {
      icon: <FileCheck className="h-12 w-12 text-white" />,
      title: "Подпишите",
      description: "Подпишите документы с помощью ЭЦП",
    },
    {
      icon: <CreditCard className="h-12 w-12 text-white" />,
      title: "Оплатите",
      description: "Выберите удобный способ оплаты и внесите платеж",
    },
    {
      icon: <CheckCircle className="h-12 w-12 text-white" />,
      title: "Подтвердите",
      description: "Завершите процесс, получив подтверждение",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand-DEFAULT">Как Это Работает?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Создавайте, управляйте и защищайте своё авторское право легко и быстро
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col items-center text-center"
            >
              <div className="bg-brand-DEFAULT rounded-full p-6 mb-6 shadow-lg">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="relative mt-12 md:mt-20"
        >
          <div className="absolute hidden md:block border-t-2 border-dashed border-gray-300 top-14 left-1/4 right-1/4 z-0"></div>
        </motion.div>
      </div>
    </section>
  );
}
