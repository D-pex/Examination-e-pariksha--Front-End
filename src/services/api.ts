const BASE_URL = "http://localhost:5000/api";

export const api = {
  login: async (data: any) => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  register: async (data: any) => {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  getTests: async () => {
    const res = await fetch(`${BASE_URL}/tests`);
    return res.json();
  },

  getTestById: async (id: string) => {
    const res = await fetch(`${BASE_URL}/tests/${id}`);
    return res.json();
  },

  createTest: async (data: any) => {
    const res = await fetch(`${BASE_URL}/tests`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  submitAttempt: async (testId: string, userId: string, answers: any) => {
    const res = await fetch(`${BASE_URL}/attempts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ testId, userId, answers }),
    });
    return res.json();
  },
};