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
  isCorrect = true;;
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
    const arr = generateArray(50);
    this.onArrayChange.emit(arr);
    if (this.arrayInput) this.arrayInput.nativeElement.value = arr;
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
    if (!this.isCorrect) return;
    const array: number[] = Array.from(this.arrayInput.nativeElement.value.split(',').map(Number));
    this.onArrayChange.emit(array);
    this.arraySizeInput.nativeElement.value = array.length;
  }

  open() {
    this.onOpenQuiz.emit();
  }

  checkArray(input: string): void {
    const array: number[] = Array.from(input.split(',').map(Number));
    this.isCorrect = !array.some(isNaN) && array.length > 0 && !array.some((num) => num > 100) && !array.some((num) => num < 1) && array.length <= 100;
  }
}
