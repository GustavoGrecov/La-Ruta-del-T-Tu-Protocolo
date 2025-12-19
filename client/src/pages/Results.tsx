import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/Button";
import { Check, Star, Sun, Moon, Coffee } from "lucide-react";
import gingerTeaImg from "@assets/tea_ginger_morning.png";
import cinnamonTeaImg from "@assets/tea_cinnamon_lunch.png";
import hibiscusTeaImg from "@assets/tea_hibiscus_evening.png";
import greenTeaImg from "@assets/tea_green_lemon_morning.png";
import peppermintImg from "@assets/tea_peppermint_lunch.png";
import chamomileImg from "@assets/tea_chamomile_evening.png";
import matchaImg from "@assets/tea_matcha_morning.jpg";
import fennelImg from "@assets/tea_fennel_lunch.jpg";
import lemonBalmImg from "@assets/tea_lemon_balm_evening.jpg";

// Custom images are now fully available
const PROFILES = [
  {
    id: "anti-inflammatory",
    title: "Anti-Inflamatorio & Metabolismo",
    teaMorning: {
      name: "Té de Jengibre con clavo",
      desc: "Para activar tu cuerpo, reducir la inflamación matinal y empezar el día más ligera.",
      img: gingerTeaImg,
      icon: Sun,
      color: "amber"
    },
    teaLunch: {
      name: "Té de Canela con carqueja",
      desc: "Para ayudar a la digestión y evitar esa hinchazón incómoda después de comer.",
      img: cinnamonTeaImg,
      icon: Coffee,
      color: "primary"
    },
    teaEvening: {
      name: "Té de Hibisco con menta",
      desc: "Para sentir ligereza, bienestar y evitar el cansancio acumulado de la tarde.",
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
      desc: "Potente antioxidante para acelerar el metabolismo y eliminar toxinas desde temprano.",
      img: greenTeaImg,
      icon: Sun,
      color: "green"
    },
    teaLunch: {
      name: "Té de Menta",
      desc: "Alivia espasmos digestivos y refresca, ideal para evitar la pesadez post-almuerzo.",
      img: peppermintImg,
      icon: Coffee,
      color: "emerald"
    },
    teaEvening: {
      name: "Té de Manzanilla",
      desc: "Anti-inflamatorio natural que relaja el sistema digestivo y mejora el sueño profundo.",
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
      desc: "Energía sostenida sin nerviosismo, para un enfoque mental claro durante toda la mañana.",
      img: matchaImg,
      icon: Sun,
      color: "green"
    },
    teaLunch: {
      name: "Té de Hinojo",
      desc: "Dulce y digestivo, combate los gases y mantiene tu vientre plano por la tarde.",
      img: fennelImg,
      icon: Coffee,
      color: "teal"
    },
    teaEvening: {
      name: "Té de Melisa (Toronjil)",
      desc: "Calmante natural para reducir la ansiedad del día y preparar tu cuerpo para el descanso.",
      img: lemonBalmImg,
      icon: Moon,
      color: "purple"
    }
  }
];

import { useQuizStore } from "@/lib/store";

