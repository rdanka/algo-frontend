import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ObservableService } from '../common/services/observable.service';
import { animateBubbleSort } from './algorithms/bubble-sort-animation';
import { generateArray } from '../common/utils/generateArray';
import { delay } from '../common/utils/delay';
import { getMergeSortAnimations } from './algorithms/merge-sort-animation';

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
  SECONDARY_COLOR = '#FDDD5C';
  animationSpeedMs = 300;
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
    this.allNumberOfSwaps = animations.filter((array: any) => array[0] === "Swap").length;
    
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
          barTwoStyle.style.backgroundColor = this.SECONDARY_COLOR;
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
          barOneStyle.style.backgroundColor = this.SECONDARY_COLOR;
          barTwoStyle.style.backgroundColor = this.SECONDARY_COLOR;
          barOneStyle.style.height = `${v2}px`;
          barTwoStyle.style.height = `${v4}px`;
          if (this.currentArray.length < 34) {
            barOneStyle.children[0].innerHTML = v2;
            barTwoStyle.children[0].innerHTML = v4;
          }
          this.numberOfSwaps++;
         }, i * this.animationSpeedMs);
         //await delay(this.animationSpeedMs);
      } else if (check === "Correct") {
        let barOneStyle = <HTMLElement>arrayBars[v1];
        let barTwoStyle = <HTMLElement>arrayBars[v2];
        
        setTimeout(() => {
         barOneStyle.style.backgroundColor = '#44BBA4';
         barTwoStyle.style.backgroundColor = '#44BBA4';
         }, i * this.animationSpeedMs);
      }
      this.currentStep++;
      await delay(this.animationSpeedMs);
    }
  }

  mergSort(){
    const arrayBars = document.getElementsByClassName('array-bar');
    let animations = getMergeSortAnimations(this.currentArray);
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = <HTMLElement>arrayBars[barOneIdx];
        const barTwoStyle = <HTMLElement>arrayBars[barTwoIdx];
        const color = i % 3 === 0 ? this.SECONDARY_COLOR : this.PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.style.backgroundColor = color;
          barTwoStyle.style.backgroundColor = color;
        }, i * this.animationSpeedMs);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = <HTMLElement>arrayBars[barOneIdx];
          barOneStyle.style.height = `${newHeight}px`;
          this.currentStep++;
        }, i * this.animationSpeedMs);
      }
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
    this.mergSort();
  }

  onPause(): void {
    this.isPaused = !this.isPaused;
    if (!this.isPaused) {
      console.log(this.currentStep)
      this.playAnimatedSort();
    }
  }

  onSpeedChange(speedMs: number): void {
    this.animationSpeedMs = speedMs;
  }
}
