import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationExtras, Router } from '@angular/router';
import { GroupCard } from 'src/app/models/qroup-card.model';
import { JoinGroupDialogComponent } from '../join-group-dialog/join-group-dialog.component';
import { CreateGroupDialogComponent } from '../create-group-dialog/create-group-dialog.component';
import { group } from '@angular/animations';

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

  constructor(private dialog: MatDialog) {
    this.countGroups();
  }

  //call after retreive the groups from the backend
  countGroups() {
    this.groupCardDatas.forEach(group => {
      group.creatorId == this.loggedInUserId ? this.myGroupsNum++ : this.joinedGroupsNum++;
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreateGroupDialogComponent, {
      width: '60%',
      data: { group: new GroupCard('', '', 0, '', '', '', '') }
    });

    dialogRef.afterClosed().subscribe(group => {
      if (group) {
        //Temporary!
        //need to call a service which will send the data to the backend
        //also need to change it, because it won't be a GroupCard, it has to be a concrete group
        const newGroup = new GroupCard('', group.name, group.membersNum, group.desc, this.loggedInUserId, "Logged in user", group.joinCode);
        this.groupCardDatas.push(newGroup);
        this.myGroupsNum++;
      }
    });
  }

  openJoinGroupDialog(): void {
    const dialogRef = this.dialog.open(JoinGroupDialogComponent, {
      width: '50%',
      data: { id: '' }
    });

    dialogRef.afterClosed().subscribe(groupId => {
      if (groupId) {
        //temporary!
        //need to call the service here or in the component to add the user to the group
        //also need to call the update service for the groups retreiving
        const newGroup = new GroupCard("1234567", "New group's name", 3, "This is the new group which you joined", "creator42", "Creator XY", "12345");
        this.groupCardDatas.push(newGroup);
        this.joinedGroupsNum++;

      }
    })

  }

}
