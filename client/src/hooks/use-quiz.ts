import { useMutation } from "@tanstack/react-query";
import { api, type InsertQuizSubmission } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useSubmitQuiz() {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (answers: Record<number, string>) => {
      // Transform the simplified answers record into the format expected by the DB (jsonb)
      const payload: InsertQuizSubmission = {
        answers: answers,
      };

      const res = await fetch(api.quiz.submit.path, {
        method: api.quiz.submit.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = await res.json();
          throw new Error(error.message || "Validación fallida");
        }
        throw new Error("Error al enviar el quiz");
      }

      return res.json();
    },
    onError: (error) => {
      console.error("Submission failed:", error);
      toast({
        title: "Error",
        description: "Hubo un problema al guardar tus resultados. Por favor intenta de nuevo.",
        variant: "destructive",
      });
    },
  });
}
