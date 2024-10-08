import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { StatisticsBarModel, StatisticsBaseModel } from 'src/app/models/statistics-models';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  multi: StatisticsBarModel[] = [];

  view: [number, number] = [700, 250];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Number of answers';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Questions';
  animations: boolean = true;

  myColor2: Color = {
    name: 'myColors',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#de5349']
  };


  quizId: number;
  userId: number;

  constructor(private router: Router, private quizService: QuizService) {
    this.quizId = this.router.getCurrentNavigation()?.extras?.state?.['quizId'];
    this.userId = this.router.getCurrentNavigation()?.extras?.state?.['userId'];
   }

   single: StatisticsBaseModel[] = []

  ngOnInit(): void {
    this.getData();
  }

   getData() {
    this.quizService.getBarStatData(this.quizId, this.userId)
      .subscribe((data) => {
        this.multi = data;
      });

    this.quizService.getPieStatData(this.quizId, this.userId)
      .subscribe((data) => {
        this.single = data;
      });
   }

  onSelect(event: any) {
    console.log(event);
  }


  // options
  gradient2: boolean = true;
  showLegend2: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  myColor: Color = {
    name: 'myColors',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#25be58', '#9dc750', '#ffdc5e', '#db9d51', '#db6151']
  };

  view2: [number, number] = [1200, 400];

  onSelect2(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
