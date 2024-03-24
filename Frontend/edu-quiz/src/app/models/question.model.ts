export class Question {
    constructor(
        public questionText: string,
        public image: File | null,
        public type: string,
        public answers: AnswerOption[]
    ) {}
}

export interface AnswerOption {
    correctness: boolean;
    answerText: string;
    point: number;
}