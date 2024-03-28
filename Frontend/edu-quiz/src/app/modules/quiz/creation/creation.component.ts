import { Component } from '@angular/core';
import { AnswerOption, Question, SimpleAnswer } from 'src/app/models/question.model';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.scss']
})
export class CreationComponent {
  questionData = new Question('', null, '', []);
  questions: Question[] = [];

  constructor() { }

  drop(event: CdkDragDrop<Question[]>) {
    moveItemInArray(this.questions, event.previousIndex, event.currentIndex);
  }

  onQuestionChanged(questionData: Question, idx: number = -1) {
    if (idx === -1) {
      this.questions.push(questionData);
    }
    else {
      this.questions[idx] = questionData;
    }

    console.log(questionData);
  }

  addQuestion() {
    const newQuestionData = new Question('', null, '', []);

    let rounded = (1 / 3).toFixed(2);
    let defaultPoint: number = Number(rounded);

    newQuestionData.answers.push(new SimpleAnswer(defaultPoint, false, ""));
    newQuestionData.answers.push(new SimpleAnswer(defaultPoint, false, ""));
    newQuestionData.answers.push(new SimpleAnswer(defaultPoint, false, ""));

    newQuestionData.type = "radio";

    this.onQuestionChanged(newQuestionData);
  }

  removeQuestion(idx: number) {
    this.questions.splice(idx, 1);
  }

  saveQuiz() {
    console.log("kvíz mentése...");
    console.log(this.questions);
  }
}
