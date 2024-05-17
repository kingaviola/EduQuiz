export class StatisticsBaseModel {
    constructor (
        public name: string,
        public value: number
    ) {}
}

export class StatisticsBarModel {
    constructor(
        public name: string,
        public series: StatisticsBaseModel[]
    ) {}
}