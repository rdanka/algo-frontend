import { Component } from '@angular/core';
import { ObservableService } from 'src/app/common/services/observable.service';

@Component({
  selector: 'app-algorithm-selector',
  templateUrl: './algorithm-selector.component.html',
  styleUrls: ['./algorithm-selector.component.scss']
})
export class AlgorithmSelectorComponent {
  isActive = true;

  constructor(private readonly observableService: ObservableService) {}

  public doStuff(): void {
    this.isActive = !this.isActive;
    console.log(this.isActive)
  }

  startSort(shortType:String) {
    this.observableService.sendClickEvent(shortType);
  }
  
}
