import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  Flashcard,
  QuizQuestion,
  Subject,
  UserProgress,
} from "../backend.d";
import { useActor } from "./useActor";
import { useInternetIdentity } from "./useInternetIdentity";

export function useAllSubjects() {
  const { actor, isFetching } = useActor();
  return useQuery<Subject[]>({
    queryKey: ["subjects"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllSubjects();
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 5,
  });
}

export function useFlashcardsBySubject(subject: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Flashcard[]>({
    queryKey: ["flashcards", subject],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFlashcardsBySubject(subject);
    },
    enabled: !!actor && !isFetching && !!subject,
    staleTime: 1000 * 60 * 5,
  });
}

export function useQuizQuestionsBySubject(subject: string) {
  const { actor, isFetching } = useActor();
  return useQuery<QuizQuestion[]>({
    queryKey: ["quiz", subject],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getQuizQuestionsBySubject(subject);
    },
    enabled: !!actor && !isFetching && !!subject,
    staleTime: 1000 * 60 * 5,
  });
}

export function useUserProgress() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();
  return useQuery<UserProgress | null>({
    queryKey: ["progress", identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor || !identity) return null;
      return actor.getUserProgress(identity.getPrincipal());
    },
    enabled: !!actor && !isFetching && !!identity,
    staleTime: 1000 * 60,
  });
}

export function useUpdateProgress() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const { identity } = useInternetIdentity();
  return useMutation({
    mutationFn: async ({
      reviewedFlashcards,
      quizScores,
      studyTime,
    }: {
      reviewedFlashcards: bigint[];
      quizScores: [string, bigint][];
      studyTime: bigint;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.updateUserProgress(
        reviewedFlashcards,
        quizScores,
        studyTime,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["progress", identity?.getPrincipal().toString()],
      });
    },
  });
}

export function useSeedData() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("No actor");
      return actor.seedData();
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
}
