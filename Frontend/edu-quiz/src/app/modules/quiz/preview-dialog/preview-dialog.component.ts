import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Question } from 'src/app/models/question.model';

@Component({
  selector: 'app-preview-dialog',
  templateUrl: './preview-dialog.component.html',
  styleUrls: ['./preview-dialog.component.scss']
})
export class PreviewDialogComponent {
  @Input() questions: Question[] = [];

  constructor(public dialogRef: MatDialogRef<PreviewDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.questions = data.questions;
  }

  closePreview(): void {
    this.dialogRef.close();
  }
}
