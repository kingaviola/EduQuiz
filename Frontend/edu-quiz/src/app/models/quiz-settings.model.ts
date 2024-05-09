export class QuizSettings {
    constructor(
        public isQuestionRandom: boolean,
        public isAnswerRandom: boolean,
        public useAllQuestion: boolean,
        public usedQuestions: number,
        public isStart: boolean,
        public startTime: string,
        public startDate: string,
        public isDeadline: boolean,
        public deadlineTime: string,
        public deadlineDate: string,
        public isDuration: boolean,
        public duration: number,
        public showAnswers: boolean
    ) { }
}