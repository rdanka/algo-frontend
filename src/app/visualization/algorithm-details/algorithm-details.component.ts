import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ObservableService } from 'src/app/common/services/observable.service';
import { generateArray } from 'src/app/common/utils/generateArray';

@Component({
  selector: 'app-algorithm-details',
  templateUrl: './algorithm-details.component.html',
  styleUrls: ['./algorithm-details.component.scss']
})
export class AlgorithmDetailsComponent implements OnInit {
  selectedAlgorithm: string;
  currentArray: number[];
  arraySize: number;

  @Output() onArrayChange = new EventEmitter<number>();
  @Output() onSort = new EventEmitter<void>();

  constructor(private readonly observableService: ObservableService) {}

  ngOnInit(): void {
    this.observableService.getAlgorithm().subscribe((shortType)=>{
      this.selectedAlgorithm = shortType;
    })
  }

  onArraySizeChange(size: unknown): void {
    const arraySize = size as number;
    this.arraySize = arraySize;
    this.onArrayChange.emit(arraySize);
  }

  sort() {
    this.onSort.emit();
  }

  randomIntFromInterval(min:any, max:any) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
