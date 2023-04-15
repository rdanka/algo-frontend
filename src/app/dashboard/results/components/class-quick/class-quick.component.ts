import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import Chart from 'chart.js/auto'

@Component({
  selector: 'app-class-quick',
  templateUrl: './class-quick.component.html',
  styleUrls: ['../class-bubble/class-bubble.component.scss']
})
export class ClassQuickComponent {
  chart: any;
  @Input() data: any;
  labels: string[] = [];
  points: number[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (this.chart)  this.chart.destroy();
    if (changes['data'].currentValue) {
      this.createChart()
    }
}

  createChart(){
    this.data.forEach((result:any) => {
      if (result.algorithmName === 'Quick Sort') {
        this.labels.push(result.studentId);
        this.points.push(result.result);
      }
  });
      this.chart = new Chart("quickChart", {
      type: 'bar',

      data: {// values on X-Axis
        labels: this.labels,
	       datasets: [
          {
            label: "Points",
            data: this.points,
            backgroundColor: '#742CDF'
          } 
        ]
      },
      options: {
        plugins: {
            title: {
                display: true,
                text: 'Quick Sort'
            },
            legend: {
              display: false
           }
        }
    }
      
    });
  }
}
