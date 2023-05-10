import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy, OnInit } from '@angular/core';

@Component({
  selector: 'app-algorithm-controller',
  templateUrl: './algorithm-controller.component.html',
  styleUrls: ['./algorithm-controller.component.scss']
})
export class AlgorithmControllerComponent  {
  @Input() isPaused = true;
  @Input() hasStarted = false;
  @Input() totalSwaps: number = 0;
  @Input() currentNumberOfSwaps: number = 0;
  @Output() onPause = new EventEmitter<boolean>();
  @Output() onRepeat = new EventEmitter<void>();
  @Output() onStepBack = new EventEmitter<void>();
  @Output() onStepForward = new EventEmitter<void>();
  @Output() onSpeed = new EventEmitter<number>();

  constructor() { }

  togglePause(): void {
    this.isPaused = !this.isPaused;
    this.onPause.emit(this.isPaused);
  }

  togglePlay(): void {
    this.hasStarted = true;
    this.isPaused = false;
    this.onPause.emit(this.isPaused);
  }

  replay(): void {
    this.onRepeat.emit();
  }

  onSpeedChange(speedMs: string): void {
    this.onSpeed.emit(parseInt(speedMs));
  }

  stepBack(): void {
    this.onStepBack.emit();
  }

  stepForward(): void {
    this.onStepForward.emit();
  }
}

