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
    21,         //usedQuestions
    false,      //isStart
    "00:00",    //startTime
    new Date(), //startDate
    false,      //isDeadline
    "23:59",    //deadlineTime
    new Date(), //deadlineDate
    false,      //isDuration
    0,          //duration
    true,       //showAnswers
  )

  currentDate: Date;

  constructor() {
    this.currentDate = new Date();
  }

  emitSettingChanges() {
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
