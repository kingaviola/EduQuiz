import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Group } from 'src/app/models/group.model';
import { QuizCard } from 'src/app/models/quiz-card.model';

@Component({
  selector: 'app-groups-details',
  templateUrl: './groups-details.component.html',
  styleUrls: ['./groups-details.component.scss']
})
export class GroupsDetailsComponent {
  quizId: string = "";
  //temp group data
  groupData: Group = new Group(
    '1',
    'Name of the group',
    'This is the desciption of the group',
    ['member1', 'member2', 'member3', 'member4', 'member5', 'member6', 'member7', 'member8', 'member9', 'member10', 'member11', 'member12'],
    'creator1',
    'John Doe',
    'joinCode1',
    ['quiz1', 'quiz2', 'quiz3']
  );

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

  constructor(private router: Router) {
    this.quizId = this.router.getCurrentNavigation()?.extras?.state?.['data'];
    //get the group data by id with service from the backend
    //todo
  }

  handleStartQuiz(data: any) {
    const navExtras: NavigationExtras = {state: {data: data}};
    this.router.navigate(['/filling'], navExtras);
  }

}
