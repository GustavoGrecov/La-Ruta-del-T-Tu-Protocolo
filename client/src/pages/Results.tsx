import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/Button";
import { Check, Shield, Clock, Heart, Star, AlertCircle, Sun, Moon, Coffee } from "lucide-react";
import { useQuizStore } from "@/lib/store";

// Activos de Tés (Restaurados)
import gingerTeaImg from "@assets/tea_ginger_morning.png";
import cinnamonTeaImg from "@assets/tea_cinnamon_lunch.png";
import hibiscusTeaImg from "@assets/tea_hibiscus_evening.png";
import greenTeaImg from "@assets/tea_green_lemon_morning.png";
import peppermintImg from "@assets/tea_peppermint_lunch.png";
import chamomileImg from "@assets/tea_chamomile_evening.png";
import matchaImg from "@assets/tea_matcha_morning.jpg";
import fennelImg from "@assets/tea_fennel_lunch.jpg";
import lemonBalmImg from "@assets/tea_lemon_balm_evening.jpg";

// Nuevos activos del layout
import beforeImage from "@assets/transformacion_antes.png";
import productBundleImg from "@assets/pack_5_fases_v2.jpg"; // Imagen actualizada

// URL del video para la transformación "Después"
const AFTER_VIDEO_URL = "https://iqptejsfgxyggswmeggh.supabase.co/storage/v1/object/public/flower/Technical_description_frametovideo_20251221%20(1).mp4";

