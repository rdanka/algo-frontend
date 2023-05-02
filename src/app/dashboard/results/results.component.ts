import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { ResultService } from 'src/app/common/services/result.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent {

  _userId = '';
  _className = '';
  viewToggle = '';
  classData: any;
  algorithms: string[] = [];
  points: number[] = [];

 @Input() set id(value: string) {
  this._userId = value;
  if (value !== '') this.viewToggle = 'student';
  this.updateCharts();
  }

  @Input() set className(value: string) {
      this._className = value;
      if (value !== '') this.viewToggle = 'class';
      this.updateCharts();
  }

  constructor(private readonly resultService: ResultService, private cd: ChangeDetectorRef) {}

  updateCharts() {
    if (this.viewToggle === 'student') {
      this.resultService.getResultsByStudentId(this._userId).subscribe(data => {
        this.algorithms = [];
        this.points = [];
        data.forEach((result: any) => {
          this.algorithms.push(result.algorithmName);
          this.points.push(result.result);
        });
      })
    } else if (this.viewToggle === 'class') {
      this.resultService.getResultsByClassId(this._className).subscribe(data => this.classData = data)
    }
  }
}