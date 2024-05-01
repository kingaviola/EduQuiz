export class QuizSettings {
    constructor(
        public isQuestionsRandom: boolean,
        public isAnswersRandom: boolean,
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