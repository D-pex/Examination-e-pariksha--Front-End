import { TestDto, TestReportDto, TestResultDto } from '../types/master';

const API_BASE_URL = 'http://localhost:5000/api';

export const api = {
    getPublishedTests: async (): Promise<TestDto[]> => {
        const response = await fetch(`${API_BASE_URL}/tests/published`);
        return response.json();
    },
    getTestById: async (id: string): Promise<TestDto> => {
        const response = await fetch(`${API_BASE_URL}/tests/${id}`);
        return response.json();
    },
    createTest: async (test: Partial<TestDto>): Promise<TestDto> => {
        const response = await fetch(`${API_BASE_URL}/tests`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(test)
        });
        return response.json();
    },
    publishTest: async (id: string): Promise<void> => {
        await fetch(`${API_BASE_URL}/tests/${id}/publish`, { method: 'POST' });
    },
    submitAttempt: async (testId: string, answers: Record<string, string>): Promise<TestResultDto> => {
        const response = await fetch(`${API_BASE_URL}/tests/${testId}/submit`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ answers })
        });
        return response.json();
    },
    getTestReports: async (): Promise<TestReportDto[]> => {
        const response = await fetch(`${API_BASE_URL}/tests/reports`);
        return response.json();
    }
};