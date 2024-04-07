import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreationComponent } from './creation/creation.component';
import { QuizRoutingModule } from '../quiz-routing.module';
import { QuestionCardComponent } from 'src/app/components/question-card/question-card.component';
import { FormsModule} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { QuestionSelectDialogComponent } from './question-select-dialog/question-select-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { ProcessImportedDataService } from 'src/app/services/process-imported-data.service';
import { SettingsComponent } from './settings/settings.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { PreviewDialogComponent } from './preview-dialog/preview-dialog.component';
import { FillableQuestionComponent } from 'src/app/components/fillable-question/fillable-question.component';
import {MatDividerModule} from '@angular/material/divider';


@NgModule({
  declarations: [
    CreationComponent,
    QuestionCardComponent,
    QuestionSelectDialogComponent,
    SettingsComponent,
    PreviewDialogComponent,
    FillableQuestionComponent
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
    MatOptionModule,
    MatSidenavModule,
    MatSlideToggleModule,
    NgxMatTimepickerModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    MatDividerModule
  ],
  providers: [
    ProcessImportedDataService
  ]
})
export class QuizModule { }
