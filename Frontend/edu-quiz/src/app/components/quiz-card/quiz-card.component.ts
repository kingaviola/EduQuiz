import { Component, EventEmitter, Input, Output } from '@angular/core';
import { QuizCard } from 'src/app/models/quiz-card.model';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.scss']
})
export class QuizCardComponent {
  @Input() quizCard: QuizCard = new QuizCard(0, "", "", new Date(), new Date(), 0);
  @Output() startQuiz = new EventEmitter<any>();
  @Output() openStats = new EventEmitter<any>();

  constructor(private quizService: QuizService) {}

  navigateToFill() {
    this.startQuiz.emit(this.quizCard.id);
  }

  navigateToStats() {
    this.openStats.emit(this.quizCard.id);
  }

  deleteQuiz() {
    console.log("delete was called, id: ", this.quizCard.id);
    this.quizService.deleteQuizbyId(this.quizCard.id)
      .subscribe(() => {
        console.log("Delete was successfull");
        this.quizService.notifyQuizDeleted();
      }, error => {
        console.log("Error happend while delete quiz: ", error);
      });
  }

}
