import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { QuizSettings } from 'src/app/models/quiz-settings.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  @ViewChild('startTimePicker') startTimePicker: any;
  @ViewChild('deadlineTimePicker') deadlineTimePicker: any;
  @Input() questionSum: number = 0;
  @Output() settingsChanged: EventEmitter<QuizSettings> = new EventEmitter<QuizSettings>();

  settings: QuizSettings = new QuizSettings(
    false,      //isQuestionsRandom
    false,      //isAnswersRandom
    true,       //useAllQuestion
    this.questionSum,         //usedQuestions
    false,      //isStart
    "00:00",    //startTime
    new Date().toISOString(), //startDate
    false,      //isDeadline
    "23:59",    //deadlineTime
    new Date().toISOString(), //deadlineDate
    false,      //isDuration
    0,          //duration
    true,       //showAnswers
    '',         //questionGroups        
  )

  currentDate: Date;

  constructor() {
    this.currentDate = new Date();
  }

  emitSettingChanges() {
    let startDate = new Date(this.settings.startDate);
    let deadlineDate = new Date(this.settings.deadlineDate);
    let [hours1, minutes1] = this.settings.startTime.split(':').map(Number);
    let [hours2, minutes2] = this.settings.startTime.split(':').map(Number);
    startDate.setHours(hours1, minutes1);
    deadlineDate.setHours(hours2, minutes2);
    this.settings.startDate = startDate.toISOString();
    this.settings.deadlineDate = deadlineDate.toISOString();
    this.settingsChanged.emit(this.settings);
  }

  openStartTimePicker() {
    this.startTimePicker.open();
  }

  startTimeChanged(event: any) {
    this.settings.startTime = event;
  }

  openDeadlineTimePicker() {
    this.deadlineTimePicker.open();
  }

  deadlineTimeChanged(event: any) {
    this.settings.deadlineTime = event;
  }
}