// PERFILES DE TÉ (Lógica Dinámica Restaurada)
// Definimos los tés específicos para cada perfil de respuesta
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

  // Selección automática del perfil basado en las respuestas del quiz
  useEffect(() => {
    // La pregunta 2 (index 1) define el problema principal
    const q2Answer = answers[1];
    if (q2Answer === "Abdomen hinchado") {
      setProfile(PROFILES.find(p => p.id === "detox") || PROFILES[1]);
    } else if (q2Answer === "Todo el cuerpo pesado") {
      setProfile(PROFILES.find(p => p.id === "energy") || PROFILES[2]);
    } else {
      setProfile(PROFILES.find(p => p.id === "anti-inflammatory") || PROFILES[0]);
    }

    // Fallback aleatorio si no hay respuesta clara
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

        {/* 1. BLOQUE DE DIAGNÓSTICO PERSONALIZADO */}
        {/* Bloque de diagnóstico para generar identificación inmediata y sensación de “esto habla de mí” */}
        <header className="px-6 pt-10 pb-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-red-50/50 border border-red-100 rounded-2xl p-6"
          >
            <div className="flex items-center justify-center gap-2 mb-3 text-red-800 font-bold uppercase tracking-widest text-xs">
              <AlertCircle className="w-4 h-4" />
              Diagnóstico Final
            </div>
            <h1 className="text-xl md:text-2xl font-serif text-stone-900 leading-snug">
              "Según tus respuestas, tu cuerpo muestra señales de <span className="text-red-700 font-semibold bg-red-100/50 px-1">inflamación metabólica</span> y retención de líquidos. Por eso las dietas comunes no funcionan para ti."
            </h1>
          </motion.div>
        </header>

        {/* 2. BLOQUE VISUAL DE TRANSFORMACIÓN (ANTES Y DESPUÉS) */}
        {/* Prueba visual de transformación real para aumentar confianza y reducir escepticismo */}
        <section className="px-6 mb-8">
          <div className="grid grid-cols-2 gap-2 md:gap-4 max-w-md mx-auto">

            {/* ANTES (Imagen estática) */}
            <div className="relative rounded-xl overflow-hidden shadow-md aspect-[3/4]">
              <img
                src={beforeImage}
                alt="Transformación Antes"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border border-white/20">
                Antes
              </div>
            </div>

            {/* DESPUÉS (Video Loop) */}
            <div className="relative rounded-xl overflow-hidden shadow-md aspect-[3/4] bg-stone-100">
              <video
                src={AFTER_VIDEO_URL}
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
              <div className="absolute top-2 left-2 bg-emerald-600/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border border-white/20 shadow-sm">
                Después
              </div>
            </div>

          </div>
          <p className="text-center text-[10px] text-stone-400 mt-2 italic">
            Resultados reales aplicando el protocolo correcto.
          </p>
        </section>

        {/* BLOCK 2.5: RUTINA DINÁMICA DE TÉS (RESTAURADA) */}
        {/* Rutina personalizada con foto del té específico + beneficio */}
        <section className="px-6 py-8 bg-stone-50 border-y border-stone-100 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-xl font-serif text-stone-900 mb-2">
              Tu rutina diaria simple y guiada<br />(3 veces al día)
            </h2>
            <p className="text-xs text-stone-500 max-w-xs mx-auto">
              Hemos seleccionado estos tés específicamente para tu perfil <strong>{profile.title}</strong>.
            </p>
          </div>

          <div className="space-y-4">
            {/* MAÑANA - DINÁMICO */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-stone-100 flex gap-4 items-center">
              <div className="relative shrink-0">
                <img
                  src={profile.teaMorning.img}
                  alt={profile.teaMorning.name}
                  className="w-16 h-16 rounded-full object-cover shadow-md border-2 border-amber-100"
                />
                <div className="absolute -bottom-1 -right-1 bg-amber-100 rounded-full p-1 text-amber-600">
                  <Sun className="w-3 h-3" />
                </div>
              </div>
              <div className="flex-1">
                <div className="text-[10px] font-bold text-amber-600 uppercase tracking-wider mb-0.5">
                  Mañana – Activación
                </div>
                <h3 className="text-sm font-serif font-bold text-stone-900 leading-tight mb-1">
                  {profile.teaMorning.name}
                </h3>
                <p className="text-[11px] text-stone-500 leading-relaxed">
                  {profile.teaMorning.desc}
                </p>
              </div>
            </div>

            {/* MEDIODÍA - DINÁMICO */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-stone-100 flex gap-4 items-center">
              <div className="relative shrink-0">
                <img
                  src={profile.teaLunch.img}
                  alt={profile.teaLunch.name}
                  className="w-16 h-16 rounded-full object-cover shadow-md border-2 border-emerald-100"
                />
                <div className="absolute -bottom-1 -right-1 bg-emerald-100 rounded-full p-1 text-emerald-600">
                  <Coffee className="w-3 h-3" />
                </div>
              </div>
              <div className="flex-1">
                <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-0.5">
                  Mediodía – Regulación
                </div>
                <h3 className="text-sm font-serif font-bold text-stone-900 leading-tight mb-1">
                  {profile.teaLunch.name}
                </h3>
                <p className="text-[11px] text-stone-500 leading-relaxed">
                  {profile.teaLunch.desc}
                </p>
              </div>
            </div>

            {/* NOCHE - DINÁMICO */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-stone-100 flex gap-4 items-center">
              <div className="relative shrink-0">
                <img
                  src={profile.teaEvening.img}
                  alt={profile.teaEvening.name}
                  className="w-16 h-16 rounded-full object-cover shadow-md border-2 border-indigo-100"
                />
                <div className="absolute -bottom-1 -right-1 bg-indigo-100 rounded-full p-1 text-indigo-600">
                  <Moon className="w-3 h-3" />
                </div>
              </div>
              <div className="flex-1">
                <div className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider mb-0.5">
                  Noche – Reparación
                </div>
                <h3 className="text-sm font-serif font-bold text-stone-900 leading-tight mb-1">
                  {profile.teaEvening.name}
                </h3>
                <p className="text-[11px] text-stone-500 leading-relaxed">
                  {profile.teaEvening.desc}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. ENCABEZADO PRINCIPAL DE VALOR */}
        {/* Headline principal para elevar percepción de valor y evitar la sensación de producto simple */}
        <section className="px-8 text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-serif text-stone-900 leading-tight">
            Este no es un ebook.<br />
            <span className="text-primary">Es un protocolo completo guiado en 5 fases.</span>
          </h2>
          <div className="h-1 w-20 bg-primary/30 mx-auto mt-4 rounded-full" />
        </section>

        {/* 4. IMAGEN ÚNICA DEL PRODUCTO (ECOSISTEMA) */}
        {/* Visual del ecosistema completo para reforzar que es un sistema estructurado */}
        <section className="px-4 mb-8">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden"
          >
            {/* Glow effect behind */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/20 blur-3xl rounded-full" />

            <img
              src={productBundleImg}
              alt="Protocolo Completo 5 Fases"
              className="relative z-10 w-full h-auto object-contain drop-shadow-2xl"
            />
          </motion.div>
        </section>

        {/* 5. BULLETS DE BENEFICIOS */}
        {/* Beneficios claros, emocionales y orientados a transformación */}
        <section className="px-8 mb-10">
          <div className="bg-white border border-stone-100 rounded-2xl p-6 shadow-xl shadow-stone-200/40">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="p-1 bg-green-100 rounded-full mt-0.5 shrink-0 text-green-700">
                  <Check className="w-4 h-4" />
                </div>
                <span className="text-stone-700 font-medium leading-tight">Alivio visible en solo <span className="font-bold text-stone-900">72 horas</span></span>
              </li>
              <li className="flex items-start gap-3">
                <div className="p-1 bg-green-100 rounded-full mt-0.5 shrink-0 text-green-700">
                  <Check className="w-4 h-4" />
                </div>
                <span className="text-stone-700 font-medium leading-tight">Reequilibrio profundo en <span className="font-bold text-stone-900">21 días</span></span>
              </li>
              <li className="flex items-start gap-3">
                <div className="p-1 bg-green-100 rounded-full mt-0.5 shrink-0 text-green-700">
                  <Check className="w-4 h-4" />
                </div>
                <span className="text-stone-700 font-medium leading-tight">Menos inflamación y <span className="font-bold text-stone-900">mejor descanso nocturno</span></span>
              </li>
              <li className="flex items-start gap-3">
                <div className="p-1 bg-green-100 rounded-full mt-0.5 shrink-0 text-green-700">
                  <Check className="w-4 h-4" />
                </div>
                <span className="text-stone-700 font-medium leading-tight">Acompañamiento diario para <span className="font-bold text-stone-900">no abandonar el proceso</span></span>
              </li>
            </ul>
          </div>
        </section>

        {/* 6. FRASE DE REFUERZO EMOCIONAL */}
        {/* Frase de cierre para preparar emocionalmente el clic */}
        <section className="px-8 text-center mb-6">
          <p className="text-lg font-serif italic text-stone-600">
            "Todo lo que necesitas, paso a paso, para que tu cuerpo vuelva a funcionar correctamente."
          </p>
        </section>

        {/* 7. CTA FINAL (BOTÓN EXISTENTE) */}
        {/* CTA posicionado justo después del refuerzo de valor para maximizar conversión */}
        <section className="px-6 pb-12">
          <Button
            className="w-full bg-primary hover:bg-primary/90 text-white h-16 text-xl font-bold uppercase tracking-wide shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all transform hover:-translate-y-1 animate-pulse-slow"
            onClick={() => window.location.href = "https://go.hotmart.com/B103471545M?dp=1"}
          >
            Comenzar mi protocolo ahora
          </Button>

          {/* Sellos de seguridad (Footer simple) */}
          <div className="flex justify-center gap-6 mt-6 opacity-60">
            <div className="flex items-center gap-1.5 text-[10px] uppercase text-stone-500 font-bold tracking-wider">
              <Shield className="w-3 h-3" /> Compra Segura
            </div>
            <div className="flex items-center gap-1.5 text-[10px] uppercase text-stone-500 font-bold tracking-wider">
              <Star className="w-3 h-3" /> Garantía Total
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
