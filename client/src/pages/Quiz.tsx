import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useQuizStore } from "@/lib/store";
import { Button } from "@/components/Button";
import { ChevronLeft } from "lucide-react";
import { useSubmitQuiz } from "@/hooks/use-quiz";

const QUESTIONS = [
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

export default function Quiz() {
  const [, setLocation] = useLocation();
  const { currentStep, nextStep, prevStep, setAnswer, answers } = useQuizStore();
  const [direction, setDirection] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const submitQuiz = useSubmitQuiz();

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
      
      // Submit results silently
      try {
        await submitQuiz.mutateAsync({ ...answers, [currentStep]: option });
      } catch (e) {
        // ignore errors, we want to show results anyway
        console.error("Submission failed but proceeding", e);
      }
      
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
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
