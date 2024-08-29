import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QuizCard } from 'src/app/models/quiz-card.model';
import { QuizService } from 'src/app/services/quiz.service';
import { ShareQuizDialogComponent } from '../share-quiz-dialog/share-quiz-dialog.component';
import { NavigationExtras, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.scss']
})
export class QuizCardComponent {
  @Input() quizCard: QuizCard = new QuizCard(0, "", "", new Date(), new Date(), 0);
  @Input() hideActions: boolean = true;
  @Output() startQuiz = new EventEmitter<any>();
  @Output() openStats = new EventEmitter<any>();
  @Output() modifyQuiz = new EventEmitter<any>();
 
  loggedInUserId: number = 0;

  constructor(private quizService: QuizService, private dialog: MatDialog, private router: Router, private userService: UserService) {
    this.loggedInUserId = this.userService.getUserid();
  }

  navigateToFill() {
    this.startQuiz.emit(this.quizCard.id);
  }

  navigateToStats() {
    this.openStats.emit(this.quizCard.id);
  }

  noticeToModifyQuiz() {
    this.modifyQuiz.emit(this.quizCard);
  }

  deleteQuiz() {
    this.quizService.deleteQuizbyId(this.quizCard.id)
      .subscribe(() => {
        console.log("Delete was successfull");
        this.quizService.notifyQuizDeleted();
      }, error => {
        console.log("Error happend while delete quiz: ", error);
      });
  }

  openShareQuizDialog(): void {
    const dialogRef = this.dialog.open(ShareQuizDialogComponent, {
      width: '50%',
      data: {quizId: this.quizCard.id, groupId: 0, userId: this.loggedInUserId}
    });

    dialogRef.afterClosed().subscribe(shareData => {
      if (shareData) {
        this.quizService.shareQuiz(shareData.quizId, shareData.groupId)
          .subscribe(() => {
            console.log("Shared succesfully");
            this.goToGroupDetails(shareData.groupId);
          }, error => {
            console.log("Some error happend while sharing: ", error);
          });
      }
    })
  }

  goToGroupDetails(groupId: number) {
    const navExtras: NavigationExtras = {state: {data: groupId}};
    this.router.navigate(['/groups/details'], navExtras);
  }

}
