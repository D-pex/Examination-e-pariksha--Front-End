
export interface User {
  id: string;
  name: string;
  email: string;
  token?: string;
}

export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  options: Option[];
  correctAnswer?: string;
  testId: string;
}

export interface Test {
  id: string;
  name: string;
  subject: string;
  description: string;
  durationMinutes: number;
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
  durationMinutes: number;
}

export interface CreateQuestionRequest {
  text: string;
  options: { text: string }[];
  correctAnswer: string;
  testId: string;
}

export type Answers = Record<string, string>;