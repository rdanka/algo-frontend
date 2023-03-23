import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ObservableService } from '../common/services/observable.service';
import { animateBubbleSort } from './algorithms/bubble-sort/bubble-sort-animation';
import { generateArray } from '../common/utils/generateArray';
import { delay } from '../common/utils/delay';

@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.scss']
})
export class VisualizationComponent implements OnInit {

  totalSwaps: number;
  currentnumberOfSwaps: number;
  selectedSortType: string;
  currentArray: number[];
  NUMBER_OF_ARRAY_BARS = 20;
  PRIMARY_COLOR = '#0080FF';
  SECONDARY_COLOR = 'red';
  animationSpeedMs = 0;
  pivotColor = "green";
  numberOfSwaps = 0;
  selectedAlgorithm = new BehaviorSubject('bubble');
  isPaused = false;
  currentStep = 0;
  allNumberOfSwaps:number;

  constructor(private observableService: ObservableService) {}

  ngOnInit() {
    this.selectedAlgorithm.subscribe((algorithm: string) => {
      this.currentArray = generateArray(10);
    });
  }

   async playAnimatedSort() {
    let animations = animateBubbleSort(this.currentArray);
    this.allNumberOfSwaps = animations.length / 3;
    
    let arrayBars = document.getElementsByClassName('array-bar');
    for(let i = this.currentStep; i < animations.length; i++) {
      console.log(this.isPaused)
      if(this.isPaused) {
       console.log(i, this.currentStep)
       break; 
      }
      const [check,v1,v2,v3,v4] = animations[i];
      if(check === "HighLightOn") {
        let barOneStyle = <HTMLElement>arrayBars[v1];
        let barTwoStyle = <HTMLElement>arrayBars[v2];

        setTimeout(() => {
          barOneStyle.style.backgroundColor = this.SECONDARY_COLOR;
          barTwoStyle.style.backgroundColor = this.pivotColor;
         }, i * this.animationSpeedMs);
      } else if(check === "HighLightOff") {
        let barOneStyle = <HTMLElement>arrayBars[v1];
        let barTwoStyle = <HTMLElement>arrayBars[v2];

        setTimeout(() => {
         barOneStyle.style.backgroundColor = this.PRIMARY_COLOR;
         barTwoStyle.style.backgroundColor = this.PRIMARY_COLOR;
         }, i * this.animationSpeedMs);
      } else if(check === "Swap") {
        let barOneStyle = <HTMLElement>arrayBars[v1];
        let barTwoStyle = <HTMLElement>arrayBars[v3];

        setTimeout(() => {
          barOneStyle.style.backgroundColor = this.pivotColor;
          barTwoStyle.style.backgroundColor = this.SECONDARY_COLOR;
          barOneStyle.style.height = `${v2}px`;
          barTwoStyle.style.height = `${v4}px`;
          this.numberOfSwaps++;
         // this.currentnumberOfSwaps.emit(this.numberOfSwaps);
         }, i * this.animationSpeedMs);
         //await delay(this.animationSpeedMs);
      }
      this.currentStep++;
      await delay(this.animationSpeedMs*i);
    }
 }

  selectAlgorithm(algorithm: string): void {
    this.selectedAlgorithm.next(algorithm);
  }

  onArraySizeChange(size: number): void {
    this.currentArray = generateArray(size);
  }

  onArrayChange(array: number[]): void {
    this.currentArray = array;
  }

  onArraySort(): void {
    this.allNumberOfSwaps = 0;
    this.numberOfSwaps = 0;
    this.currentStep = 0;
    this.playAnimatedSort();
  }

  onPause(): void {
    this.isPaused = !this.isPaused;
    if (!this.isPaused) {
      console.log(this.currentStep)
      this.playAnimatedSort();
    }
  }
}
