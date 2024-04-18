import { Component, EventEmitter, Input, Output } from '@angular/core';
import { QuizCard } from 'src/app/models/quiz-card.model';

@Component({
  selector: 'app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.scss']
})
export class QuizCardComponent {
  @Input() quizCard: QuizCard = new QuizCard("", "", "", new Date(), "", new Date());
  @Output() startQuiz = new EventEmitter<any>();
  @Output() openStats = new EventEmitter<any>();

  constructor() {}

  navigateToFill() {
    this.startQuiz.emit(this.quizCard.id);
  }

  navigateToStats() {
    this.openStats.emit(this.quizCard.id);
  }

}
