import { Component } from '@angular/core';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartpageComponent {
  chartdata: any;

  labeldata: any[] = [];
  realdata: any[] = [];
  colordata: any[] = [];

  todayList: any[] = [];
  res: any;
  constructor() {}



  
}