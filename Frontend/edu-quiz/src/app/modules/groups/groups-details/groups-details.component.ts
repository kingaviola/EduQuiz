import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Group } from 'src/app/models/group.model';
import { QuizCard } from 'src/app/models/quiz-card.model';
import { GroupService } from 'src/app/services/group.service';
import { QuizService } from 'src/app/services/quiz.service';

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

  constructor(private router: Router, private groupService: GroupService, private quizService: QuizService) {
    this.groupId = this.router.getCurrentNavigation()?.extras?.state?.['data'];
    console.log(this.groupId);
    //get the group data by id with service from the backend
    //todo
  }
  
  ngOnInit(): void {
    this.groupService.getGroupById(this.groupId)
      .subscribe((group) => {
        this.groupData = group;
        console.log(this.groupData);
      });

      this.getQuizzes();
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
