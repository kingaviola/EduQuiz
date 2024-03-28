export interface Question {
    questionText: string,
    image: File | null,
    type: string,
    answers: AnswerOption[]
}

export interface AnswerOption {
    correctness: boolean;
    answerText: string;
    point: number;
}