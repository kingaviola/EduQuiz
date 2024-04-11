export class GroupCard {
    constructor (
        public id: string,
        public name: string,
        public membersNum: number,
        public desc: string,
        public creatorId: string,
        public creatorName: string,
        public joinCode: string
    ) {}
}