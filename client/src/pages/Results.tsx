import { motion } from "framer-motion";
import { Button } from "@/components/Button";
import { Check, Star, Sun, Moon, Coffee } from "lucide-react";

export default function Results() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800">
      <div className="max-w-xl mx-auto bg-white min-h-screen shadow-2xl shadow-stone-200/50">
        
        {/* Header Section */}
        <header className="bg-primary/5 px-6 pt-12 pb-10 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-white border border-primary/20 text-primary text-xs font-bold tracking-wider uppercase mb-6 shadow-sm">
              <Star className="w-3 h-3 mr-1.5 fill-current" />
              Resultado Personalizado
            </div>
            
            <h1 className="text-3xl font-serif text-foreground mb-4 leading-tight">
              Esta es tu rutina ideal de tés, <span className="text-primary border-b-2 border-primary/20">según TU cuerpo</span>
            </h1>
            
            <p className="text-stone-600 leading-relaxed text-sm md:text-base max-w-sm mx-auto">
              No te falta fuerza de voluntad. Solo estabas usando lo incorrecto en el momento equivocado.
            </p>
          </motion.div>
        </header>

        {/* Routine Section */}
        <motion.div 
          className="px-6 py-8 space-y-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Morning Card */}
          <motion.div variants={item} className="bg-white rounded-2xl border border-stone-100 shadow-lg shadow-stone-200/50 overflow-hidden relative group hover:-translate-y-1 transition-transform duration-300">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-400" />
            <div className="p-6 pl-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
                  <Sun className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Mañana • Al despertar</span>
              </div>
              <h3 className="text-xl font-serif font-semibold text-stone-900 mb-2">
                Té de Jengibre con clavo
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Para activar tu cuerpo, reducir la inflamación matinal y empezar el día más ligera.
              </p>
            </div>
          </motion.div>

          {/* Lunch Card */}
          <motion.div variants={item} className="bg-white rounded-2xl border border-stone-100 shadow-lg shadow-stone-200/50 overflow-hidden relative group hover:-translate-y-1 transition-transform duration-300">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-primary" />
            <div className="p-6 pl-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <Coffee className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">Mediodía • Post Almuerzo</span>
              </div>
              <h3 className="text-xl font-serif font-semibold text-stone-900 mb-2">
                Té de Canela con carqueja
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Para ayudar a la digestión y evitar esa hinchazón incómoda después de comer.
              </p>
            </div>
          </motion.div>

          {/* Evening Card */}
          <motion.div variants={item} className="bg-white rounded-2xl border border-stone-100 shadow-lg shadow-stone-200/50 overflow-hidden relative group hover:-translate-y-1 transition-transform duration-300">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-400" />
            <div className="p-6 pl-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                  <Moon className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Tarde/Noche • Relax</span>
              </div>
              <h3 className="text-xl font-serif font-semibold text-stone-900 mb-2">
                Té de Hibisco con menta
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Para sentir ligereza, bienestar y evitar el cansancio acumulado de la tarde.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Education/Transition */}
        <motion.div 
          className="px-8 py-10 bg-stone-100 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <p className="text-lg font-serif text-stone-800 mb-4 leading-relaxed">
            "Este test solo te mostró <span className="font-bold italic">QUÉ</span> tés usar. Pero el resultado real viene de..."
          </p>
          <ul className="text-left text-sm text-stone-600 space-y-2 max-w-xs mx-auto mb-6 bg-white p-5 rounded-xl shadow-sm border border-stone-200">
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> El orden correcto</li>
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Las cantidades exactas</li>
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Cuántos días seguir cada uno</li>
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Qué evitar mientras los tomas</li>
          </ul>
          <p className="text-xs text-stone-500 uppercase tracking-widest font-medium">
            Eso es lo que la mayoría hace mal…
          </p>
        </motion.div>

        {/* CTA Section */}
        <div className="p-6 pb-16 bg-white">
          <motion.div 
            className="rounded-3xl bg-foreground text-stone-100 p-8 shadow-2xl relative overflow-hidden"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />

            <h2 className="text-2xl font-serif text-white mb-6 relative z-10">
              La guía completa para seguir esta rutina paso a paso
            </h2>

            <ul className="space-y-3 mb-8 relative z-10">
              {[
                "Rutina diaria detallada",
                "Cantidades exactas (sin adivinar)",
                "Combinaciones seguras",
                "Adaptado a cuerpos reales"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-stone-300">
                  <div className="mt-0.5 min-w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <Check className="w-3 h-3" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            <Button 
              className="w-full bg-primary hover:bg-primary/90 text-white h-14 text-lg font-medium shadow-xl shadow-primary/20 hover:shadow-primary/40 relative z-10"
            >
              Quiero la guía completa
            </Button>
            
            <p className="text-center text-xs text-stone-400 mt-4 relative z-10">
              Creado para mujeres que ya lo intentaron todo.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
