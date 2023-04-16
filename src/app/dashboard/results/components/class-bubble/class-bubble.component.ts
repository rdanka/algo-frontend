import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import Chart from 'chart.js/auto'

@Component({
  selector: 'app-class-bubble',
  templateUrl: './class-bubble.component.html',
  styleUrls: ['./class-bubble.component.scss']
})
export class ClassBubbleComponent {
  chart: any;
  @Input() data: any;
  labels: string[] = [];
  points: number[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (this.chart)  this.chart.destroy();
    if (changes['data'].currentValue) {
      console.log(changes['data'])
      this.createChart()
    }
}

  createChart(){
    this.data.sort(function (a: any, b: any) {
      if (a.studentId < b.studentId) {
        return -1;
      }
      if (a.studentId > b.studentId) {
        return 1;
      }
      return 0;
    });
    
    this.labels = [];
    this.points = [];
    this.data.forEach((result:any) => {
        if (result.algorithmName === 'Bubble Sort') {
          this.labels.push(result.studentId);
          this.points.push(result.result);
        }
    });

    this.chart = new Chart("bubbleChart", {
      type: 'bar',
      data: {
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
                text: 'Bubble Sort'
            },
            legend: {
              display: false
           }
        }
    }
    });
  }
}
