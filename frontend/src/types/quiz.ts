export type QuestionType = "TRUE_FALSE" | "OPEN_ENDED" | "MULTIPLE_CHOICE";

export interface CheckboxOption {
  id?: number | string; 
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: number; 
  text: string;
  type: QuestionType;
  quizId: number;
  correctAnswer?: string | null;
  options?: CheckboxOption[];
}

export interface QuestionInput {
  id: string; 
  text: string;
  type: QuestionType;
  correctAnswer?: string | boolean | null;
  options?: CheckboxOption[];
}

export interface Quiz {
  id: number;
  title: string;
  questions: Question[];
}

export interface QuizCreateInput {
  title: string;
  questions: Omit<QuestionInput, 'id'>[];
}

export interface QuizListItem {
  id: number;
  title: string;
  _count: {
    questions: number;
  };
}