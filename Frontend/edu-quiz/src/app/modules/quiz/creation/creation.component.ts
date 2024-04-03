import { Component } from '@angular/core';
import { AnswerOption, CalculateAnswer, FreeTextAnswer, PairingAnswer, Question, RightOrderAnswer, SimpleAnswer, Variable } from 'src/app/models/question.model';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { QuestionSelectDialogComponent } from '../question-select-dialog/question-select-dialog.component';
import * as xmlJs from 'xml-js';
import { map } from 'rxjs/operators';
import { ProcessImportedDataService } from 'src/app/services/process-imported-data.service';

@Component({
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.scss']
})
export class CreationComponent {
  questionData = new Question('', null, '', []);
  questions: Question[] = [];
  newQuestionType: string = "";
  importedJsonData: any;
  importedQuestions: Question[] = [];

  constructor(private dialog: MatDialog, private importProcessService: ProcessImportedDataService) { }

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

    //console.log(questionData);
  }

  addQuestion() {
    const newQuestionData = new Question('', null, '', []);

    let rounded = (1 / 3).toFixed(2);
    let defaultPoint: number = Number(rounded);
    newQuestionData.type = this.newQuestionType;
    console.log(this.newQuestionType);

    switch (this.newQuestionType){
      case 'calculate':
        newQuestionData.answers.push(new CalculateAnswer(1, [], 0));
        break;
      case 'pairing':
        newQuestionData.answers.push(new PairingAnswer(defaultPoint, '', ''));
        newQuestionData.answers.push(new PairingAnswer(defaultPoint, '', ''));
        newQuestionData.answers.push(new PairingAnswer(defaultPoint, '', ''));
        break;
      case 'rightOrder':
        newQuestionData.answers.push(new RightOrderAnswer(defaultPoint, 1, ''));
        newQuestionData.answers.push(new RightOrderAnswer(defaultPoint, 2, ''));
        newQuestionData.answers.push(new RightOrderAnswer(defaultPoint, 3, ''));
        break;
      case 'freeText':
        newQuestionData.answers.push(new FreeTextAnswer(1, ''));
        break;
      default:
        newQuestionData.answers.push(new SimpleAnswer(defaultPoint, false, ""));
        newQuestionData.answers.push(new SimpleAnswer(defaultPoint, false, ""));
        newQuestionData.answers.push(new SimpleAnswer(defaultPoint, false, ""));
    }

    this.onQuestionChanged(newQuestionData);
  }

  removeQuestion(idx: number) {
    this.questions.splice(idx, 1);
  }

  saveQuiz() {
    console.log("kvíz mentése...");
    console.log(this.questions);
  }
}
