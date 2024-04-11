import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-join-group-dialog',
  templateUrl: './join-group-dialog.component.html',
  styleUrls: ['./join-group-dialog.component.scss']
})
export class JoinGroupDialogComponent {

  constructor(public dialogRef: MatDialogRef<JoinGroupDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: {id: string} ) {}

  onClose(): void {
    this.dialogRef.close(this.data.id);
  }

}
