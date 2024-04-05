import { Component, Input } from '@angular/core';
import { Question } from 'src/app/models/question.model';

@Component({
  selector: 'app-fillable-quiz',
  templateUrl: './fillable-quiz.component.html',
  styleUrls: ['./fillable-quiz.component.scss']
})
export class FillableQuizComponent {
  @Input() questions: Question[] = [];
}
