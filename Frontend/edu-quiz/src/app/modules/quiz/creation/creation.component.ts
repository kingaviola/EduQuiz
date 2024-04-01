import { Component } from '@angular/core';
import { AnswerOption, CalculateAnswer, PairingAnswer, Question, RightOrderAnswer, SimpleAnswer } from 'src/app/models/question.model';
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

    // newQuestionData.answers.push(new SimpleAnswer(defaultPoint, false, ""));
    // newQuestionData.answers.push(new SimpleAnswer(defaultPoint, false, ""));
    // newQuestionData.answers.push(new SimpleAnswer(defaultPoint, false, ""));
    // newQuestionData.type = "radio";

    // newQuestionData.answers.push(new CalculateAnswer(1, [], 0));
    // newQuestionData.type = "calculate";

    // newQuestionData.answers.push(new PairingAnswer(defaultPoint, '', ''));
    // newQuestionData.answers.push(new PairingAnswer(defaultPoint, '', ''));
    // newQuestionData.answers.push(new PairingAnswer(defaultPoint, '', ''));
    // newQuestionData.type = "pairing";

    newQuestionData.answers.push(new RightOrderAnswer(defaultPoint, 1, ''));
    newQuestionData.answers.push(new RightOrderAnswer(defaultPoint, 2, ''));
    newQuestionData.answers.push(new RightOrderAnswer(defaultPoint, 3, ''));
    newQuestionData.type = "rightOrder";

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
