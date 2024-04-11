import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationExtras, Router } from '@angular/router';
import { GroupCard } from 'src/app/models/qroup-card.model';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent {
  //example data for development
  groupCardDatas: GroupCard[] = [
    new GroupCard("1", "Study Group 1", 10, "Study group for Angular", "creator1", "Creator One", "asd123"),
    new GroupCard("2", "Study Group 2", 8, "Study group for React", "creator1", "Creator Two", "qwe123"),
    new GroupCard("3", "Study Group 3", 12, "Study group for Vue.js", "creator3", "Creator Three", "yxc123"),
    new GroupCard("4", "Study Group 4", 6, "Study group for Node.js", "creator4", "Creator Four", "abc123"),
    new GroupCard("5", "Study Group 5", 15, "Study group for TypeScript", "creator5", "Creator Five", "cba321")
  ];

  loggedInUserId: string = "creator1";
  joinedPanelOpenState = true;
  myPanelOpenState = true;
  joinedGroupsNum = 0;
  myGroupsNum = 0;

  constructor(private router: Router, private dialog: MatDialog) {
    this.countGroups();
  }

  //call after retreive the groups from the backend
  countGroups() {
    this.groupCardDatas.forEach(group => {
      group.creatorId == this.loggedInUserId ? this.myGroupsNum++ : this.joinedGroupsNum++;
    });
  }

  openCreateDialog(): void {
    //need create dialog
  }

  openJoinGroupDialog(): void {
    //need join dialog
  }

}
