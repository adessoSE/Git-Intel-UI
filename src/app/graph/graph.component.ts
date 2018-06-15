import { Component, OnInit, Input } from '@angular/core';
import { ChartJs } from '../entities/chartJS';

@Component({
  selector: 'graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  @Input() chart: ChartJs;
  @Input() organization: string;

  constructor() { }

  ngOnInit() { }

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
