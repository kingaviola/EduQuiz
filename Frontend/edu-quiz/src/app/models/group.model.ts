export class Group {
    constructor (
        public id: number,
        public name: string,
        public description: string,
        public memberIds: number[],
        public creatorId: number,
        public creatorName: string,
        public joinCode: string,
        public sharedQuizIds: number[]
    ) {}
}