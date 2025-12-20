import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/Button";
import { Check, Star, Sun, Moon, Coffee, Shield, Clock, Map, BookOpen, Heart } from "lucide-react";
import gingerTeaImg from "@assets/tea_ginger_morning.png";
import cinnamonTeaImg from "@assets/tea_cinnamon_lunch.png";
import hibiscusTeaImg from "@assets/tea_hibiscus_evening.png";
import greenTeaImg from "@assets/tea_green_lemon_morning.png";
import peppermintImg from "@assets/tea_peppermint_lunch.png";
import chamomileImg from "@assets/tea_chamomile_evening.png";
import matchaImg from "@assets/tea_matcha_morning.jpg";
import fennelImg from "@assets/tea_fennel_lunch.jpg";
import lemonBalmImg from "@assets/tea_lemon_balm_evening.jpg";

import { useQuizStore } from "@/lib/store";

// PROFILES (Logic remains the same to determine the tea types)
const PROFILES = [
  {
    id: "anti-inflammatory",
    title: "Anti-Inflamatorio & Metabolismo",
    teaMorning: {
      name: "Té de Jengibre con clavo",
      desc: "Activación suave para reducir la inflamación matinal.",
      img: gingerTeaImg,
      icon: Sun,
      color: "amber"
    },
    teaLunch: {
      name: "Té de Canela con carqueja",
      desc: "Ayuda a la digestión y evita la hinchazón post-comida.",
      img: cinnamonTeaImg,
      icon: Coffee,
      color: "primary"
    },
    teaEvening: {
      name: "Té de Hibisco con menta",
      desc: "Ligereza y bienestar para evitar el cansancio acumulado.",
      img: hibiscusTeaImg,
      icon: Moon,
      color: "indigo"
    }
  },
  {
    id: "detox",
    title: "Detox & Alivio de Hinchazón",
    teaMorning: {
      name: "Té Verde con Limón",
      desc: "Potente antioxidante para eliminar toxinas desde temprano.",
      img: greenTeaImg,
      icon: Sun,
      color: "green"
    },
    teaLunch: {
      name: "Té de Menta",
      desc: "Alivia espasmos y refresca, ideal para el post-almuerzo.",
      img: peppermintImg,
      icon: Coffee,
      color: "emerald"
    },
    teaEvening: {
      name: "Té de Manzanilla",
      desc: "Relaja el sistema digestivo y mejora el sueño profundo.",
      img: chamomileImg,
      icon: Moon,
      color: "yellow"
    }
  },
  {
    id: "energy",
    title: "Energía & Control de Estrés",
    teaMorning: {
      name: "Matcha Latte",
      desc: "Energía sostenida y enfoque mental claro.",
      img: matchaImg,
      icon: Sun,
      color: "green"
    },
    teaLunch: {
      name: "Té de Hinojo",
      desc: "Combate gases y mantiene el vientre plano.",
      img: fennelImg,
      icon: Coffee,
      color: "teal"
    },
    teaEvening: {
      name: "Té de Melisa (Toronjil)",
      desc: "Calmante natural para reducir la ansiedad del día.",
      img: lemonBalmImg,
      icon: Moon,
      color: "purple"
    }
  }
];

