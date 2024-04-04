import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  isQuestionsRandom = false;
  isAnswersRandom = false;
  useAllQuestion = true;
  usedQuestions = 0;
  questionSum = 0;
  isStart = false;
  //start date and time
  isDeadline = false;
  //deadline date and time
  isDuration = false;
  duration = 0;
  showAnswers = true;
}
