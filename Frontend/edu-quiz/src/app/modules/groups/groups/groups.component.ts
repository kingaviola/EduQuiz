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
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/services/user.service';
import { UserProfile } from 'src/app/models/user-profile.model';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit, OnDestroy {
  //example data for development
  groupCardDatas: GroupCard[] = [];

  //need to retreive the userId after login
  loggedInUserId: number = 0;
  loggedInUserName: string = "";
  joinedPanelOpenState = true;
  myPanelOpenState = true;
  joinedGroupsNum = 0;
  myGroupsNum = 0;
  private groupsChangedSubscription!: Subscription;
  userData: UserProfile = {
    name: "",
    userName: "",
    email: "",
    userImage: null
  }

  constructor(private dialog: MatDialog, private groupService: GroupService, private userService: UserService, private accountService: AccountService) {
    this.countGroups();
    this.loggedInUserId = this.userService.getUserid();
  }

  getUserProfileData() {
    this.accountService.getUserProfileData()
      .subscribe((data: UserProfile) => {
        this.userData = data;
        this.loggedInUserName = this.userData.name;
      },
    error => {
      console.error("Error happend during retreiving user data", error);
    });
  }
  ngOnDestroy(): void {
    this.groupsChangedSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getGroups();

    this.groupsChangedSubscription = this.groupService.groupsChanged$.subscribe(() => {
      this.getGroups();
    });
  }

  getGroups() {
    this.groupCardDatas = [];
    this.groupService.getCreatedGroups(this.loggedInUserId)
    .subscribe((groups) => {
        groups.forEach(group => {
          this.groupCardDatas.push(group);
        });
        this.countGroups();
    });

    this.groupService.getJoinedGroups(this.loggedInUserId)
    .subscribe((groups) => {
        groups.forEach(group => {
          this.groupCardDatas.push(group);
        });
        this.countGroups();
    });

  }

  countGroups() {
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
        this.groupService.createGroup(group)
          .subscribe(
            resp => {
              console.log('Group submitted succesfully!', resp);
              this.groupService.notifyGroupsChange();
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
        this.groupService.joinGroup(groupId, this.loggedInUserId)
          .subscribe(() => {
            console.log("Succesfully joined the group.");
            this.groupService.notifyGroupsChange();
          },
          (error) => {
            console.log("Error happened: ", error);
          });
      }
    })

  }

}