export default function Results() {
  const { answers } = useQuizStore();
  const [profile, setProfile] = useState(PROFILES[0]);

  useEffect(() => {
    const q2Answer = answers[1]; 
    if (q2Answer === "Abdomen hinchado") {
      setProfile(PROFILES.find(p => p.id === "detox") || PROFILES[1]);
    } else if (q2Answer === "Todo el cuerpo pesado") {
      setProfile(PROFILES.find(p => p.id === "energy") || PROFILES[2]);
    } else {
      setProfile(PROFILES.find(p => p.id === "anti-inflammatory") || PROFILES[0]);
    }

    if (!q2Answer) {
      const randomProfile = PROFILES[Math.floor(Math.random() * PROFILES.length)];
      setProfile(randomProfile);
    }
  }, [answers]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-800 font-sans selection:bg-primary/20">
      <div className="max-w-xl mx-auto bg-white min-h-screen shadow-2xl shadow-stone-200/50 pb-20">

        {/* 🟢 BLOCK 1: EMOTIONAL CONFIRMATION (Hero) */}
        <header className="bg-primary/5 px-6 pt-12 pb-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-6 shadow-sm">
              <Star className="w-3 h-3 mr-1.5 fill-current" />
              Diagnóstico Completado
            </div>

            <h1 className="text-3xl font-serif text-stone-900 mb-4 leading-tight">
              Tu resultado no es un error. Es una señal clara de que <span className="text-primary italic">tu cuerpo está inflamado</span>, no roto.
            </h1>

            <p className="text-stone-600 text-sm font-medium tracking-wide">
              Y lo mejor: <span className="text-stone-800 underline decoration-primary/30 underline-offset-4">esto tiene solución.</span>
            </p>
          </motion.div>
        </header>

        {/* 🫖 BLOCK 2: THE 3 TEAS (Context Protocol) */}
        <section className="px-6 py-10">
          <div className="text-center mb-8">
            <h2 className="text-xl font-serif text-stone-800 mb-2">
              Estos son los 3 tés que tu cuerpo<br/>necesita para desinflamar
            </h2>
            <p className="text-xs uppercase tracking-widest text-primary font-bold">
              Dentro de: La Ruta del Té – 21 DÍAS
            </p>
          </div>

          <motion.div
            className="space-y-4"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {/* Morning */}
            <motion.div variants={item} className="flex gap-4 p-4 bg-stone-50 rounded-2xl border border-stone-100">
              <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
                <img src={profile.teaMorning.img} alt="Morning" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="flex items-center gap-1 text-xs font-bold text-amber-600 uppercase mb-1">
                  <Sun className="w-3 h-3" /> Mañana
                </div>
                <h3 className="font-serif font-bold text-stone-900 leading-tight mb-1">{profile.teaMorning.name}</h3>
                <p className="text-xs text-stone-600 leading-relaxed">{profile.teaMorning.desc}</p>
              </div>
            </motion.div>

            {/* Lunch */}
            <motion.div variants={item} className="flex gap-4 p-4 bg-stone-50 rounded-2xl border border-stone-100">
               <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
                <img src={profile.teaLunch.img} alt="Lunch" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 uppercase mb-1">
                  <Coffee className="w-3 h-3" /> Tarde
                </div>
                <h3 className="font-serif font-bold text-stone-900 leading-tight mb-1">{profile.teaLunch.name}</h3>
                <p className="text-xs text-stone-600 leading-relaxed">{profile.teaLunch.desc}</p>
              </div>
            </motion.div>

            {/* Evening */}
            <motion.div variants={item} className="flex gap-4 p-4 bg-stone-50 rounded-2xl border border-stone-100">
               <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
                <img src={profile.teaEvening.img} alt="Evening" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="flex items-center gap-1 text-xs font-bold text-indigo-600 uppercase mb-1">
                  <Moon className="w-3 h-3" /> Noche
                </div>
                <h3 className="font-serif font-bold text-stone-900 leading-tight mb-1">{profile.teaEvening.name}</h3>
                <p className="text-xs text-stone-600 leading-relaxed">{profile.teaEvening.desc}</p>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* 🔄 BLOCK 3: BRIDGE / OBJECTION */}
        <section className="px-8 py-8 bg-stone-900 text-stone-200 text-center relative overflow-hidden">
           {/* Background noise/grain could go here */}
           <div className="relative z-10">
             <p className="text-lg font-serif italic leading-relaxed text-balance">
               "Pero tomar los tés sin el ritual correcto es como tener el mapa sin saber el camino."
             </p>
           </div>
        </section>

        {/* 🧩 BLOCK 4: THE SYSTEM (Stages) */}
        <section className="px-6 py-12 bg-white">
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">El Método</span>
            <h2 className="text-2xl font-serif text-stone-900 mt-2">
              Tu Camino Completo<br/>de Desinflamación
            </h2>
          </div>

          <div className="space-y-8 relative">
            {/* Connector Line */}
            <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-stone-100" />

            {/* Stage 1 */}
            <div className="relative flex gap-6">
              <div className="w-14 h-14 rounded-full bg-blue-50 border-4 border-white shadow-sm flex items-center justify-center shrink-0 z-10 text-blue-600">
                <span className="font-bg text-xl font-serif">1</span>
              </div>
              <div className="pt-2">
                <h3 className="text-lg font-bold text-stone-900">Empiezas con alivio</h3>
                <p className="text-sm font-medium text-blue-600 mb-1">Desincha 72 Horas</p>
                <p className="text-sm text-stone-500 leading-relaxed">
                  Antes de transformar, el cuerpo necesita alivio. Reduce inchaço rápido y prepara tu organismo.
                </p>
              </div>
            </div>

            {/* Stage 2 */}
            <div className="relative flex gap-6">
               <div className="w-14 h-14 rounded-full bg-indigo-50 border-4 border-white shadow-sm flex items-center justify-center shrink-0 z-10 text-indigo-600">
                <span className="font-bg text-xl font-serif">2</span>
              </div>
              <div className="pt-2">
                <h3 className="text-lg font-bold text-stone-900">Controlas el cortisol</h3>
                <p className="text-sm font-medium text-indigo-600 mb-1">Ritual Nocturno</p>
                <p className="text-sm text-stone-500 leading-relaxed">
                  Si no bajas el cortisol, el cuerpo sigue reteniendo. Dormirás mejor y reducirás la ansiedad.
                </p>
              </div>
            </div>

            {/* Stage 3 */}
            <div className="relative flex gap-6">
               <div className="w-14 h-14 rounded-full bg-amber-50 border-4 border-white shadow-sm flex items-center justify-center shrink-0 z-10 text-amber-600">
                <span className="font-bg text-xl font-serif">3</span>
              </div>
              <div className="pt-2">
                <h3 className="text-lg font-bold text-stone-900">Mantienes la constancia</h3>
                <p className="text-sm font-medium text-amber-600 mb-1">Planner de 30 Días</p>
                <p className="text-sm text-stone-500 leading-relaxed">
                  El cuerpo cambia cuando la mente acompaña. Registra tus victorias diarias.
                </p>
              </div>
            </div>

            {/* Stage 4 */}
            <div className="relative flex gap-6">
               <div className="w-14 h-14 rounded-full bg-primary/10 border-4 border-white shadow-sm flex items-center justify-center shrink-0 z-10 text-primary">
                <Star className="w-6 h-6 fill-current" />
              </div>
              <div className="pt-2">
                <h3 className="text-lg font-bold text-stone-900">Transformas tu cuerpo</h3>
                <p className="text-sm font-medium text-primary mb-1">La Ruta del Té – 21 DÍAS</p>
                <p className="text-sm text-stone-500 leading-relaxed">
                  El protocolo central que une todas las etapas. Aquí es donde aprendes a no volver a inflamar.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 🛒 BLOCK 5: THE OFFER (Bundle) */}
        <section className="px-6 pb-12">
          <motion.div 
            className="bg-stone-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl shadow-primary/20"
            initial={{ scale: 0.98, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Decor */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
            
            <div className="relative z-10 text-center">
              <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold tracking-widest uppercase mb-4 text-primary-foreground/90">
                Oferta Exclusiva
              </span>
              <h2 className="text-2xl font-serif mb-2">Sistema Completo<br/>Camino del Té</h2>
              <p className="text-stone-400 text-sm mb-8 font-light italic">
                "No compres productos. Acepta un proceso."
              </p>

              {/* Progress Anchors */}
              <div className="grid grid-cols-3 gap-2 mb-8 text-center">
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <div className="text-lg font-bold text-primary">Día 1-3</div>
                  <div className="text-[10px] uppercase tracking-wide text-stone-400 mt-1">Alivio</div>
                </div>
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <div className="text-lg font-bold text-primary">Día 4-21</div>
                  <div className="text-[10px] uppercase tracking-wide text-stone-400 mt-1">Reeducación</div>
                </div>
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <div className="text-lg font-bold text-primary">Día 22+</div>
                  <div className="text-[10px] uppercase tracking-wide text-stone-400 mt-1">Constancia</div>
                </div>
              </div>

              {/* Checklist */}
              <div className="space-y-3 mb-8 text-left bg-white/5 p-5 rounded-2xl border border-white/5">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm text-stone-200">Desincha 72 Horas</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm text-stone-200">Ritual Nocturno Anti-Inflamación</span>
                </div>
                 <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm text-stone-200">Planner Imprimible 30 Días</span>
                </div>
                 <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm font-bold text-white">La Ruta del Té – 21 DÍAS</span>
                </div>
              </div>

              {/* CTA */}
              <Button
                className="w-full bg-primary hover:bg-primary/90 text-white h-14 text-lg font-bold shadow-xl shadow-primary/20 hover:shadow-primary/40 mb-4 animate-pulse-slow"
                onClick={() => window.location.href = "https://go.hotmart.com/B103471545M?dp=1"}
              >
                Quiero Mi Camino Completo
              </Button>
              
              <p className="text-xs text-stone-500">
                Acceso inmediato a todo el sistema digital.
              </p>
            </div>
          </motion.div>
        </section>

        {/* 🔐 BLOCK 6: FOOTER / SECURITY */}
        <footer className="pb-10 pt-2 text-center px-6">
          <div className="flex justify-center gap-8 mb-6 opacity-60 grayscale">
            <div className="flex flex-col items-center gap-2">
              <Shield className="w-5 h-5 text-stone-400" />
              <span className="text-[10px] uppercase tracking-widest text-stone-500">100% Seguro</span>
            </div>
             <div className="flex flex-col items-center gap-2">
              <Clock className="w-5 h-5 text-stone-400" />
              <span className="text-[10px] uppercase tracking-widest text-stone-500">Acesso Imediato</span>
            </div>
             <div className="flex flex-col items-center gap-2">
              <Heart className="w-5 h-5 text-stone-400" />
              <span className="text-[10px] uppercase tracking-widest text-stone-500">Paso a paso</span>
            </div>
          </div>
          <p className="text-xs text-stone-400 max-w-xs mx-auto leading-relaxed">
            Tu cuerpo necesita dirección, no castigo. Empieza hoy tu camino de desinflamación.
          </p>
        </footer>

      </div>
    </div>
  );
}
