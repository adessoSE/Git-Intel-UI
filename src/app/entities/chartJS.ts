
export class ChartJsContent {
    public labels: Array<string>;
    public data: [{ data: Array<number>, label: string }];
}

export class ChartJs {
    chartTitle: string;
    chartType: string;
    chartOptions: any;
    chartLegend: boolean;
    chartContent: ChartJsContent;
    chartColors: Array<any>;
}