import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-algorithm-controller',
  templateUrl: './algorithm-controller.component.html',
  styleUrls: ['./algorithm-controller.component.scss']
})
export class AlgorithmControllerComponent {
  isPaused = false;
  @Input() totalSwaps: number = 0;
  @Input() currentNumberOfSwaps: number = 0;
  @Output() onPause = new EventEmitter<boolean>();

  togglePause(): void {
    this.isPaused = !this.isPaused;
    this.onPause.emit(this.isPaused);
  }
}
