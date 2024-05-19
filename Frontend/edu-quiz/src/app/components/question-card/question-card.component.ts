import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AnswerOption, CalculateAnswer, FreeTextAnswer, PairingAnswer, Question, RightOrderAnswer, SimpleAnswer, Variable } from 'src/app/models/question.model';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss']
})
export class QuestionCardComponent {
  @Input() newQuestion = new Question(0, '', null, '', []);
  @Input() questionIdx: number = -1;
  @Output() questionChanged: EventEmitter<Question> = new EventEmitter<Question>();
  @Output() deleteCardClick: EventEmitter<any> = new EventEmitter();
  @Output() duplicateCardClick: EventEmitter<any> = new EventEmitter();

  constructor() { }

  freeTextPlaceholder: string = "You can write here an example answer, which can help in the correction, or it can be showed after the submission. It has to be an answer, which could be the perfect answer.You can also write here the pointing method for the students.";

  deleteQuestion() {
    this.deleteCardClick.emit();
  }

  duplicateQuestion() {
    this.duplicateCardClick.emit();
  }

  updateOrder() {
    this.newQuestion.answers.forEach((answer, index) => {
      if (answer instanceof RightOrderAnswer){
        answer.order = index + 1;
      }
    });
  }

  calcVariables: Variable[] = [];

  calculateTextInterpolation() {
    if (this.newQuestion.type == 'calculate') {
      this.calcVariables = [];
      this.newQuestion.answers.forEach(answer => {
        if (answer instanceof CalculateAnswer) {
          answer.variables = [];
          let regex: RegExp = /\[\[([^[\]]+)\]\]/g;
          let matches: RegExpExecArray | null;
          
          while ((matches = regex.exec(this.newQuestion.questionText)) !== null) {
            this.calcVariables.push(new Variable(0, matches[1], 0))
            answer.variables.push(new Variable(0, matches[1], 0));
          }
        }
      });
    }
  }

  missingWholeText: string = '';

  createMissingWholeText() {
    this.missingWholeText = '';
    let texts: string[] = [];
    let checked: boolean[] = [];

    this.newQuestion.answers.forEach(answer => {
      if (answer instanceof SimpleAnswer) {
        texts.push(answer.answerText);
        checked.push(answer.correctness);
      }
    });

    texts.forEach((text, index) => {
      if (checked[index] == true ){
        this.missingWholeText += " _____ ";
      }
      else
        this.missingWholeText += " " + text;
    });
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

  emitQuestionChanges() {
    this.questionChanged.emit(this.newQuestion);
  }

  drop(event: CdkDragDrop<AnswerOption[]>) {
    moveItemInArray(this.newQuestion.answers, event.previousIndex, event.currentIndex);

    this.createMissingWholeText();
    this.updateOrder();

    this.emitQuestionChanges();
  }

  selectRadio(selected: number) {
    this.newQuestion.answers.forEach((answer, index) => {
      if (answer instanceof SimpleAnswer)
        answer.correctness = index === selected;
    });

    this.emitQuestionChanges();
  }

  selectCheckbox(selected: number) {
    const answer = this.newQuestion.answers[selected];

    if (answer instanceof SimpleAnswer) {
      answer.correctness = !answer.correctness;
    }

    if (this.newQuestion.type == "missingText")
      this.createMissingWholeText();

    this.emitQuestionChanges();
  }

  @ViewChild('fileInput') fileInput: any;
  selectedImage: any;

  uploadImage(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.newQuestion.image = file;
      
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;
      };
      reader.readAsDataURL(file);

    }

    this.emitQuestionChanges();
  }

  deleteImage() {
    this.selectedImage = null;
    this.fileInput.nativeElement.value = null;

    this.newQuestion.image = null;

    this.emitQuestionChanges();
  }

  dropDownOptions = [
    { value: "radio", text: "One right answer" },
    { value: "checkbox", text: "Multiple choice" },
    { value: "missingText", text: "Missing text" },
    { value: "calculate", text: "Calculate" },
    { value: "pairing", text: "Pairing" },
    { value: "rightOrder", text: "Right order" },
    { value: "freeText", text: "Text" }
  ];

  removeAnswerOption(idx: number) {
    this.newQuestion.answers.splice(idx, 1);

    if (this.newQuestion.type == "missingText")
      this.createMissingWholeText();

    this.emitQuestionChanges();
  }

  addAnswerOption() {
    switch (this.newQuestion.type){
      case 'calculate':
        this.newQuestion.answers.push(new CalculateAnswer(0, 1, this.calcVariables, 0));
        break;
      case 'pairing':
        this.newQuestion.answers.push(new PairingAnswer(0, 1, "", ""));
        break;
      case 'rightOrder':
        this.newQuestion.answers.push(new RightOrderAnswer(0, 1, this.newQuestion.answers.length + 1, ""));
        break;
      default:
        this.newQuestion.answers.push(new SimpleAnswer(0, 1, false, ""));
    }

    if (!this.pointChanged) {
      this.calculateDefaultPoints();
    }

    this.emitQuestionChanges();
  }

  calculateDefaultPoints() {
    let answerNum = this.newQuestion.answers.length;

    let rounded = (1 / answerNum).toFixed(2);
    let defaultPoint: number = Number(rounded);

    this.newQuestion.answers.forEach(answer => {
      answer.point = defaultPoint;
    });
  }

  pointChanged = false;
  isPointChanged() {
    this.pointChanged = true;
  }
   
}
