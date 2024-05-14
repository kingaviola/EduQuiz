import { Question } from "./question.model";

export class FilledHistory {
    constructor (
        public id: number,
        public userId: number,
        public quizId: number,
        public quizCreatorId: number,
        public isChecked: boolean,
        public questions: Question[]
    ) {}
}