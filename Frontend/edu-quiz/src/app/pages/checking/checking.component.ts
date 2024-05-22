import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FilledQuiz } from 'src/app/models/filled-quiz.model';
import { AnswerOption, CalculateAnswer, FreeTextAnswer, PairingAnswer, RightOrderAnswer, SimpleAnswer } from 'src/app/models/question.model';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-checking',
  templateUrl: './checking.component.html',
  styleUrls: ['./checking.component.scss']
})
export class CheckingComponent {
  filledQuiz!: FilledQuiz;

  constructor(private router: Router, private quizService: QuizService) {
    this.filledQuiz = this.router.getCurrentNavigation()?.extras?.state?.['data'];
  }

  finishChecking() {
    this.filledQuiz.isChecked = true;

    this.quizService.finishChecking(this.filledQuiz)
      .subscribe(
        resp => {
          console.log('Checked quiz submitted succesfully!', resp);
          this.router.navigate(['/']);
        },
        error => {
          console.log('An error occurred while submitting the quiz.', error);
        }
      );
  }

  isSimpleAnswer(answer: AnswerOption): answer is SimpleAnswer {
    return answer instanceof SimpleAnswer;
  }

  isCalcAnswer(answer: AnswerOption): answer is CalculateAnswer {
    return answer instanceof CalculateAnswer;
  }

  isPairingAnswer(answer: AnswerOption): answer is PairingAnswer {
    return answer instanceof PairingAnswer;
  }

  isRightOrderAnswer(answer: AnswerOption): answer is RightOrderAnswer {
    return answer instanceof RightOrderAnswer;
  }

  isFreeTextAnswer(answer: AnswerOption): answer is FreeTextAnswer {
    return answer instanceof FreeTextAnswer;
  }
}
