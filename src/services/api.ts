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

const handleResponse = async (res: Response) => {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "API Error");
  }
  return res.json();
};

export const api = {
  login: async (data: LoginRequest): Promise<User> => {
    const res = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  register: async (data: RegisterRequest): Promise<User> => {
    const res = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  getPublishedTests: async (): Promise<Test[]> => {
    const res = await fetch(`${BASE_URL}/tests`);
    return handleResponse(res);
  },

  getAdminTests: async (): Promise<Test[]> => {
    const res = await fetch(`${BASE_URL}/tests/all`);
    return handleResponse(res);
  },

  getTestById: async (id: string): Promise<Test> => {
    const res = await fetch(`${BASE_URL}/tests/${id}`);
    return handleResponse(res);
  },

  createTest: async (data: CreateTestRequest): Promise<Test> => {
    const res = await fetch(`${BASE_URL}/tests`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  publishTest: async (testId: number): Promise<string> => {
    const res = await fetch(`${BASE_URL}/tests/${testId}/publish`, {
      method: "PUT",
    });
    return handleResponse(res);
  },

  deleteTest: async (id: number): Promise<string> => {
    const res = await fetch(`${BASE_URL}/tests/${id}`, {
      method: "DELETE",
    });
    return handleResponse(res);
  },

  startAttempt: async (userId: number, testId: number) => {
    const res = await fetch(`${BASE_URL}/attempts/start`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, testId }),
    });
    return handleResponse(res);
  },

  submitAnswer: async (
    attemptId: number,
    questionId: number,
    selectedOptionId: number
  ) => {
    const res = await fetch(`${BASE_URL}/attempts/answer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ attemptId, questionId, selectedOptionId }),
    });
    return handleResponse(res);
  },

  submitTestFinal: async (attemptId: number): Promise<AttemptResult> => {
    const res = await fetch(`${BASE_URL}/attempts/submit/${attemptId}`, {
      method: "POST",
    });
    return handleResponse(res);
  },

  getAttemptsByUserId: async (userId: number): Promise<AttemptResult[]> => {
    const res = await fetch(`${BASE_URL}/attempts/user/${userId}`);
    return handleResponse(res);
  },

  createQuestion: async (
    data: CreateQuestionRequest
  ): Promise<Question> => {
    const res = await fetch(`${BASE_URL}/question`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  getQuestionsByTestId: async (
    testId: number
  ): Promise<Question[]> => {
    const res = await fetch(`${BASE_URL}/question/test/${testId}`);
    return handleResponse(res);
  },

  deleteQuestion: async (id: number): Promise<string> => {
    const res = await fetch(`${BASE_URL}/question/${id}`, {
      method: "DELETE",
    });
    return handleResponse(res);
  },

  getReport: async (): Promise<{ testName: string; attempts: number }[]> => {
    const res = await fetch(`${BASE_URL}/report`);
    return handleResponse(res);
  },
};