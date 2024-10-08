import { Injectable } from '@angular/core';
import { AnswerOption, CalculateAnswer, FreeTextAnswer, PairingAnswer, Question, RightOrderAnswer, SimpleAnswer, Variable } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class ProcessImportedDataService {

  constructor() { }


  mapXmlQuestions(data: any): Question[] {
    return data.Questions.Question.map((question: any) => this.mapXmlQuestion(question));
  }

  mapXmlQuestion(data: any): Question {
    const answers: AnswerOption[] = this.mapXmlAnswers(data.answers.AnswerOption, data.type._text);

    return new Question(0, data.questionText._text, data.image, data.type._text, answers);
  }

  mapXmlAnswers(answer: any, type: string): AnswerOption[] {
    if (!Array.isArray(answer)) {
      answer = [answer];
    }

    return answer.map((answer: any) => this.mapXmlAnswer(answer, type));
  }

  mapXmlAnswer(answer: any, type: string): AnswerOption {
    let point = parseInt(answer.point._text, 10);
    switch (type) {
      case 'calculate':
        const variables = answer.variables.Variable;
        const vars: Variable[] = this.mapXmlVariables(variables);
        let result = parseInt(answer.result._text, 10);
        return new CalculateAnswer(0, point, vars, result);
      case 'pairing':
        return new PairingAnswer(0, point, answer.base._text, answer.pair._text);
      case 'rightOrder':
        let order = parseInt(answer.order._text, 10);
        return new RightOrderAnswer(0, point, order, answer.text._text);
      case 'freeText':
        return new FreeTextAnswer(0, point, answer.text._text);
      default:
        let correctness = answer.correctness._text === 'true';
        return new SimpleAnswer(0, point, correctness, answer.text._text);
    }
  }

  mapXmlVariables(variables: any): Variable[] {
    if (!Array.isArray(variables)) {
      variables = [variables];
    }

    return variables.map((v: any) => new Variable(0, v.name._text, parseInt(v.value._text, 10)));
  }

  mapJsonQuestions(data: any): Question[] {
    return data.questions.map((question: any) => this.mapJsonQuestion(question));
  }

  mapJsonQuestion(data: any): Question {
    const answers: AnswerOption[] = data.answers.map((answer: any, type: string) => this.mapJsonAnswer(answer, data.type))

    let question = new Question(data.id, data.questionText, data.image, data.type, answers);
    return question;
  }

  mapJsonAnswer(answer: any, type: string): AnswerOption {
    let v: Variable[] = [];
    switch (type) {
      case 'calculate':
        const variables: Variable[] = answer.variables.map((variable: any) => new Variable(0, variable.name, variable.value));
        return new CalculateAnswer(answer.id , answer.point, variables, answer.result);
      case 'pairing':
        return new PairingAnswer(answer.id, answer.point, answer.base, answer.pair);
      case 'rightOrder':
        return new RightOrderAnswer(answer.id, answer.point, answer.order, answer.answerText);
      case 'freeText':
        return new FreeTextAnswer(answer.id, answer.point, answer.answerText);
      default:
        return new SimpleAnswer(answer.id, answer.point, answer.correctness, answer.answerText);
    }
  }

  mapJsonVariables(variable: any): Variable[] {
    return variable.map((v: any) => this.mapJsonVariable(v));
  }

  mapJsonVariable(variable: any): Variable {
    return new Variable(variable.id, variable.name, variable.number);
  }
}
