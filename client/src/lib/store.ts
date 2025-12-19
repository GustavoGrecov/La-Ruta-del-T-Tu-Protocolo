import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface QuizState {
  currentStep: number;
  answers: Record<number, string>;
  isCompleted: boolean;
  setAnswer: (step: number, answer: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetQuiz: () => void;
  completeQuiz: () => void;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set) => ({
      currentStep: 0,
      answers: {},
      isCompleted: false,
      setAnswer: (step, answer) =>
        set((state) => ({
          answers: { ...state.answers, [step]: answer },
        })),
      nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
      prevStep: () => set((state) => ({ currentStep: Math.max(0, state.currentStep - 1) })),
      resetQuiz: () => set({ currentStep: 0, answers: {}, isCompleted: false }),
      completeQuiz: () => set({ isCompleted: true }),
    }),
    {
      name: 'quiz-storage',
    }
  )
);
