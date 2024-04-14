import { Component } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent {
  multi = [
    {
      "name": "Germany",
      "series": [
        {
          "name": "2010",
          "value": 7300000
        },
        {
          "name": "2011",
          "value": 8940000
        }
      ]
    },
  
    {
      "name": "USA",
      "series": [
        {
          "name": "2010",
          "value": 7870000
        },
        {
          "name": "2011",
          "value": 8270000
        }
      ]
    },
  
    {
      "name": "France",
      "series": [
        {
          "name": "2010",
          "value": 5000002
        },
        {
          "name": "2011",
          "value": 5800000
        }
      ]
    }
  ];

  view: [number, number] = [700, 150];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Kitöltések száma';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Kérdések';
  animations: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#C7B42C', '#AAAAAA']
  };

  constructor() { }

  onSelect(event: any) {
    console.log(event);
  }

  single = [
    {
      "name": "Always",
      "value": 8940000
    },
    {
      "name": "Often",
      "value": 5000000
    },
    {
      "name": "Rarely",
      "value": 7200000
    },
      {
      "name": "Never",
      "value": 6200000
    }
  ];

  // options
  gradient2: boolean = true;
  showLegend2: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  myColor: Color = {
    name: 'myColors',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#2596be', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  view2: [number, number] = [900, 400];

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
