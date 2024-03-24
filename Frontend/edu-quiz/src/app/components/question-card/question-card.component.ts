import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Question } from 'src/app/models/question.model';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss']
})
export class QuestionCardComponent {
  @Input() newQuestion: Question = new Question('', null, '', []);
  @Output() questionChanged: EventEmitter<Question> = new EventEmitter<Question>();

  constructor() { 
    this.newQuestion.answers.push({correctness: false, answerText: "", point: 1});
    this.newQuestion.answers.push({correctness: false, answerText: "", point: 1});
    this.newQuestion.answers.push({correctness: false, answerText: "", point: 1});
  }

  emitQuestionChanges() {
    this.questionChanged.emit(this.newQuestion);
  }

  selectRadio(selected: number) {
    this.newQuestion.answers.forEach((answer, index) => {
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
    this.newQuestion.answers.push({correctness: false, answerText: "", point: 1});
  }
}
