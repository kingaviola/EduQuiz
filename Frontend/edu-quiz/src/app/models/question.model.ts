import { Image } from '../../app/models/image.model';

export class Question {
    constructor(
        public id: number,
        public questionText: string,
        public image: Image | null,
        public type: string,
        public answers: AnswerOption[]
    ) {}
}

export class AnswerOption {
    constructor(
        public id: number,
        public point: number
    ) {}
}

//checkbox, radio, missingText is SimpleAnswer because they have the same inputs
export class SimpleAnswer  extends AnswerOption {
    public correctness: boolean;
    public answerText: string;

    constructor(id: number, point: number, correctness: boolean, answerText: string) {
        super(id, point);
        this.correctness = correctness,
        this.answerText = answerText
    }
}

export class RightOrderAnswer extends AnswerOption {
    public order: number;
    public answerText: string;

    constructor(id: number, point: number, order: number, answerText: string) {
        super(id, point);
        this.order = order;
        this.answerText = answerText;
    }
}

export class PairingAnswer extends AnswerOption {
    public base: string;
    public pair: string;
    
    constructor(id: number, point: number, base: string, pair: string) {
        super(id, point);
        this.base = base;
        this.pair = pair;
    }
}

export class FreeTextAnswer extends AnswerOption {
    public answerText: string;
    
    constructor(id: number, point: number, answerText: string) {
        super(id, point);
        this.answerText = answerText;
    }
}

export class CalculateAnswer  extends AnswerOption {
    public variables: Variable[];
    public result: number;

    constructor(id: number, point: number, variables: Variable[], result: number) {
        super(id, point);
        this.variables = variables;
        this.result = result;
    }
}

export class Variable {
    constructor(
        public id: number,
        public name: string,
        public value: number
    ) {}
}
