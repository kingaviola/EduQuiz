import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreationComponent } from './creation/creation.component';
import { QuizRoutingModule } from '../quiz-routing.module';
import { QuestionCardComponent } from 'src/app/components/question-card/question-card.component';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    CreationComponent,
    QuestionCardComponent
  ],
  imports: [
    CommonModule,
    QuizRoutingModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class QuizModule { }
