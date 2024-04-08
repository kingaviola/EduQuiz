import { UserData } from "./user-data.model";

export class QuizCard {
    constructor(
        public id: string,
        public name: string,
        public desc: string,
        public dueDate: Date,
        public creator: UserData,
        public creationDate: Date
    ) {}
}