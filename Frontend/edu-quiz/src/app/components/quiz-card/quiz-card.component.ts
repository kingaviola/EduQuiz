import { Component, Input } from '@angular/core';
import { QuizCard } from 'src/app/models/quiz-card.model';

@Component({
  selector: 'app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.scss']
})
export class QuizCardComponent {
  @Input() quizCard: QuizCard = new QuizCard("", "", "", new Date(), "", new Date());

}
