import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationExtras, Router } from '@angular/router';
import { GroupCard } from 'src/app/models/qroup-card.model';
import { JoinGroupDialogComponent } from '../join-group-dialog/join-group-dialog.component';
import { CreateGroupDialogComponent } from '../create-group-dialog/create-group-dialog.component';
import { group } from '@angular/animations';
import { GroupService } from 'src/app/services/group.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit, OnDestroy {
  //example data for development
  groupCardDatas: GroupCard[] = [];

  //need to retreive the userId after login
  loggedInUserId: number = 9;
  joinedPanelOpenState = true;
  myPanelOpenState = true;
  joinedGroupsNum = 0;
  myGroupsNum = 0;
  private groupsChangedSubscription!: Subscription;

  constructor(private dialog: MatDialog, private groupServece: GroupService) {
    this.countGroups();
  }

  ngOnDestroy(): void {
    this.groupsChangedSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getGroups();

    this.groupsChangedSubscription = this.groupServece.groupsChanged$.subscribe(() => {
      this.getGroups();
    });
  }

  getGroups() {
    this.groupCardDatas = [];
    this.groupServece.getCreatedGroups(this.loggedInUserId)
    .subscribe((groups) => {
        groups.forEach(group => {
          this.groupCardDatas.push(group);
        });
        this.countGroups();
    });

    this.groupServece.getJoinedGroups(this.loggedInUserId)
    .subscribe((groups) => {
        groups.forEach(group => {
          this.groupCardDatas.push(group);
        });
        this.countGroups();
    });

  }

  countGroups() {
    console.log("called", this.groupCardDatas);
    this.joinedGroupsNum = 0;
    this.myGroupsNum = 0;
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
        this.groupServece.joinGroup(groupId, this.loggedInUserId)
          .subscribe(() => {
            console.log("Succesfully joined the group.");
            this.groupServece.notifyGroupsChange();
          },
          (error) => {
            console.log("Error happened: ", error);
          });
      }
    })

  }

}
