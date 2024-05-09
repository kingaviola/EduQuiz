export class QuizCard {
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public creationDate: Date,
        public deadline: Date,
        public creatorId: number
    ) {}
}