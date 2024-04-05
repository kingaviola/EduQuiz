import { Component, Input } from '@angular/core';
import { Question } from 'src/app/models/question.model';

@Component({
  selector: 'app-fillable-question',
  templateUrl: './fillable-question.component.html',
  styleUrls: ['./fillable-question.component.scss']
})
export class FillableQuestionComponent {
  @Input() questions: Question[] = [];
}
