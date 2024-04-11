import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsComponent } from './groups/groups.component';
import { GroupsDetailsComponent } from './groups-details/groups-details.component';
import { GroupsRoutingModule } from '../groups-routing.module';
import { GroupCardComponent } from './group-card/group-card.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { CreateGroupDialogComponent } from './create-group-dialog/create-group-dialog.component';
import { JoinGroupDialogComponent } from './join-group-dialog/join-group-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { QuizCardComponent } from 'src/app/components/quiz-card/quiz-card.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    GroupsComponent,
    GroupsDetailsComponent,
    GroupCardComponent,
    CreateGroupDialogComponent,
    JoinGroupDialogComponent
  ],
  imports: [
    CommonModule,
    GroupsRoutingModule,
    MatExpansionModule,
    MatDividerModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatAutocompleteModule,
    MatToolbarModule,
    MatMenuModule,
    SharedModule
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    },
  ]
})
export class GroupsModule { }
