import { Component } from '@angular/core';
import { Question } from 'src/app/models/question.model';

@Component({
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.scss']
})
export class CreationComponent {
  questionData: Question = new Question('', null, '', []);

  constructor() { }

  onQuestionChanged(questionData: Question) {
    this.questionData = questionData;

    console.log(questionData);
  }
}
