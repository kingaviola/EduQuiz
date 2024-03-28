import { Component } from '@angular/core';
import { Question } from 'src/app/models/question.model';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.scss']
})
export class CreationComponent {
  //questionData: Question = new Question('', null, '', []);
  questions: Question[] = [];

  constructor() { }

  drop(event: CdkDragDrop<Question[]>) {
    moveItemInArray(this.questions, event.previousIndex, event.currentIndex);
  }

  onQuestionChanged(questionData: Question, idx: number = -1) {
    //this.questionData = questionData;
    if (idx === -1) {
      this.questions.push(questionData);
    }
    else {
      this.questions[idx] = questionData;
    }

    console.log(questionData);
  }

  addQuestion() {
    //const newQuestionData: Question = new Question('', null, '', []);
    const newQuestionData: Question = {
      questionText: '',
      image: null,
      type: '',
      answers: []
    }
    
    newQuestionData.answers.push({correctness: false, answerText: "", point: 1});
    newQuestionData.answers.push({correctness: false, answerText: "", point: 1});
    newQuestionData.answers.push({correctness: false, answerText: "", point: 1});

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
