
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-24 bg-brand-DEFAULT">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Начните прямо сейчас</h2>
          <p className="text-xl text-white/80 mb-10">
            Оформите защиту интеллектуальной собственности за несколько шагов.
            Надежно. Законно. Быстро.
          </p>
          
          <Link to="/register-ip">
            <Button size="lg" className="bg-white text-brand-DEFAULT hover:bg-white/90 text-lg px-8 py-6">
              Зарегистрировать Объект
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
