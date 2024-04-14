import { Component } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent {
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      xAxes: [{ stacked: true }],
      yAxes: [{ stacked: true }]
    }
  };
  public barChartLabels: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  public barChartData: any[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A', stack: 'Stack 0' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B', stack: 'Stack 0' },
    { data: [10, 30, 20, 10, 20, 15, 5], label: 'Series C', stack: 'Stack 1' }
  ];
}
