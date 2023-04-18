import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-algorithm-quiz',
  templateUrl: './algorithm-quiz.component.html',
  styleUrls: ['./algorithm-quiz.component.scss']
})
export class AlgorithmQuizComponent {
  @Input() selectedAlgorithm: BehaviorSubject<string>;
  @Output() onModalClose = new EventEmitter<any>();

  close() {
    this.onModalClose.emit();
  }
}
