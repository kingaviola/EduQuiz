export class QuizCard {
    constructor(
        public id: string,
        public name: string,
        public desc: string,
        public dueDate: Date,
        public creatorId: string,
        public creationDate: Date
    ) {}
}