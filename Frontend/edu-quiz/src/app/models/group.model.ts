export class Group {
    constructor (
        public id: string,
        public name: string,
        public desc: string,
        public memberIds: string[],
        public creatorId: string,
        public creatorName: string,
        public joinCode: string,
        public sharedQuizIds: string[]
    ) {}
}