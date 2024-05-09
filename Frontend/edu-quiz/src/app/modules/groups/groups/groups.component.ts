import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationExtras, Router } from '@angular/router';
import { GroupCard } from 'src/app/models/qroup-card.model';
import { JoinGroupDialogComponent } from '../join-group-dialog/join-group-dialog.component';
import { CreateGroupDialogComponent } from '../create-group-dialog/create-group-dialog.component';
import { group } from '@angular/animations';
import { GroupService } from 'src/app/services/group.service';
import { Subscription } from 'rxjs';
import { Group } from 'src/app/models/group.model';

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
  loggedInUserName: string = "Alma";
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
      data: { group: new Group(0, '', '', [], this.loggedInUserId, this.loggedInUserName, '', []) }
    });

    dialogRef.afterClosed().subscribe(group => {
      if (group) {
        console.log(group);
        this.groupServece.createGroup(group)
          .subscribe(
            resp => {
              console.log('Group submitted succesfully!', resp);
              this.groupServece.notifyGroupsChange();
            },
            error => {
              console.log('An error occured while submitting the group.', error);
            }
          );
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
