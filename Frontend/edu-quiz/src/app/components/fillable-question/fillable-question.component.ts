import { group } from '@angular/animations';
import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AnswerOption, CalculateAnswer, FreeTextAnswer, PairingAnswer, Question, RightOrderAnswer, SimpleAnswer, Variable } from 'src/app/models/question.model';
import cloneDeep from 'lodash/cloneDeep';
import shuffle from 'lodash/shuffle';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-fillable-question',
  templateUrl: './fillable-question.component.html',
  styleUrls: ['./fillable-question.component.scss']
})
export class FillableQuestionComponent implements OnInit, OnChanges {
  @Input() originalQuestions: Question[] = [];
  @Input() checkResults: boolean = false;
  @Input() questionGroupIndexes: number[] = []
  @Output() filling = new EventEmitter<any>();
  fillables: Question[] = [];
  userAnswers: Map<string, boolean> = new Map();
  isSubmitted: boolean = false;
  dataInitialized: boolean = false;
  startIndexes: number[] = [];
  endIndexes: number[] = [];
  isStepBtnHidden: boolean = false;

  constructor() { }

  setUserAnswer(key: string, value: boolean) {
    this.userAnswers.set(key, value);
  }

  isNewQuestionGroup(questionIdx: number, idx: number): boolean {
    // let isNewGroup = false;
    console.log("question idx: ", questionIdx, " idx: ", idx , " start: ", this.startIndexes[idx]-1, " end: ", this.endIndexes[idx]-1);
    if ( questionIdx >= this.startIndexes[idx]-1 && questionIdx <= this.endIndexes[idx]-1){
      this.isStepBtnHidden = false;
      return true;
    }
    this.isStepBtnHidden = true;
    return false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['originalQuestions'] && !this.dataInitialized){      
      this.fillables = [];
      
      this.fillables = cloneDeep(this.originalQuestions);
      console.log(this.fillables);

      this.chooseRandomCalculates();
      this.shuffleRigthOrderAnswers();
      this.clearValues();
      if (this.fillables.length > 0){
        this.dataInitialized = true;
      }

      this.startIndexes = this.questionGroupIndexes.filter((_, index) => index % 2 === 0);
      this.endIndexes = this.questionGroupIndexes.filter((_, index) => index % 2 !== 0);
      console.log("startIndexes: ", this.startIndexes);
      console.log("endindexes: ", this.endIndexes);
    }

