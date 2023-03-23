import { Component, EventEmitter, Output } from '@angular/core';
import { ObservableService } from 'src/app/common/services/observable.service';

@Component({
  selector: 'app-algorithm-selector',
  templateUrl: './algorithm-selector.component.html',
  styleUrls: ['./algorithm-selector.component.scss']
})
export class AlgorithmSelectorComponent {
  isActive = true;
  @Output() onAlgorithmSelected = new EventEmitter<string>();

  constructor(private readonly observableService: ObservableService) {}

  selectSort(sortType: string) {
    this.onAlgorithmSelected.emit(sortType);
  }
  
}
