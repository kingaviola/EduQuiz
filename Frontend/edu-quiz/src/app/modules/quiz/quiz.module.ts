import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreationComponent } from './creation/creation.component';
import { QuizRoutingModule } from '../quiz-routing.module';
import { QuestionCardComponent } from 'src/app/components/question-card/question-card.component';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { QuestionSelectDialogComponent } from './question-select-dialog/question-select-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';


@NgModule({
  declarations: [
    CreationComponent,
    QuestionCardComponent,
    QuestionSelectDialogComponent
  ],
  imports: [
    CommonModule,
    QuizRoutingModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    DragDropModule,
    MatDialogModule,
    MatSelectModule,
    MatOptionModule
  ]
})
export class QuizModule { }
