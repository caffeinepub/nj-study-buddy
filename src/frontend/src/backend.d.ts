import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Flashcard {
    id: bigint;
    front: string;
    testCategory?: string;
    subject: string;
    back: string;
    gradeLevel: string;
}
export interface UserProgress {
    quizScores: Array<[string, bigint]>;
    reviewedFlashcards: Array<bigint>;
    dailyStudyStreak: bigint;
    totalStudyTime: bigint;
    lastStudyDate: bigint;
}
export interface Subject {
    testCategory?: string;
    name: string;
    gradeLevel: string;
}
export interface QuizQuestion {
    id: bigint;
    testCategory?: string;
    question: string;
    subject: string;
    correctAnswer: bigint;
    gradeLevel: string;
    choices: Array<string>;
}
export interface backendInterface {
    addFlashcard(front: string, back: string, subject: string, gradeLevel: string, testCategory: string | null): Promise<void>;
    addQuizQuestion(question: string, choices: Array<string>, correctAnswer: bigint, subject: string, gradeLevel: string, testCategory: string | null): Promise<void>;
    addSubject(name: string, gradeLevel: string, testCategory: string | null): Promise<void>;
    getAllSubjects(): Promise<Array<Subject>>;
    getFlashcardsBySubject(subject: string): Promise<Array<Flashcard>>;
    getQuizQuestionsBySubject(subject: string): Promise<Array<QuizQuestion>>;
    getUserProgress(user: Principal): Promise<UserProgress>;
    seedData(): Promise<void>;
    updateUserProgress(reviewedFlashcards: Array<bigint>, quizScores: Array<[string, bigint]>, studyTime: bigint): Promise<void>;
}
