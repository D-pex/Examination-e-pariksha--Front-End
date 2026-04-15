export interface Option {
    id: string;
    text: string;
    isCorrect: boolean;
}

export interface Question {
    id: string;
    text: string;
    options: OptionDto[];
}

export interface Test {
    id: string;
    name: string;
    subject: string;
    description: string;
    durationMinutes: number;
    isPublished: boolean;
    questions: QuestionDto[];
}

export interface TestReport {
    testId: string;
    testName: string;
    usersAppeared: number;
}

export interface TestResult {
    score: number;
    total: number;
    passed: boolean;
} 
export interface AttemptTest {
    userId: string;
    testId: string;
    totalScore: number;
    ispassed: boolean;
}