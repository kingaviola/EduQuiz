import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-question-select-dialog',
  templateUrl: './question-select-dialog.component.html',
  styleUrls: ['./question-select-dialog.component.scss']
})
export class QuestionSelectDialogComponent {
  dropDownOptions = [
    { value: "radio", text: "One right answer" },
    { value: "checkbox", text: "Multiple choice" },
    { value: "missingText", text: "Missing text" },
    { value: "calculate", text: "Calculate" },
    { value: "pairing", text: "Pairing" },
    { value: "rightOrder", text: "Right order" },
    { value: "freeText", text: "Text" }
  ];

  selected: string = "";

  constructor(private dialogRef: MatDialogRef<QuestionSelectDialogComponent>) {}

  typeSelected() {
    this.dialogRef.close(this.selected);
  }

}
