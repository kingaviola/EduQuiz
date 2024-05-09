import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Group } from 'src/app/models/group.model';
import { QuizCard } from 'src/app/models/quiz-card.model';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-groups-details',
  templateUrl: './groups-details.component.html',
  styleUrls: ['./groups-details.component.scss']
})
export class GroupsDetailsComponent implements OnInit{
  groupId: number = 0;
  //temp group data
  groupData: Group = new Group(0,'','',[],0,'','',[]);

  quizCards: QuizCard[] = [
    new QuizCard(
      2,
      "Object-Oriented Programming Fundamentals",
      "Test your understanding of classes, objects, inheritance, and polymorphism.",
      new Date("2024-04-20T15:30:00"),
      new Date("2024-04-02T10:30:00"),
      9
    ),
    new QuizCard(
      5,
      "Java Programming Quiz",
      "Test your knowledge of Java syntax, classes, and exception handling.",
      new Date("2024-04-22T09:45:00"),
      new Date("2024-04-05T08:15:00"),
      9
    ),
    new QuizCard(
      7,
      "Advanced Programming Concepts Assessment",
      "Assess your knowledge of advanced programming topics such as multithreading, networking, and design patterns.",
      new Date("2024-04-30T10:00:00"),
      new Date("2024-04-07T12:40:00"),
      9
    )
  ];

  constructor(private router: Router, private groupService: GroupService) {
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
  }

  handleStartQuiz(data: any) {
    const navExtras: NavigationExtras = {state: {data: data}};
    this.router.navigate(['/filling'], navExtras);
  }

}
