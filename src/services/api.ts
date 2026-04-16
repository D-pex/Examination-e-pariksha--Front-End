import type {
  AttemptResult,
  CreateQuestionRequest,
  CreateTestRequest,
  LoginRequest,
  Question,
  RegisterRequest,
  Test,
  User
} from "../types";

const BASE_URL = "http://localhost:5179/api";

export const api = {
  login: async (data: LoginRequest): Promise<User> => {
    const res = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  register: async (data: RegisterRequest): Promise<User> => {
    const res = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  getTests: async (): Promise<Test[]> => {
    const res = await fetch(`${BASE_URL}/tests`);
    return res.json();
  },

  getTestById: async (id: string): Promise<Test> => {
    const res = await fetch(`${BASE_URL}/tests/${id}`);
    return res.json();
  },

  createTest: async (data: CreateTestRequest): Promise<Test> => {
    const res = await fetch(`${BASE_URL}/tests`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  startAttempt: async (userId: number, testId: number) => {
    const res = await fetch(`${BASE_URL}/attempts/start`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, testId }),
    });
    return res.json();
  },

  submitAnswer: async (
    attemptId: number,
    questionId: number,
    selectedOptionId: number
  ) => {
    await fetch(`${BASE_URL}/attempts/answer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ attemptId, questionId, selectedOptionId }),
    });
  },

  submitTestFinal: async (attemptId: number): Promise<AttemptResult> => {
    const res = await fetch(`${BASE_URL}/attempts/submit/${attemptId}`, {
      method: "POST",
    });
    return res.json();
  },

  getAttemptsByUserId: async (userId: number): Promise<AttemptResult[]> => {
    const res = await fetch(`${BASE_URL}/attempts/user/${userId}`);
    return res.json();
  },

  createQuestion: async (
    data: CreateQuestionRequest
  ): Promise<Question> => {
    const res = await fetch(`${BASE_URL}/question`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  getQuestionsByTestId: async (
    testId: number
  ): Promise<Question[]> => {
    const res = await fetch(`${BASE_URL}/question/test/${testId}`);
    return res.json();
  },

  deleteQuestion: async (id: number): Promise<string> => {
    const res = await fetch(`${BASE_URL}/question/${id}`, {
      method: "DELETE",
    });
    return res.json();
  },

  getReport: async (): Promise<{ testName: string; attempts: number }[]> => {
    const res = await fetch(`${BASE_URL}/report`);
    return res.json();
  },
};