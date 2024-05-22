import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { forEach, shuffle } from 'lodash';
import { CookieService } from 'ngx-cookie-service';
import { FilledQuiz } from 'src/app/models/filled-quiz.model';
import { AnswerOption, Question, SimpleAnswer } from 'src/app/models/question.model';
import { QuizSettings } from 'src/app/models/quiz-settings.model';
import { QuizModel } from 'src/app/models/quiz.model';
import { QuizModule } from 'src/app/modules/quiz/quiz.module';
import { ProcessImportedDataService } from 'src/app/services/process-imported-data.service';
import { QuizService } from 'src/app/services/quiz.service';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

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
  currentDate: Date = new Date();
  isFillingPeriod: boolean = true;
  mintesCounter: number = 0;
  secondsCounter: number = 0;
  intervalId: any;
  showAnswersAfterSubmission: boolean = true;

  constructor(private router: Router, private quizSerivce: QuizService, private processService: ProcessImportedDataService, private userService: UserService) {
    this.quizId = this.router.getCurrentNavigation()?.extras?.state?.['data'];
    this.loggedInUserId = this.userService.getUserid();
  }
  
  ngOnInit(): void {
    this.getQuizData();
  }

  startCounter() {
    console.log("időzítő elindult---------");
    this.intervalId = setInterval(() => {
      if (this.mintesCounter === 0 && this.secondsCounter === 0) {
        clearInterval(this.intervalId);
        this.submitQuiz();
      } else {
        if (this.secondsCounter === 0) {
          console.log("minutes: " , this.mintesCounter, " seonds: ", this.secondsCounter );
          this.mintesCounter--;
          this.secondsCounter = 59;
        } else {
          // console.log("minutes: " , this.mintesCounter, " seonds: ", this.secondsCounter );
          this.secondsCounter--;
        }
      }
    }, 1000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
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

  // shuffleRigthOrderAnswers() {
  //   this.quiz.questions.forEach((question, idx) => {
  //     if (question.type == "rightOrder"){
  //       let shuffleAnswers = shuffle(question.answers);
  //       this.quiz.questions[idx].answers = shuffleAnswers;
  //     }
  //   });
  // }

  selectQuestions(questionNum: number): Question[] {
    this.shuffleQuestions();
    let chosenQuestions: Question[] = [];
    for (let i = 0; i < questionNum; i++) {
      chosenQuestions.push(this.quiz.questions[i]);
    }

    return chosenQuestions;
  }

  shuffleAnswers() {
    this.quiz.questions.forEach((question, idx) => {
      if (question.type != "freeText" && question.type != "pairing" && question.type != "rightOrder" && question.type != "missingText"){
        let shuffleAnswers = shuffle(question.answers);
        this.quiz.questions[idx].answers = shuffleAnswers;
      }
    });
  }

  shuffleQuestions() {
    let shuffleQuestions = shuffle(this.quiz.questions);
    this.quiz.questions = shuffleQuestions;
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
        if (this.quiz.settings.isDuration){
          console.log("van időtartam---------");
          this.mintesCounter = this.quiz.settings.duration;
          this.startCounter();
        }

        if (this.quiz.settings.isAnswerRandom) {
          this.shuffleAnswers();
        }

        if (this.quiz.settings.isQuestionRandom) {
          this.shuffleQuestions();
        }

        if (!this.quiz.settings.useAllQuestion) {
          this.quiz.questions = this.selectQuestions(this.quiz.settings.usedQuestions);
        }

        if (!this.quiz.settings.showAnswers){
          this.showAnswersAfterSubmission = false;
        }

        // this.shuffleRigthOrderAnswers();
        this.setFillingPeriod(this.quiz.settings);
        this.extractQuestionGroups();
      });
  }

  setFillingPeriod(settings: QuizSettings) {
    let [hours1, minutes1] = settings.startTime.split(':').map(Number);
    let [hours2, minutes2] = settings.deadlineTime.split(':').map(Number);
    let startDate: Date = new Date(settings.startDate);
    let deadlineDate: Date = new Date(settings.deadlineDate);
    startDate.setHours(hours1, minutes1);
    deadlineDate.setHours(hours2, minutes2);

    if ((this.currentDate > deadlineDate && settings.isDeadline) || (this.currentDate < startDate && settings.isStart)) {
      this.isFillingPeriod = false;
    }
  }

  submitQuiz() {
    this.isQuizSubmitted = true;
    this.sendData();
  }

}
