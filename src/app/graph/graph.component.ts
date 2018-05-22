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
  @Input() organization: string;

  constructor() { }

  ngOnInit() { }

  downloadGraph(event) {
    var anchor = event.target;

    anchor.href = document.getElementsByTagName('canvas')[0].toDataURL();

    anchor.download = this.organization + " " + this.chartTitle + " - " + new Date().toLocaleDateString() + ".png";
  }


}
