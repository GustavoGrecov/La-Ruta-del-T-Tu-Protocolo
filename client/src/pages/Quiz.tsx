import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useQuizStore } from "@/lib/store";
import { ChevronLeft, BarChart, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/Button";
import { useSubmitQuiz } from "@/hooks/use-quiz";
import age18Img from "@assets/age_18_40.png";
import age40Img from "@assets/age_40_65.jpg";
import age65Img from "@assets/age_65_plus.jpg";

const QUESTIONS = [
  {
    id: 999,
    question: "¿Cuál es tu edad?",
    type: "age-cards",
    options: [
      "18 até 40 anos",
      "40 anos a 65",
      "65 mais"
    ]
  },
  {
    id: 1,
    question: "¿Qué es lo primero que haces al despertar?",
    options: [
      "Me toco la barriga para ver si desinflamó",
      "Me miro al espejo buscando cambios",
      "Me pongo ropa ancha para disimular",
      "Evito mirarme"
    ]
  },
  {
    id: 2,
    question: "¿Qué parte de tu cuerpo te genera más incomodidad?",
    options: [
      "Abdomen hinchado",
      "Cintura marcada por la ropa",
      "Cara inflamada",
      "Todo el cuerpo pesado"
    ]
  },
  {
    id: 3,
    question: "¿Cuándo te sientes peor con tu cuerpo?",
    options: [
      "Al despertar",
      "Después de comer",
      "Por la tarde",
      "Todo el día"
    ]
  },
  {
    id: 4,
    question: "¿Qué sientes cuando comes algo ‘fuera de la dieta’?",
    options: [
      "Culpa inmediata",
      "Ansiedad",
      "Pensamiento de ‘ya arruiné todo’",
      "Frustración silenciosa"
    ]
  },
  {
    id: 5,
    question: "¿Qué has probado antes sin resultados reales?",
    options: [
      "Dietas estrictas",
      "Ayuno intermitente",
      "Tés genéricos",
      "Pastillas o suplementos",
      "Todo un poco"
    ]
  },
  {
    id: 6,
    question: "¿Cómo te sientes cuando ves cuerpos ‘perfectos’ en redes?",
    options: [
      "Me comparo y me siento peor",
      "Me motivo… pero dura poco",
      "Me genera ansiedad",
      "Finjo que no me importa"
    ]
  },
  {
    id: 7,
    question: "¿Qué haces para ‘esconder’ tu cuerpo?",
    options: [
      "Uso ropa más grande",
      "Evito fotos",
      "Me cubro con bolsas o mochilas",
      "Evito ciertos planes"
    ]
  },
  {
    id: 8,
    question: "¿Qué pasa con tu energía durante el día?",
    options: [
      "Me levanto cansada",
      "Después de comer me apago",
      "Por la tarde no rindo",
      "Estoy cansada todo el tiempo"
    ]
  },
  {
    id: 9,
    question: "¿Qué pensamiento se repite más en tu cabeza?",
    options: [
      "‘Nada me funciona’",
      "‘Empiezo el lunes’",
      "‘Mi cuerpo está arruinado’",
      "‘Algo hago mal’"
    ]
  },
  {
    id: 10,
    question: "¿Qué te frustra más?",
    options: [
      "No bajar aunque me cuide",
      "Sentirme hinchada siempre",
      "No mantener la constancia",
      "No entender mi cuerpo"
    ]
  },
  {
    id: 11,
    question: "Si mañana despertaras diferente, ¿qué notarías primero?",
    options: [
      "Menos hinchazón",
      "Más ligereza",
      "Más energía",
      "Más confianza"
    ]
  },
  {
    id: 12,
    question: "¿Qué estás buscando de verdad?",
    options: [
      "Una solución simple",
      "Algo que se adapte a mí",
      "Sentirme bien sin sufrir",
      "Volver a confiar en mi cuerpo"
    ]
  }
];

// Interim Analysis Component
function AnalysisView({ type, onContinue }: { type: 'first' | 'second', onContinue: () => void }) {
  const isFirst = type === 'first';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-1 px-6 pb-10 flex flex-col items-center justify-center text-center space-y-8"
    >
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-2">
        <BarChart className="w-8 h-8" />
      </div>

      <div>
        <h2 className="text-2xl font-serif text-stone-900 mb-3">
          {isFirst ? "Este es un análisis inicial de tu perfil" : "Tu cuerpo está listo para cambiar"}
        </h2>
        <p className="text-stone-500 text-sm max-w-xs mx-auto">
          {isFirst
            ? "Basado en tus primeras respuestas, hemos identificado patrones clave."
            : "Ya tenemos casi todo lo necesario. Tu determinación es alta (95%)."}
        </p>
      </div>

      {/* Stats Bars - Only shown in distinct ways or updated values */}
      <div className="w-full max-w-xs space-y-6">
        {/* Metric 1 */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-stone-600">
            <span>Mentalidad y Motivación</span>
            <span className="text-lime-600">95%</span>
          </div>
          <div className="h-3 w-full bg-stone-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-lime-500"
              initial={{ width: 0 }}
              animate={{ width: "95%" }}
              transition={{ duration: 1, delay: 0.2 }}
            />
          </div>
          <p className="text-[10px] text-left text-stone-400">Perfecta para iniciar el cambio.</p>
        </div>

        {/* Metric 2 */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-stone-600">
            <span>Conocimiento Actual</span>
            <span className="text-blue-600">{isFirst ? "40%" : "65%"}</span>
          </div>
          <div className="h-3 w-full bg-stone-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-blue-500"
              initial={{ width: 0 }}
              animate={{ width: isFirst ? "40%" : "65%" }}
              transition={{ duration: 1, delay: 0.4 }}
            />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-stone-600">
            <span>Bienestar General</span>
            <span className="text-red-500">{isFirst ? "27%" : "27%"}</span>
          </div>
          <div className="h-3 w-full bg-stone-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-red-500"
              initial={{ width: 0 }}
              animate={{ width: "27%" }}
              transition={{ duration: 1, delay: 0.6 }}
            />
          </div>
          <p className="text-[10px] text-left text-red-400 font-medium">Atención necesaria.</p>
        </div>
      </div>

      <div className="w-full max-w-xs pt-4">
        {isFirst ? (
          <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 mb-6">
            <h3 className="text-amber-800 font-serif font-bold text-sm mb-1">¿Preparamos un plan de acción?</h3>
            <p className="text-amber-700/80 text-xs">
              Un plan exclusivo y hecho para ti, de acuerdo con tus necesidades. Sé sincera en las próximas preguntas.
            </p>
          </div>
        ) : (
          <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 mb-6">
            <h3 className="text-primary font-serif font-bold text-sm mb-1">Último paso...</h3>
            <p className="text-stone-600 text-xs">
              Solo necesitamos afinar unos detalles finales para generar tu protocolo.
            </p>
          </div>
        )}

        <Button
          onClick={onContinue}
          className="w-full h-14 text-lg shadow-xl shadow-primary/20 animate-pulse-slow"
        >
          {isFirst ? "Continuar Análisis" : "Ver mi Resultado"}
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </motion.div>
  );
}

export default function Quiz() {
  const [, setLocation] = useLocation();
  const { currentStep, nextStep, prevStep, setAnswer, answers } = useQuizStore();
  const [direction, setDirection] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  // Track which interim screens have been shown to avoid loops
  const [passedInterims, setPassedInterims] = useState<number[]>([]);

  // If we reload on a step that doesn't exist (out of bounds), reset
  useEffect(() => {
    if (currentStep < 0) {
      // should ideally reset but store persists, let's just ignore for now
    }
  }, [currentStep]);

  const handleOptionSelect = async (option: string) => {
    setAnswer(currentStep, option);

    if (currentStep < QUESTIONS.length - 1) {
      setDirection(1);
      setTimeout(() => nextStep(), 250); // slight delay for visual feedback
    } else {
      // Quiz completed
      setIsProcessing(true);
      console.log("Quiz completed locally");

      // Fake processing delay
      setTimeout(() => {
        setLocation("/results");
      }, 3000);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setDirection(-1);
      prevStep();
    } else {
      setLocation("/");
    }
  };

  // CHECK INTERIM LOGIC (Synchronous Render Hijack)
  // Step 5 check adjusted for new question (currentStep 6 now = after 6 questions)
  if (currentStep === 6 && !passedInterims.includes(6)) {
    return (
      <div className="min-h-screen bg-background flex flex-col max-w-lg mx-auto shadow-2xl shadow-stone-200/50 pt-10">
        <AnalysisView
          type="first"
          onContinue={() => setPassedInterims(prev => [...prev, 6])}
        />
      </div>
    );
  }

  // Step 10 check adjusted (currentStep 11 now)
  if (currentStep === 11 && !passedInterims.includes(11)) {
    return (
      <div className="min-h-screen bg-background flex flex-col max-w-lg mx-auto shadow-2xl shadow-stone-200/50 pt-10">
        <AnalysisView
          type="second"
          onContinue={() => setPassedInterims(prev => [...prev, 11])}
        />
      </div>
    );
  }

  // Processing Screen
  if (isProcessing) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-8"
        >
          <div className="w-16 h-16 rounded-full bg-primary/20" />
        </motion.div>

        <h2 className="text-2xl font-serif text-foreground mb-2">Analizando tu tipo de cuerpo...</h2>
        <motion.p
          className="text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Identificando la combinación de tés...
        </motion.p>
        <motion.p
          className="text-muted-foreground mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          Creando tu rutina personalizada...
        </motion.p>
      </div>
    );
  }

  const currentQuestion = QUESTIONS[currentStep];
  const progress = ((currentStep + 1) / QUESTIONS.length) * 100;

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-lg mx-auto shadow-2xl shadow-stone-200/50">
      {/* Header */}
      <div className="p-6 pb-2 pt-8 flex items-center justify-between">
        <button
          onClick={handleBack}
          className="p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
          Paso {currentStep + 1} de {QUESTIONS.length}
        </span>
        <div className="w-6" /> {/* spacer for center alignment */}
      </div>

      {/* Progress Bar */}
      <div className="px-6 mb-8">
        <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Question Content */}
      <div className="flex-1 px-6 pb-10 flex flex-col relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            initial={{ x: direction > 0 ? 50 : -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction > 0 ? -50 : 50, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full flex-1 flex flex-col"
          >
            <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-8 leading-snug">
              {currentQuestion.question}
            </h2>

            {currentQuestion.id === 999 ? (
              // 3-OPTION CARD LAYOUT (New Age Question)
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {currentQuestion.options.map((option, idx) => {
                  let imgSource;
                  if (idx === 0) imgSource = age18Img;
                  else if (idx === 1) imgSource = age40Img;
                  else imgSource = age65Img;

                  return (
                    <button
                      key={idx}
                      onClick={() => handleOptionSelect(option)}
                      className="relative group overflow-hidden rounded-2xl shadow-md border-2 border-transparent hover:border-primary transition-all bg-white aspect-[3/4] md:aspect-auto"
                    >
                      <img
                        src={imgSource}
                        alt={option}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Footer Label */}
                      <div className="absolute bottom-4 left-0 right-0 px-4 text-center">
                        <span className="text-lg font-bold text-white shadow-sm">
                          {option}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              // STANDARD LAYOUT
              <div className="space-y-3">
                {currentQuestion.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(option)}
                    className={`
                      w-full p-4 md:p-5 text-left rounded-2xl border-2 transition-all duration-200
                      flex items-center group
                      ${answers[currentStep] === option
                        ? "border-primary bg-primary/5 text-primary-foreground"
                        : "border-transparent bg-white shadow-sm hover:border-primary/30 hover:shadow-md text-stone-600"}
                    `}
                  >
                    <span className={`
                      w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mr-4 border
                      transition-colors duration-200
                      ${answers[currentStep] === option
                        ? "bg-primary text-white border-primary"
                        : "bg-background border-border text-muted-foreground group-hover:border-primary/50"}
                    `}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className={`text-lg ${answers[currentStep] === option ? "text-primary font-medium" : ""}`}>
                      {option}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
