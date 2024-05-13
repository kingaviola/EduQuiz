import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
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
    showAnswers: false
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

  constructor(private router: Router, private quizSerivce: QuizService, private processService: ProcessImportedDataService) {
    this.quizId = this.router.getCurrentNavigation()?.extras?.state?.['data'];
  }
  
  ngOnInit(): void {
    this.getQuizData();
  }

  getFilledQuestions(event: any) {
    console.log("got back data ", event);
  }

  getQuizData() {
    this.quizSerivce.getQuizById(this.quizId)
      .subscribe((quiz) => {
        this.quiz = quiz;
      });
  }

  submitQuiz() {
    this.isQuizSubmitted = true;
  }

}
