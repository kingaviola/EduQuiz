import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-quiz-dialog',
  templateUrl: './create-quiz-dialog.component.html',
  styleUrls: ['./create-quiz-dialog.component.scss']
})
export class CreateQuizDialogComponent {

  constructor(public dialogRef: MatDialogRef<CreateQuizDialogComponent>, @Inject(MAT_DIALOG_DATA) public quizData: { title: string, desc: string }) { }

  onClose(): void {
    this.dialogRef.close(this.quizData);
  }
}
