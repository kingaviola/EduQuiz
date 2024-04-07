import { group } from '@angular/animations';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { AnswerOption, CalculateAnswer, FreeTextAnswer, PairingAnswer, Question, RightOrderAnswer, SimpleAnswer, Variable } from 'src/app/models/question.model';


@Component({
  selector: 'app-fillable-question',
  templateUrl: './fillable-question.component.html',
  styleUrls: ['./fillable-question.component.scss']
})
export class FillableQuestionComponent implements OnInit {
  @Input() originalQuestions: Question[] = [];
  fillables: Question[] = [];

  constructor() { }

  ngOnInit(): void {

    // console.log("original", this.originalQuestions);
    // console.log("fillable", this.fillables);
    this.chooseRandomCalculates();
  }


  findVariables(text: string, variables: Variable[]): string {
    console.log(text);
    const regex = /\[\[(.*?)\]\]/g;

    const interpolatedText = text.replace(regex, (_match, group) => {
      const variable = variables.find(v => v.name === group);
      return variable ? variable.value.toString() : '';
    });

    return interpolatedText;
  }

  chooseRandomCalculates() {
    this.fillables.forEach((question, questionIdx) => {
      if (question.type == "calculate") {
        const chosenIdx = this.getRandomCalculateAnswer(question);
        question.answers = this.fillables[questionIdx].answers.filter((ans, idx) => idx !== chosenIdx);
        if (this.isCalcAnswer(question.answers[0])) {
          question.questionText = this.findVariables(question.questionText, question.answers[0].variables);
        }
      }
    });
  }

  getRandomCalculateAnswer(question: Question): number {
    let numOfAnswers = question.answers.length;
    const randomIndex = Math.floor(Math.random() * numOfAnswers);

    return randomIndex;
  }

  isSimpleAnswer(answer: AnswerOption): answer is SimpleAnswer {
    return answer instanceof SimpleAnswer;
  }

  isCalcAnswer(answer: AnswerOption): answer is CalculateAnswer {
    return answer instanceof CalculateAnswer;
  }

  isPairingAnswer(answer: AnswerOption): answer is PairingAnswer {
    return answer instanceof PairingAnswer;
  }

  isRightOrderAnswer(answer: AnswerOption): answer is RightOrderAnswer {
    return answer instanceof RightOrderAnswer;
  }

  isFreeTextAnswer(answer: AnswerOption): answer is FreeTextAnswer {
    return answer instanceof FreeTextAnswer;
  }
}
