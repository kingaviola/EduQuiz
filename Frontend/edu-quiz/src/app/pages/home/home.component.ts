import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationExtras, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { CreateQuizDialogComponent } from 'src/app/components/create-quiz-dialog/create-quiz-dialog.component';
import { FilledQuiz } from 'src/app/models/filled-quiz.model';
import { QuizCard } from 'src/app/models/quiz-card.model';
import { AccountService } from 'src/app/services/account.service';
import { QuizService } from 'src/app/services/quiz.service';
import { UserService } from 'src/app/services/user.service';

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
  userId: number = 0;
  private quizDeletedSubscription!: Subscription;

  constructor(private router: Router, private dialog: MatDialog, private quizService: QuizService, private accountService: AccountService, private userService: UserService) {
    this.userId = this.userService.getUserid();
    console.log(this.userId);
  }

  ngOnDestroy(): void {
    this.quizDeletedSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.accountService.isLoggedIn();
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
        console.log("unchecked: ", this.uncheckedQuizzes);
    });
  }

  getQuizzes() {
    this.quizService.getQuizzesByUserId(this.userId)
    .subscribe((quizzes) => {
        this.quizCardDatas = quizzes;
    });
  }

  handleModifyQuiz(data: QuizCard) {
    let sendingData = {
      title: data.name,
      desc: data.description,
      userId: this.userId,
      quizId: data.id
    }
    console.log("in home, data: ", data);
    const navExtras: NavigationExtras = {state: {data: sendingData}}
    this.router.navigate(['/quiz'], navExtras);
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
          userId: this.userId,
          quizId: 0
        }
        const navExtras: NavigationExtras = {state: {data: sendingData}}
        this.router.navigate(['/quiz'], navExtras);
      }
    });
  }

}