export default function Results() {
  const { answers } = useQuizStore();
  const [profile, setProfile] = useState(PROFILES[0]);

  useEffect(() => {
    // Deterministic selection based on Question 2 (Index 1)
    // 0: "Abdomen hinchado" -> Detox
    // 1: "Cintura marcada..." -> Anti-inflammatory
    // 2: "Cara inflamada" -> Detox (fallback/mix) -> Let's map to Anti-inflammatory for now or Energy
    // 3: "Todo el cuerpo pesado" -> Energy

    const q2Answer = answers[1]; // Answers are stored by index

    // Logic Mapping
    if (q2Answer === "Abdomen hinchado") {
      setProfile(PROFILES.find(p => p.id === "detox") || PROFILES[1]);
    } else if (q2Answer === "Todo el cuerpo pesado") {
      setProfile(PROFILES.find(p => p.id === "energy") || PROFILES[2]);
    } else {
      // Default to Anti-inflammatory for "Cintura marcada" (fat loss focus) or others
      setProfile(PROFILES.find(p => p.id === "anti-inflammatory") || PROFILES[0]);
    }

    // Fallback for debugging/random if no answer found (direct access)
    if (!q2Answer) {
      const randomProfile = PROFILES[Math.floor(Math.random() * PROFILES.length)];
      setProfile(randomProfile);
    }

  }, [answers]);

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
              Resultado Personalizado: {profile.title}
            </div>

            <h1 className="text-3xl font-serif text-foreground mb-4 leading-tight">
              Esta es tu rutina ideal de tés, <span className="text-primary border-b-2 border-primary/20">según TU cuerpo</span>
            </h1>

            <p className="text-stone-600 leading-relaxed text-sm md:text-base max-w-sm mx-auto">
              No te falta fuerza de voluntad. Solo estabas usando lo incorrecto en el momento equivocado.
            </p>
          </motion.div>
        </header>

        {/* CTA Section - Moved to Top (Priority) */}
        <div className="p-6 pb-2 bg-white">
          <motion.div
            className="rounded-3xl bg-foreground text-stone-100 p-8 shadow-2xl relative overflow-hidden ring-4 ring-primary/20"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />

            <h2 className="text-2xl font-serif text-white mb-6 relative z-10 leading-snug">
              <span className="block text-primary text-sm font-sans uppercase tracking-widest mb-1">Paso 1: Tu Plan</span>
              La guía completa para seguir esta rutina paso a paso
            </h2>

            <ul className="space-y-3 mb-8 relative z-10">
              {[
                "Rutina diaria detallada",
                "Cantidades exactas (sin adivinar)",
                "Combinaciones seguras"
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
              className="w-full bg-primary hover:bg-primary/90 text-white h-14 text-lg font-medium shadow-xl shadow-primary/20 hover:shadow-primary/40 relative z-10 animate-pulse-slow"
              onClick={() => window.location.href = "https://go.hotmart.com/B103471545M?dp=1"}
            >
              Quiero la guía completa
            </Button>

            <p className="text-center text-xs text-stone-400 mt-4 relative z-10">
              Antes de ver tus tés, asegura tu guía.
            </p>
          </motion.div>
        </div>

        {/* Routine Section */}
        <motion.div
          className="px-6 py-8 space-y-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Morning Card */}\
          <motion.div variants={item} className="bg-white rounded-2xl border border-stone-100 shadow-lg shadow-stone-200/50 overflow-hidden relative group hover:-translate-y-1 transition-transform duration-300">
            <div className={`absolute top-0 left-0 w-1.5 h-full bg-${profile.teaMorning.color}-400 z-10`} />
            <div className="h-32 w-full overflow-hidden relative">
              <img src={profile.teaMorning.img} alt={profile.teaMorning.name} className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-3 left-4 text-white flex items-center gap-2">
                <profile.teaMorning.icon className={`w-4 h-4 text-${profile.teaMorning.color}-300`} />
                <span className="text-xs font-bold uppercase tracking-wider">Mañana • Al despertar</span>
              </div>
            </div>
            <div className="p-6 pl-8">
              <h3 className="text-xl font-serif font-semibold text-stone-900 mb-2">
                {profile.teaMorning.name}
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                {profile.teaMorning.desc}
              </p>
            </div>
          </motion.div>

          {/* Lunch Card */}
          <motion.div variants={item} className="bg-white rounded-2xl border border-stone-100 shadow-lg shadow-stone-200/50 overflow-hidden relative group hover:-translate-y-1 transition-transform duration-300">
            <div className={`absolute top-0 left-0 w-1.5 h-full bg-${profile.teaLunch.color}-500 z-10`} />
            <div className="h-32 w-full overflow-hidden relative">
              <img src={profile.teaLunch.img} alt={profile.teaLunch.name} className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-3 left-4 text-white flex items-center gap-2">
                <profile.teaLunch.icon className="w-4 h-4 text-white" />
                <span className="text-xs font-bold uppercase tracking-wider">Mediodía • Post Almuerzo</span>
              </div>
            </div>
            <div className="p-6 pl-8">
              <h3 className="text-xl font-serif font-semibold text-stone-900 mb-2">
                {profile.teaLunch.name}
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                {profile.teaLunch.desc}
              </p>
            </div>
          </motion.div>

          {/* Evening Card */}
          <motion.div variants={item} className="bg-white rounded-2xl border border-stone-100 shadow-lg shadow-stone-200/50 overflow-hidden relative group hover:-translate-y-1 transition-transform duration-300">
            <div className={`absolute top-0 left-0 w-1.5 h-full bg-${profile.teaEvening.color}-400 z-10`} />
            <div className="h-32 w-full overflow-hidden relative">
              <img src={profile.teaEvening.img} alt={profile.teaEvening.name} className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-3 left-4 text-white flex items-center gap-2">
                <profile.teaEvening.icon className={`w-4 h-4 text-${profile.teaEvening.color}-300`} />
                <span className="text-xs font-bold uppercase tracking-wider">Tarde/Noche • Relax</span>
              </div>
            </div>
            <div className="p-6 pl-8">
              <h3 className="text-xl font-serif font-semibold text-stone-900 mb-2">
                {profile.teaEvening.name}
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                {profile.teaEvening.desc}
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
      </div>
    </div>
  );
}
