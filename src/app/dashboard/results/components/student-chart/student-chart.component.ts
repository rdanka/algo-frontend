import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import Chart from 'chart.js/auto'

@Component({
  selector: 'app-student-chart',
  templateUrl: './student-chart.component.html',
  styleUrls: ['./student-chart.component.scss']
})
export class StudentChartComponent implements OnChanges  {
  chart: any;
  @Input() labels: string[];
  @Input() data: number[];

  ngOnChanges(changes: SimpleChanges) {
    if (this.chart)  this.chart.destroy();
    if (changes['labels'].currentValue && changes['data'].currentValue) {
      this.createChart()
    }
}

  createChart(){
      this.chart = new Chart("studentChart", {
      type: 'bar',

      data: {// values on X-Axis
        labels: this.labels, // algorithms
	       datasets: [
          {
            label: "Points",
            data: this.data,
            backgroundColor: '#742CDF'
          } 
        ]
      },
      options: {
        aspectRatio:2
      }
      
    });
  }
}
