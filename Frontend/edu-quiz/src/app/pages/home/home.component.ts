import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { QuizCard } from 'src/app/models/quiz-card.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  //exmaple data for development
  quizCardDatas: QuizCard[] = [
    new QuizCard(
      "1",
      "Introduction to Programming Concepts",
      "This quiz covers basic programming concepts such as variables, data types, and control structures. This quiz covers basic programming concepts such as variables, data types, and control structures.This quiz covers basic programming concepts such as variables, data types, and control structures.This quiz covers basic programming concepts such as variables, data types, and control structures.This quiz covers basic programming concepts such as variables, data types, and control structures.",
      new Date("2024-04-15T12:00:00"),
      "user123",
      new Date("2024-04-01T09:00:00")
    ),
    new QuizCard(
      "2",
      "Object-Oriented Programming Fundamentals",
      "Test your understanding of classes, objects, inheritance, and polymorphism.",
      new Date("2024-04-20T15:30:00"),
      "user456",
      new Date("2024-04-02T10:30:00")
    ),
    new QuizCard(
      "3",
      "Data Structures and Algorithms Quiz",
      "Evaluate your knowledge of common data structures like arrays, linked lists, and algorithms such as sorting and searching.",
      new Date("2024-04-18T14:00:00"),
      "user789",
      new Date("2024-04-03T11:45:00")
    ),
    new QuizCard(
      "4",
      "Web Development Basics Assessment",
      "Assess your understanding of HTML, CSS, and JavaScript fundamentals.",
      new Date("2024-04-25T11:00:00"),
      "user101112",
      new Date("2024-04-04T13:20:00")
    ),
    new QuizCard(
      "5",
      "Java Programming Quiz",
      "Test your knowledge of Java syntax, classes, and exception handling.",
      new Date("2024-04-22T09:45:00"),
      "user131415",
      new Date("2024-04-05T08:15:00")
    ),
    new QuizCard(
      "6",
      "Python Programming Basics Quiz",
      "Evaluate your understanding of Python syntax, data types, and control flow.",
      new Date("2024-04-17T16:30:00"),
      "user161718",
      new Date("2024-04-06T14:10:00")
    ),
    new QuizCard(
      "7",
      "Advanced Programming Concepts Assessment",
      "Assess your knowledge of advanced programming topics such as multithreading, networking, and design patterns.",
      new Date("2024-04-30T10:00:00"),
      "user192021",
      new Date("2024-04-07T12:40:00")
    )
  ];

  constructor(private router: Router) {}

  handleStartQuiz(data: any) {
    const navExtras: NavigationExtras = {state: {data: data}};
    this.router.navigate(['/filling'], navExtras);
  }

}
