import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
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

  @ViewChild('arrayInput') arrayInput!: ElementRef;
  @ViewChild('arraySize') arraySizeInput!: ElementRef;
  
  @Input() set array(array: number[]) {
      if (this.arrayInput) this.arrayInput.nativeElement.value = array;
  }
  @Output() onArraySizeChange = new EventEmitter<number>();
  @Output() onArrayChange = new EventEmitter<number[]>();
  @Output() onSort = new EventEmitter<void>();
  @Output() onOpenQuiz = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {
    this.onArrayChange.emit(generateArray(50));
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
    const array: number[] = Array.from(this.arrayInput.nativeElement.value.split(',').map(Number));
    this.onArrayChange.emit(array);
    this.arraySizeInput.nativeElement.value = array.length;
  }

  open() {
    this.onOpenQuiz.emit();
  }
}
