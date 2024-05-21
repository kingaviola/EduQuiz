import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Group } from 'src/app/models/group.model';
import { QuizCard } from 'src/app/models/quiz-card.model';
import { UserBasicData } from 'src/app/models/user-basic-data.model';
import { UserProfile } from 'src/app/models/user-profile.model';
import { GroupService } from 'src/app/services/group.service';
import { QuizService } from 'src/app/services/quiz.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-groups-details',
  templateUrl: './groups-details.component.html',
  styleUrls: ['./groups-details.component.scss']
})
export class GroupsDetailsComponent implements OnInit{
  groupId: number = 0;
  //temp group data
  groupData: Group = new Group(0,'','',[],0,'','',[]);

  quizCards: QuizCard[] = [];
  groupUsers: UserProfile[] = [];
  userImageSrcs: string[] = [];

  constructor(private router: Router, private groupService: GroupService, private quizService: QuizService, private userService: UserService) {
    this.groupId = this.router.getCurrentNavigation()?.extras?.state?.['data'];
  }
  
  ngOnInit(): void {
    this.groupService.getGroupById(this.groupId)
      .subscribe((group) => {
        this.groupData = group;
        console.log(this.groupData);
      });

      this.getQuizzes();
      this.getUsers();
  }

  setUserImages() {
    this.groupUsers.forEach( user => {
      if (user.userImage != null) {
        if (user.userImage?.data.startsWith('iVBORw0KGgo=')) { 
          this.userImageSrcs.push('data:image/png;base64,' + user.userImage?.data);
        } else {
          this.userImageSrcs.push('data:image/jpeg;base64,' + user.userImage?.data);
        }
      }
      else
        this.userImageSrcs.push("");
    });
  }

  getUsers() {
    this.userService.getGroupUsers(this.groupId)
      .subscribe((users) => {
        this.groupUsers = users;
        this.setUserImages();
        console.log("groupusers: ", this.groupUsers);
      });
  }

  getQuizzes() {
    this.quizService.getQuizCardsByGroupId(this.groupId)
      .subscribe((quizzes) => {
        this.quizCards = quizzes;
        console.log(this.quizCards);
      });
  }

  handleStartQuiz(data: any) {
    const navExtras: NavigationExtras = {state: {data: data}};
    this.router.navigate(['/filling'], navExtras);
  }

}
