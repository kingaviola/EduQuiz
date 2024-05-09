import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationExtras, Router } from '@angular/router';
import { GroupCard } from 'src/app/models/qroup-card.model';
import { JoinGroupDialogComponent } from '../join-group-dialog/join-group-dialog.component';
import { CreateGroupDialogComponent } from '../create-group-dialog/create-group-dialog.component';
import { group } from '@angular/animations';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit{
  //example data for development
  groupCardDatas: GroupCard[] = [];

  //need to retreive the userId after login
  loggedInUserId: number = 9;
  joinedPanelOpenState = true;
  myPanelOpenState = true;
  joinedGroupsNum = 0;
  myGroupsNum = 0;

  constructor(private dialog: MatDialog, private groupServece: GroupService) {
    this.countGroups();
  }

  ngOnInit(): void {
    this.getGroups();
  }

  getGroups() {
    this.groupServece.getCreatedGroups(this.loggedInUserId)
    .subscribe((groups) => {
        groups.forEach(group => {
          this.groupCardDatas.push(group);
        })
      console.log(this.groupCardDatas);
    });

    this.groupServece.getJoinedGroups(this.loggedInUserId)
    .subscribe((groups) => {
        groups.forEach(group => {
          this.groupCardDatas.push(group);
        })
      console.log(this.groupCardDatas);
    });
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
      data: { group: new GroupCard(0, '', 0, '', 0, '', '') }
    });

    dialogRef.afterClosed().subscribe(group => {
      if (group) {
        //Temporary!
        //need to call a service which will send the data to the backend
        //also need to change it, because it won't be a GroupCard, it has to be a concrete group
        const newGroup = new GroupCard(0, group.name, group.membersNum, group.desc, this.loggedInUserId, "Logged in user", group.joinCode);
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
        const newGroup = new GroupCard(0, "New group's name", 3, "This is the new group which you joined", 0, "Creator XY", "12345");
        this.groupCardDatas.push(newGroup);
        this.joinedGroupsNum++;

      }
    })

  }

}
