import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AnswerOption, Question, SimpleAnswer } from 'src/app/models/question.model';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss']
})
export class QuestionCardComponent {
  @Input() newQuestion = new Question('', null, '', []);
  @Input() questionIdx: number = -1;
  @Output() questionChanged: EventEmitter<Question> = new EventEmitter<Question>();

  constructor() { 
    // this.newQuestion.answers.push(new SimpleAnswer(1, false, ""));
    // this.newQuestion.answers.push(new SimpleAnswer(1, false, ""));
    // this.newQuestion.answers.push(new SimpleAnswer(1, false, ""));

    // this.newQuestion.type = "radio";
  }

  isSimpleAnswer(answer: AnswerOption): answer is SimpleAnswer {
    return answer instanceof SimpleAnswer;
  }

  emitQuestionChanges() {
    this.questionChanged.emit(this.newQuestion);
  }

  drop(event: CdkDragDrop<AnswerOption[]>) {
    moveItemInArray(this.newQuestion.answers, event.previousIndex, event.currentIndex);

    this.emitQuestionChanges();
  }

  selectRadio(selected: number) {
    this.newQuestion.answers.forEach((answer, index) => {
      if (answer instanceof SimpleAnswer)
        answer.correctness = index === selected;
    });

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
    this.emitQuestionChanges();
  }

  addAnswerOption() {
    this.newQuestion.answers.push(new SimpleAnswer(1, false, ""));

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
