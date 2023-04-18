import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-algorithm-selector',
  templateUrl: './algorithm-selector.component.html',
  styleUrls: ['./algorithm-selector.component.scss']
})
export class AlgorithmSelectorComponent {
  active = 'bubble';
  @Output() onAlgorithmSelected = new EventEmitter<string>();

  constructor() {}

  selectSort(sortType: string) {
    this.active = sortType;
    this.onAlgorithmSelected.emit(sortType);
  }
  
}
