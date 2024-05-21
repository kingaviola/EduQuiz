import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { forEach } from 'lodash';
import { CookieService } from 'ngx-cookie-service';
import { FilledQuiz } from 'src/app/models/filled-quiz.model';
import { AnswerOption, Question, SimpleAnswer } from 'src/app/models/question.model';
import { QuizSettings } from 'src/app/models/quiz-settings.model';
import { QuizModel } from 'src/app/models/quiz.model';
import { QuizModule } from 'src/app/modules/quiz/quiz.module';
import { ProcessImportedDataService } from 'src/app/services/process-imported-data.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-filling',
  templateUrl: './filling.component.html',
  styleUrls: ['./filling.component.scss']
})
export class FillingComponent implements OnInit{
  loggedInUserId: number = 0;
  quizId: number = 0;
  setting: QuizSettings = {
    isQuestionRandom: true,
    isAnswerRandom: true,
    useAllQuestion: false,
    usedQuestions: 0,
    isStart: false,
    startTime: '',
    startDate: '',
    isDeadline: false,
    deadlineTime: '',
    deadlineDate: '',
    isDuration: false,
    duration: 0,
    showAnswers: false,
    questionGroups: ''
  }
  quiz: QuizModel = {
    id: 0,
    userId: 0,
    name: '',
    description: '',
    creationDate: '',
    questions: [],
    settings: this.setting
  }
  isQuizSubmitted: boolean = false;
  filledQuiz: FilledQuiz = new FilledQuiz(
    0,
    this.loggedInUserId,
    this.quizId,
    this.quiz.userId,
    false,
    []
  )
  questionGroupIndexes: number[] = [];

  constructor(private router: Router, private quizSerivce: QuizService, private processService: ProcessImportedDataService, private cookieService: CookieService) {
    this.quizId = this.router.getCurrentNavigation()?.extras?.state?.['data'];
    this.loggedInUserId = parseInt(this.cookieService.get("userId"), 10);
  }
  
  ngOnInit(): void {
    this.getQuizData();
  }

  getFilledQuestions(event: Question[]) {
    let newFilled = new FilledQuiz(
      0,
      this.loggedInUserId,
      this.quizId,
      this.quiz.userId,
      false,
      event
    )
    this.filledQuiz = newFilled;
  }

  extractQuestionGroups() {
    const groupsString = this.quiz.settings.questionGroups;
    const sections = groupsString.split('/');
    sections.forEach( section => {
      const startEnd = section.split('-');
      console.log("startEnd: ", startEnd);
      this.questionGroupIndexes.push(parseInt(startEnd[0], 10));
      this.questionGroupIndexes.push(parseInt(startEnd[1], 10));
    });
    console.log("section indexes: ", this.questionGroupIndexes);
  }

  sendData() {
    console.log("mehet az adat ", this.filledQuiz);
    this.filledQuiz.questions.forEach(question => {
      question.image = null;
    });

    this.quizSerivce.sendFilledQuiz(this.filledQuiz)
      .subscribe(
        resp => {
          console.log('Data is sended succesfully. ', resp);
        },
        error => {
          console.log('Some error happened. ', error);
        }
      );
  }

  getQuizData() {
    this.quizSerivce.getQuizById(this.quizId)
      .subscribe((quiz) => {
        this.quiz = quiz;
        console.log("received quiz :", this.quiz);
        this.extractQuestionGroups();
      });
  }

  submitQuiz() {
    this.isQuizSubmitted = true;
    this.sendData();
  }

}
