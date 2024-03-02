import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreationComponent } from './creation/creation.component';
import { QuizRoutingModule } from '../quiz-routing.module';



@NgModule({
  declarations: [
    CreationComponent
  ],
  imports: [
    CommonModule,
    QuizRoutingModule
  ]
})
export class QuizModule { }
