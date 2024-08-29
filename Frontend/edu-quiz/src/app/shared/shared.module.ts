import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/header/header.component';
import { QuizCardComponent } from '../components/quiz-card/quiz-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { FillableQuestionComponent } from '../components/fillable-question/fillable-question.component';
import { MatDividerModule } from '@angular/material/divider';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatStepperModule } from '@angular/material/stepper';



@NgModule({
  declarations: [
    HeaderComponent,
    QuizCardComponent,
    FillableQuestionComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule,
    MatDividerModule,
    DragDropModule,
    FormsModule,
    RouterModule,
    MatStepperModule
  ],
  exports: [HeaderComponent, QuizCardComponent, FillableQuestionComponent]
})
export class SharedModule { }
