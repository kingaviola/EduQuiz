export class GroupCard {
    constructor (
        public id: number,
        public name: string,
        public membersNum: number,
        public desc: string,
        public creatorId: number,
        public creatorName: string,
        public joinCode: string
    ) {}
}