import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  @Input() chartTitle: string;
  @Input() chartType: string;
  @Input() chartOptions: any;
  @Input() chartLegend: boolean;
  @Input() chartData: Array<any>;
  @Input() chartLabels: Array<any>;
  @Input() chartColors: Array<any>

  constructor() { }

  ngOnInit() {
  }

}
