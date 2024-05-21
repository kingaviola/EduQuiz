import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GroupCard } from 'src/app/models/qroup-card.model';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-share-quiz-dialog',
  templateUrl: './share-quiz-dialog.component.html',
  styleUrls: ['./share-quiz-dialog.component.scss']
})
export class ShareQuizDialogComponent implements OnInit{
  groupCardDatas: GroupCard[] = [];
  selectedGroupId: number = -1;

  constructor(public dialogRef: MatDialogRef<ShareQuizDialogComponent>, @Inject(MAT_DIALOG_DATA) public shareData: {quizId: number, groupId: number, userId: number}, private groupService: GroupService) {}


  ngOnInit(): void {
    this.getGroups();
  }

  onClose(): void {
    if (this.selectedGroupId != -1)
      this.shareData.groupId = this.selectedGroupId;
    this.dialogRef.close(this.shareData);
  }

  getGroups() {
    console.log("user id: ", this.shareData.userId);
    this.groupService.getCreatedGroups(this.shareData.userId)
    .subscribe((groups) => {
        groups.forEach(group => {
          this.groupCardDatas.push(group);
        });
        console.log(this.groupCardDatas);
    });

    this.groupService.getJoinedGroups(this.shareData.userId)
    .subscribe((groups) => {
        groups.forEach(group => {
          this.groupCardDatas.push(group);
        });
    });
  }

}
