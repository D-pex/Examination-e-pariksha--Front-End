export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
  token?: string;
}

export interface Option {
  id: number;
  optionText: string;
}

export interface Question {
  id: number;
  questionText: string;
  options: Option[];
  testId: number;
}

export interface Test {
  id: number;
  name: string;
  subject: string;
  description: string;
  duration: number;
  isPublished: boolean;
  createdAt: string;
}

export interface AttemptResult {
  totalScore: number;
  ispassed: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface CreateTestRequest {
  name: string;
  subject: string;
  description: string;
  duration: number;
}

export interface CreateQuestionRequest {
  questionText: string;
  options: {
    optionText: string;
    isCorrect: boolean;
  }[];
  testId: number;
}

export type Answers = Record<number, number>;