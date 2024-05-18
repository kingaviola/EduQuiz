import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationExtras, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CreateQuizDialogComponent } from 'src/app/components/create-quiz-dialog/create-quiz-dialog.component';
import { FilledQuiz } from 'src/app/models/filled-quiz.model';
import { QuizCard } from 'src/app/models/quiz-card.model';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  quizCardDatas: QuizCard[] = [];
  uncheckedQuizzes: FilledQuiz[] = [];
  //manually set userId for development
  //after login this will be updated
  userId: number = 10;
  private quizDeletedSubscription!: Subscription;

  constructor(private router: Router, private dialog: MatDialog, private quizService: QuizService) {}

  ngOnDestroy(): void {
    this.quizDeletedSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getQuizzes();
    this.getUncheckedQuizzes();

    this.quizDeletedSubscription = this.quizService.quizDeleted$.subscribe(() => {
      this.getQuizzes();
    });
  }

  goToChecking(filled: FilledQuiz){
    const navExtras: NavigationExtras = {state: {data: filled}};
    this.router.navigate(['/checking'], navExtras);
  }

  getUncheckedQuizzes() {
    this.quizService.getUncheckedFilledQuizzes(this.userId)
    .subscribe((quizzes) => {
        this.uncheckedQuizzes = quizzes;
        console.log(this.uncheckedQuizzes);
    });
  }

  getQuizzes() {
    this.quizService.getQuizzesByUserId(this.userId)
    .subscribe((quizzes) => {
        this.quizCardDatas = quizzes;
    });
  }

  handleStartQuiz(data: any) {
    const navExtras: NavigationExtras = {state: {data: data}};
    this.router.navigate(['/filling'], navExtras);
  }

  handleStatsOpen(data: any) {
    const navExtras: NavigationExtras = {state: {quizId: data, userId: this.userId}};
    this.router.navigate(['/statistics'], navExtras);
  }

  openCreateQuizDialog(): void {
    const dialogRef = this.dialog.open(CreateQuizDialogComponent, {
      width: '50%',
      data: { title: '', desc: '' }
    });

    dialogRef.afterClosed().subscribe(quizData => {
      if (quizData) {
        let sendingData = {
          title: quizData.title,
          desc: quizData.desc,
          userId: this.userId
        }
        const navExtras: NavigationExtras = {state: {data: sendingData}}
        this.router.navigate(['/quiz'], navExtras);
      }
    });
  }

}