    if (changes['checkResults'] && changes['checkResults'].currentValue){
      this.checkQuiz();
      this.isSubmitted = true;
    }
  }

  checkQuiz() {
    this.originalQuestions.forEach((question, qi) => {
      question.answers.forEach((answer, ai) => {
        switch(question.type) {
          case 'radio':
          case 'checkbox':
            if (answer instanceof SimpleAnswer){
              const filled = this.fillables[qi].answers[ai] as SimpleAnswer;
              const key = `${qi}-${ai}`;
              const isCorrect = filled.correctness === answer.correctness;
              if (!isCorrect) {
                this.fillables[qi].answers[ai].point = 0;
              }
              else {
                this.fillables[qi].answers[ai].point = answer.point;
              }
              this.setUserAnswer(key, isCorrect);
            }
            break;
          case 'missingText':
            if (answer instanceof SimpleAnswer) {
              if (answer.correctness == true) {
                const filled = this.fillables[qi].answers[ai] as SimpleAnswer;
                const key = `${qi}-${ai}`;
                const isCorrect = filled.answerText === answer.answerText;
                if (!isCorrect) {
                  this.fillables[qi].answers[ai].point = 0;
                }
                else {
                  this.fillables[qi].answers[ai].point = answer.point;
                }
                this.setUserAnswer(key, isCorrect);
              }
            }
            break;
          case 'rightOrder':
            if (answer instanceof RightOrderAnswer){
              const filled = this.fillables[qi].answers[ai] as RightOrderAnswer;
              const key = `${qi}-${ai}`;
              const isCorrect = filled.order === answer.order;
              if (!isCorrect) {
                this.fillables[qi].answers[ai].point = 0;
              }
              else {
                this.fillables[qi].answers[ai].point = answer.point;
              }
              this.setUserAnswer(key, isCorrect);
            }
            break;
          case 'pairing':
            if (answer instanceof PairingAnswer) {
              const filled = this.fillables[qi].answers[ai] as PairingAnswer;
              const key = `${qi}-${ai}`;
              const isCorrect = filled.pair === answer.pair;
              if (!isCorrect) {
                this.fillables[qi].answers[ai].point = 0;
              }
              else {
                this.fillables[qi].answers[ai].point = answer.point;
              }
              this.setUserAnswer(key, isCorrect);
            }
            break;
          case 'freeText':
            if (answer instanceof FreeTextAnswer) {
              const filled = this.fillables[qi].answers[ai] as FreeTextAnswer;
              const key = `${qi}-${ai}`;
              const isCorrect = filled.answerText === answer.answerText;
              if (!isCorrect) {
                this.fillables[qi].answers[ai].point = 0;
              }
              else {
                this.fillables[qi].answers[ai].point = answer.point;
              }
              this.setUserAnswer(key, isCorrect);
            }
            break; 
          case 'calculate':
          if (answer instanceof CalculateAnswer) {
            const filled = this.fillables[qi].answers[ai] as CalculateAnswer;
              if (filled != undefined) {
                const key = `${qi}-${ai}`;
                const isCorrect = filled.result === answer.result;
                if (!isCorrect) {
                  this.fillables[qi].answers[ai].point = 0;
                }
                else {
                  this.fillables[qi].answers[ai].point = answer.point;
                }
                this.setUserAnswer(key, isCorrect);
              }
          }
          break; 
        }
      });
    });
  }

  emitChanges() {
    this.checkQuiz();
    this.filling.emit(this.fillables);
  }


  ngOnInit(): void {
    this.fillables = cloneDeep(this.originalQuestions);

    this.chooseRandomCalculates();
    this.shuffleRigthOrderAnswers();
  }

  shuffleRigthOrderAnswers() {
    this.fillables.forEach((question, idx) => {
      if (question.type == "rightOrder"){
        let shuffleAnswers = shuffle(question.answers);
        this.fillables[idx].answers = shuffleAnswers;
      }
    });
  }

  clearValues() {
    this.fillables.forEach(question => {
      question.answers.forEach(answer => {
        if (answer instanceof SimpleAnswer && (question.type == 'radio' || question.type == 'checkbox')) {
          answer.correctness = false;
        }
        else if (answer instanceof SimpleAnswer && question.type == 'missingText') {
          if (answer.correctness) {
            answer.answerText = '';
          }
        }
        else if (answer instanceof FreeTextAnswer ) {
          answer.answerText = '';
        }
      })
    })
  }

  setCalculateAnswer(answer: CalculateAnswer, event: any) {
    answer.result = parseFloat(event.target.value);
    this.emitChanges();
  }


  dropRigthOrder(event: CdkDragDrop<AnswerOption[]>, questionIdx: number) {
    moveItemInArray(this.fillables[questionIdx].answers, event.previousIndex, event.currentIndex);
    this.emitChanges();
  }

  dropPairingPairOrder(event: CdkDragDrop<AnswerOption[]>, questionIdx: number) {
    let base: string[] = [];
    this.fillables[questionIdx].answers.forEach(answer => {
      if (this.isPairingAnswer(answer)) {
        base.push(answer.base);
      }
    });
    moveItemInArray(this.fillables[questionIdx].answers, event.previousIndex, event.currentIndex);
    this.fillables[questionIdx].answers.forEach((answer, index) => {
      if (this.isPairingAnswer(answer)) {
        answer.base = base[index];
      }
    });
    this.emitChanges();
  }



  findVariables(text: string, variables: Variable[]): string {
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
        console.log("question.answers: ", question.answers);
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
