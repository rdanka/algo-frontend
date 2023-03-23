import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ObservableService } from 'src/app/common/services/observable.service';

@Component({
  selector: 'app-algorithm-details',
  templateUrl: './algorithm-details.component.html',
  styleUrls: ['./algorithm-details.component.scss']
})
export class AlgorithmDetailsComponent implements OnInit {
  selectedAlgorithm: string;
  currentArray: number[];
  arraySize: number;

  @ViewChild('arrayInput') arrayInput!: ElementRef;
  
  @Input() set array(array: number[]) {
      this.arrayInput.nativeElement.value = array;
  }
  @Output() onArraySizeChange = new EventEmitter<number>();
  @Output() onArrayChange = new EventEmitter<number[]>();
  @Output() onSort = new EventEmitter<void>();

  constructor(private readonly observableService: ObservableService) {}

  ngOnInit(): void {
    this.observableService.getAlgorithm().subscribe((shortType)=>{
      this.selectedAlgorithm = shortType;
    })
  }

  arraySizeChange(size: unknown): void {
    const arraySize = size as number;
    this.arraySize = arraySize;
    this.onArraySizeChange.emit(arraySize);
  }

  sort() {
    this.onSort.emit();
  }

  generate(): void {
    console.log(this.arrayInput.nativeElement.value.split(',').map(Number))
    console.log(Array.from(this.arrayInput.nativeElement.value.split(',').map(Number)))
    this.onArrayChange.emit(Array.from(this.arrayInput.nativeElement.value.split(',').map(Number)));
  }
}
