import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/Button";
import { useQuizStore } from "@/lib/store";
import { ArrowRight, Clock } from "lucide-react";

export default function Landing() {
  const [, setLocation] = useLocation();
  const resetQuiz = useQuizStore((state) => state.resetQuiz);

  const handleStart = () => {
    resetQuiz();
    setLocation("/quiz");
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Abstract background shapes */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/40 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />

      <main className="relative z-10 container mx-auto px-6 py-12 flex flex-col items-center justify-center min-h-screen text-center max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium tracking-wide mb-8">
            Test de Diagnóstico Corporal
          </span>
          
          <h1 className="text-4xl md:text-6xl text-foreground mb-6 leading-[1.15] text-balance">
            Ahora dime… ¿tu cuerpo también te está dando <span className="text-primary italic">estas señales</span>?
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-lg mx-auto text-balance">
            Este test identifica qué tés funcionan mejor para TU cuerpo y en qué momento del día necesitas tomarlos para ver resultados reales.
          </p>
          
          <div className="flex flex-col items-center gap-4 w-full max-w-xs mx-auto">
            <Button 
              onClick={handleStart} 
              size="lg" 
              className="w-full text-lg shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300"
            >
              Empezar el test
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <div className="flex items-center text-sm text-muted-foreground/80">
              <Clock className="w-4 h-4 mr-1.5" />
              <span>Menos de 1 minuto</span>
            </div>
          </div>
        </motion.div>

        {/* Trust markers */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-16 grid grid-cols-3 gap-8 text-center"
        >
          <div className="flex flex-col items-center">
            <span className="text-2xl font-serif text-primary">12k+</span>
            <span className="text-xs uppercase tracking-wider text-muted-foreground mt-1">Mujeres</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-serif text-primary">100%</span>
            <span className="text-xs uppercase tracking-wider text-muted-foreground mt-1">Natural</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-serif text-primary">4.9</span>
            <span className="text-xs uppercase tracking-wider text-muted-foreground mt-1">Estrellas</span>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
