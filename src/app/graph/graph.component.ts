import { Component, Input, OnInit } from '@angular/core';
import { ChartJsData } from '../entities/chartJS';

import * as $ from 'jquery';
import { renderDetachView } from '@angular/core/src/view/view_attach';

@Component({
  selector: 'graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  @Input() chartData: ChartJsData;
  @Input() organization: string;
  chartCaption: string;

  rendered: boolean = false;

  // The ChartJS chart, its properties and options
  chart = {
    chartTitle: "Member Growth",
    chartType: "line",
    chartOptions: {
      responsive: true,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            callback: function (value) { if (Number.isInteger(value)) { return value; } },
          }
        }]
      }
    },
    chartColors: [
      {
        backgroundColor: 'rgba(132, 179, 221, 0.2)',
        borderColor: '#428bca',
        pointBackgroundColor: 'rgba(225,10,24,0.2)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(225,10,24,0.2)'
      }
    ],
  };

  constructor() { }

  ngOnInit() {
    if (this.chartData != null) {
      this.chartCaption = this.chartData.caption;
    }
  }

  /**
   * Only initializes the modal when it is requested by the user.
   * This way the modal's (static) content always fits the correct graph data.
   */
  render(state: boolean) {
    this.rendered = state
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
