import { Question } from "./question.model";

export class FilledQuiz {
    constructor (
        public id: number,
        public userId: number,
        public quizId: number,
        public quizName: string,
        public quizCreatorId: number,
        public isChecked: boolean,
        public questions: Question[]
    ) {}
}