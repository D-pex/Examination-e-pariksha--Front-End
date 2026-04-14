export interface OptionDto {
    id: string;
    text: string;
    isCorrect: boolean;
}

export interface QuestionDto {
    id: string;
    text: string;
    options: OptionDto[];
}

export interface TestDto {
    id: string;
    name: string;
    subject: string;
    description: string;
    durationMinutes: number;
    isPublished: boolean;
    questions: QuestionDto[];
}

export interface TestReportDto {
    testId: string;
    testName: string;
    usersAppeared: number;
}

export interface TestResultDto {
    score: number;
    total: number;
    passed: boolean;
}