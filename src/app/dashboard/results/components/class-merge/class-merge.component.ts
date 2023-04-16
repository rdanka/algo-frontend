import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import Chart from 'chart.js/auto'

@Component({
  selector: 'app-class-merge',
  templateUrl: './class-merge.component.html',
  styleUrls: ['../class-bubble/class-bubble.component.scss']
})
export class ClassMergeComponent {
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
      if (result.algorithmName === 'Merge Sort') {
        this.labels.push(result.studentId);
        this.points.push(result.result);
      }
  });
      this.chart = new Chart("mergeChart", {
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
                text: 'Merge Sort'
            },
            legend: {
              display: false
           }
        }
    }
      
    });
  }
}
