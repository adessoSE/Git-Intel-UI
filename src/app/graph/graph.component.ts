import { Component, OnInit, Input } from '@angular/core';
import { ChartJs, ChartJsData } from '../entities/chartJS';
import { CHARTJS_DEFAULT } from '../mock-data';

@Component({
  selector: 'graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  @Input() chartData: ChartJsData;
  @Input() organization: string;
  chart: ChartJs = CHARTJS_DEFAULT;
  chartCaption: string;

  constructor() { }

  ngOnInit() {
    if (this.chartData != null) {
      this.chartCaption = this.chartData.caption;
    }
  }

  /**
   * Fetches graph element and prepares download link.
   * @param event MouseClick event that referes to triggered DOM element. 
   */
  downloadGraph(event) {
    var anchor = event.target;

    anchor.href = document.getElementsByTagName('canvas')[0].toDataURL();

    anchor.download = this.organization + " " + this.chart.chartTitle + " - " + new Date().toLocaleDateString() + ".png";
  }


}
