import { Component, OnInit } from '@angular/core';
import { AnswerOption, CalculateAnswer, FreeTextAnswer, PairingAnswer, Question, RightOrderAnswer, SimpleAnswer, Variable } from 'src/app/models/question.model';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { QuestionSelectDialogComponent } from '../question-select-dialog/question-select-dialog.component';
import * as xmlJs from 'xml-js';
import { map } from 'rxjs/operators';
import { ProcessImportedDataService } from 'src/app/services/process-imported-data.service';
import { QuizSettings } from 'src/app/models/quiz-settings.model';
import { PreviewDialogComponent } from '../preview-dialog/preview-dialog.component';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import { QuizModel } from 'src/app/models/quiz.model';

@Component({
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.scss']
})
export class CreationComponent {
  questionData = new Question(0, '', null, '', []);
  questions: Question[] = [];
  newQuestionType: string = "";
  importedJsonData: any;
  importedQuestions: Question[] = [];
  quizTitle: string = "";
  quizDesc: string = "";
  data: any;
  //initialize empty quiz settings
  settings: QuizSettings = new QuizSettings(
    false,      //isQuestionsRandom
    false,      //isAnswersRandom
    true,       //useAllQuestion
    21,         //usedQuestions
    false,      //isStart
    "00:00",    //startTime
    new Date().toISOString(), //startDate
    false,      //isDeadline
    "23:59",    //deadlineTime
    new Date().toISOString(), //deadlineDate
    false,      //isDuration
    0,          //duration
    true,       //showAnswers
  )

  newQuiz: QuizModel = {
    id: 0,
    userId: 5,
    name: "",
    description: "",
    creationDate: new Date().toISOString(),
    questions: [],
    settings: this.settings
  }

  constructor(private dialog: MatDialog, private importProcessService: ProcessImportedDataService, private router: Router, private quizService: QuizService) { 

    const routerData = this.router.getCurrentNavigation()?.extras?.state?.['data'];
    this.quizTitle = routerData.title;
    this.quizDesc = routerData.desc;

    this.newQuiz.name = this.quizTitle;
    this.newQuiz.description = this.quizDesc;
    this.newQuiz.creationDate = new Date().toISOString();
    this.newQuiz.settings = this.settings;

    this.quizService.createQuiz(this.newQuiz)
      .subscribe(
        resp => {
          console.log('Quiz submitted succesfully!', resp);
          this.newQuiz.id = resp;
        },
        error => {
          console.log('An error occurred while submitting the quiz.', error);
        }
      );
  }

  
  openPreview(): void {
    const dialogRef = this.dialog.open(PreviewDialogComponent, {
      width: '80%',
      data: { questions: this.questions }
    });
  }

  onSettingsChanged(settings: QuizSettings) {
    this.settings = settings;
    console.log(settings);
  }

  importQuestions(event: any) {
    const file = event.target.files[0];
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result as string;
      if (file.type === 'application/json'){
        this.importedJsonData = JSON.parse(data);
        this.processImportedData(this.importedJsonData, 'json');
      }
      else if (file.type === 'text/xml') {
        this.importedJsonData = xmlJs.xml2js(data, {compact: true});
        this.processImportedData(this.importedJsonData, 'xml');
      } 
      else
        console.log("Unsupported file");
    };
    reader.readAsText(file);
  }

  processImportedData(data: any, type: string) {
    if (type === 'json'){
      this.importedQuestions = this.importProcessService.mapJsonQuestions(data);
      console.log(this.importedQuestions);
    }
    else {
      this.importedQuestions = this.importProcessService.mapXmlQuestions(data);
      console.log(this.importedQuestions);
    }

    this.importedQuestions.forEach(question => {
      this.onQuestionChanged(question);
    });
  }

  openQuestionDialog() {
    const dialogRef = this.dialog.open(QuestionSelectDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.newQuestionType = result;
      this.addQuestion();
    })

  }

  drop(event: CdkDragDrop<Question[]>) {
    moveItemInArray(this.questions, event.previousIndex, event.currentIndex);
  }

  onQuestionChanged(questionData: Question, idx: number = -1) {
    if (idx === -1) {
      this.questions.push(questionData);
    }
    else {
      this.questions[idx] = questionData;
    }
  }

  addQuestion() {
    const newQuestionData = new Question(0, '', null, '', []);

    let rounded = (1 / 3).toFixed(2);
    let defaultPoint: number = Number(rounded);
    newQuestionData.type = this.newQuestionType;
    console.log(this.newQuestionType);

    switch (this.newQuestionType){
      case 'calculate':
        newQuestionData.answers.push(new CalculateAnswer(0, 1, [], 0));
        break;
      case 'pairing':
        newQuestionData.answers.push(new PairingAnswer(0, defaultPoint, '', ''));
        newQuestionData.answers.push(new PairingAnswer(0, defaultPoint, '', ''));
        newQuestionData.answers.push(new PairingAnswer(0, defaultPoint, '', ''));
        break;
      case 'rightOrder':
        newQuestionData.answers.push(new RightOrderAnswer(0, defaultPoint, 1, ''));
        newQuestionData.answers.push(new RightOrderAnswer(0, defaultPoint, 2, ''));
        newQuestionData.answers.push(new RightOrderAnswer(0, defaultPoint, 3, ''));
        break;
      case 'freeText':
        newQuestionData.answers.push(new FreeTextAnswer(0, 1, ''));
        break;
      default:
        newQuestionData.answers.push(new SimpleAnswer(0, defaultPoint, false, ""));
        newQuestionData.answers.push(new SimpleAnswer(0, defaultPoint, false, ""));
        newQuestionData.answers.push(new SimpleAnswer(0, defaultPoint, false, ""));
    }

    this.onQuestionChanged(newQuestionData);
  }

  removeQuestion(idx: number) {
    this.questions.splice(idx, 1);
  }

  saveQuiz() {
    //update the quiz data
    this.newQuiz.name = this.quizTitle;
    this.newQuiz.description = this.quizDesc;
    this.newQuiz.settings = this.settings;
    this.newQuiz.questions = this.questions;

    console.log("kvíz mentése...");
    console.log(this.newQuiz);

    this.quizService.saveQuiz(this.newQuiz)
      .subscribe(
        resp => {
          console.log('Quiz submitted succesfully!', resp);
        },
        error => {
          console.log('An error occurred while submitting the quiz.', error);
        }
      );

    this.router.navigate(['/']);
  }
}
