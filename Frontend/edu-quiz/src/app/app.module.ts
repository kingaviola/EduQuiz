import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { GroupsModule } from './modules/groups/groups.module';
import { QuizModule } from './modules/quiz/quiz.module';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { QuizCardComponent } from './components/quiz-card/quiz-card.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FillingComponent } from './pages/filling/filling.component';
import { CreateQuizDialogComponent } from './components/create-quiz-dialog/create-quiz-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    ProfileComponent,
    FillingComponent,
    CreateQuizDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    GroupsModule,
    QuizModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [QuizCardComponent]
})
export class AppModule { }
