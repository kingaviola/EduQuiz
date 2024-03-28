export class Question {
    constructor(
        public questionText: string,
        public image: File | null,
        public type: string,
        public answers: AnswerOption[]
    ) {}
}

export class AnswerOption {
    constructor(
        public point: number
    ) {}
}

//checkbox, radio, missingText is SimpleAnswer because they have the same inputs
export class SimpleAnswer  extends AnswerOption {
    public correctness: boolean;
    public answerText: string;

    constructor(point: number, correctness: boolean, answerText: string) {
        super(point);
        this.correctness = correctness,
        this.answerText = answerText
    }
}

export class RightOrderAnswer extends AnswerOption {
    public order: number;
    public answerText: string;

    constructor(point: number, order: number, answerText: string) {
        super(point);
        this.order = order;
        this.answerText = answerText;
    }
}

export class PairingAnswer extends AnswerOption {
    public base: string;
    public pair: string;
    
    constructor(point: number, base: string, pair: string) {
        super(point);
        this.base = base;
        this.pair = pair;
    }
}

export class FreeTextAnswer extends AnswerOption {
    public answerText: string;
    
    constructor(point: number, answerText: string) {
        super(point);
        this.answerText = answerText;
    }
}

export class CalculateAnswer  extends AnswerOption {
    public variales: Variable[];
    public result: number;

    constructor(point: number, variables: Variable[], result: number) {
        super(point);
        this.variales = variables;
        this.result = result;
    }
}

export class Variable {
    constructor(
        public name: string,
        public value: number
    ) {}
}
