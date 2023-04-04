import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ObservableService } from '../common/services/observable.service';
import { animateBubbleSort } from './algorithms/bubble-sort-animation';
import { generateArray } from '../common/utils/generateArray';
import { delay } from '../common/utils/delay';
import { getMergeSortAnimations } from './algorithms/merge-sort-animation';
import { getAnimationsForQuickSort } from './algorithms/quick-sort-animation';
import { animateSelectionSort } from './algorithms/selection-sort-animation';

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
  PRIMARY_COLOR = '#0080FF';//0080FF
  SECONDARY_COLOR = '#FDDD5C';
  animationSpeedMs = 50;
  pivotColor = "green";
  numberOfSwaps = 0;
  selectedAlgorithm = new BehaviorSubject('bubble');
  isPaused = false;
  currentStep = 0;
  allNumberOfSwaps:number;

  constructor(private observableService: ObservableService) {}

  ngOnInit() {
    this.selectedAlgorithm.subscribe((algorithm: string) => {
      this.currentArray = generateArray(50);
    });
  }


    async bubbleSort() {
      let animations = animateBubbleSort(this.currentArray);
      this.allNumberOfSwaps = animations.filter((array: any) => array[0] === "Swap").length;
      
      let arrayBars = document.getElementsByClassName('array-bar');
      for(let i = this.currentStep; i < animations.length; i++) {
        if(this.isPaused) {
        break; 
        }
        const [check,v1,v2,v3,v4] = animations[i];
        if(check === "HighLightOn") {
          let barOneStyle = <HTMLElement>arrayBars[v1];
          let barTwoStyle = <HTMLElement>arrayBars[v2];

          await new Promise<void>( (resolve,reject)  => setTimeout(() => {
            barOneStyle.style.backgroundColor = this.SECONDARY_COLOR;
            barTwoStyle.style.backgroundColor = this.SECONDARY_COLOR;
            resolve();
          }, this.animationSpeedMs));
        } else if(check === "HighLightOff") {
          let barOneStyle = <HTMLElement>arrayBars[v1];
          let barTwoStyle = <HTMLElement>arrayBars[v2];
          
          await new Promise<void>( resolve => setTimeout(() => {
          barOneStyle.style.backgroundColor = this.PRIMARY_COLOR;
          barTwoStyle.style.backgroundColor = this.PRIMARY_COLOR;
          resolve();
          }, this.animationSpeedMs));
        } else if(check === "Swap") {
          let barOneStyle = <HTMLElement>arrayBars[v1];
          let barTwoStyle = <HTMLElement>arrayBars[v3];

          await new Promise<void>( resolve => setTimeout(() => {
            barOneStyle.style.backgroundColor = this.SECONDARY_COLOR;
            barTwoStyle.style.backgroundColor = this.SECONDARY_COLOR;
            resolve();
            barOneStyle.style.height = `${v2}px`;
            barTwoStyle.style.height = `${v4}px`;
            if (this.currentArray.length < 34) {
              barOneStyle.children[0].innerHTML = v2;
              barTwoStyle.children[0].innerHTML = v4;
            }
            this.numberOfSwaps++;
          }, this.animationSpeedMs));
        } else if (check === "Correct") {
          let barOneStyle = <HTMLElement>arrayBars[v1];
          let barTwoStyle = <HTMLElement>arrayBars[v2];
          
          await new Promise<void>( resolve => setTimeout(() => {
          barOneStyle.style.backgroundColor = '#44BBA4';
          barTwoStyle.style.backgroundColor = '#44BBA4';
          resolve();
          }, this.animationSpeedMs));
        }
        this.currentStep++;
      }
    }

    async selectionSort() {
      let sortedAnimations = animateSelectionSort(this.currentArray);
      let arrayBars = document.getElementsByClassName('array-bar');
      
      for (const element of sortedAnimations) {
        const [action, index1, index2] = element;
    
        if (action === "Comparison") {
          let barOneStyle = <HTMLElement>arrayBars[index1];
          let barTwoStyle = <HTMLElement>arrayBars[index2];
    
          barOneStyle.style.backgroundColor = this.SECONDARY_COLOR;
          barTwoStyle.style.backgroundColor = 'red';
    
          await new Promise<void>(resolve => setTimeout(resolve, this.animationSpeedMs));
    
          barOneStyle.style.backgroundColor = this.PRIMARY_COLOR;
          barTwoStyle.style.backgroundColor = this.PRIMARY_COLOR;
        }
    
        if (action === "Swap") {
          let barOneStyle = <HTMLElement>arrayBars[index1];
          let barTwoStyle = <HTMLElement>arrayBars[index2];
    
          barOneStyle.style.backgroundColor = this.SECONDARY_COLOR;
          barTwoStyle.style.backgroundColor = this.SECONDARY_COLOR;
    
          await new Promise<void>(resolve => setTimeout(resolve, this.animationSpeedMs));
    
          [barOneStyle.style.height, barTwoStyle.style.height] = [barTwoStyle.style.height, barOneStyle.style.height];

          if (this.currentArray.length < 34) {
            barOneStyle.children[0].innerHTML = barOneStyle.style.height.slice(0,-2);
            barTwoStyle.children[0].innerHTML = barTwoStyle.style.height.slice(0,-2);
          } 
    
          barOneStyle.style.backgroundColor = this.PRIMARY_COLOR;
          barTwoStyle.style.backgroundColor = this.PRIMARY_COLOR;
          this.currentStep++;
          this.numberOfSwaps++;
        }
      }
    }
    
  mergeSort(){
    const arrayBars = document.getElementsByClassName('array-bar');
    let animations = getMergeSortAnimations(this.currentArray);
    this.allNumberOfSwaps = animations.filter((array: any) => array[0] === "Swap").length;
    console.log(this.allNumberOfSwaps)
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
          if (this.currentArray.length < 34) {
            barOneStyle.children[0].innerHTML = newHeight;
          }
          this.currentStep++;
        }, i * this.animationSpeedMs);
      }
      this.currentStep++;
    }
   }


   quickSort(){
    let arrayBars = document.getElementsByClassName('array-bar');
    let animations = getAnimationsForQuickSort(this.currentArray);
    this.allNumberOfSwaps = animations.filter((array: any) => array[0] === "swap").length;
    for(let i = 0; i< animations.length; i++)
    {
      let check = animations[i][0];
      if(check === "pivoton")
      {
        let pivotBar = animations[i][1];
        const barPivotStyle = <HTMLElement>arrayBars[pivotBar];
        setTimeout(() => {
         barPivotStyle.style.backgroundColor = 'red';
        }, i * this.animationSpeedMs);
      }
      else if(check === "highLighton")
      {
        const [barOneIdx,barTwoIdx] = animations[i].slice(1);
        const barOneStyle = <HTMLElement>arrayBars[barOneIdx];
        const barTwoeStyle = <HTMLElement>arrayBars[barTwoIdx];

        setTimeout(() => {
          barOneStyle.style.backgroundColor = this.SECONDARY_COLOR;
          barTwoeStyle.style.backgroundColor = this.SECONDARY_COLOR;
         }, i * this.animationSpeedMs);
      }
      else if(check === "highLightoff")
      {
        const [barOneIdx,barTwoIdx] = animations[i].slice(1);
        const barOneStyle = <HTMLElement>arrayBars[barOneIdx];
        const barTwoeStyle = <HTMLElement>arrayBars[barTwoIdx];

        setTimeout(() => {
          barOneStyle.style.backgroundColor = this.PRIMARY_COLOR;
          barTwoeStyle.style.backgroundColor = this.PRIMARY_COLOR;
         }, i * this.animationSpeedMs);
      }
      else if(check === "pivotOff")
      {
        let pivotBar = animations[i][1];
        const barPivotStyle = <HTMLElement>arrayBars[pivotBar];
        setTimeout(() => {
         barPivotStyle.style.backgroundColor = this.PRIMARY_COLOR;
        }, i * this.animationSpeedMs);
      }
      else if(check === "swap")
      {
        const [barIndexOne,barValueOne,barIndexTwo,barValueTwo] = animations[i].slice(1);
        const barOneStyle = <HTMLElement>arrayBars[barIndexOne];
        const barTwoeStyle = <HTMLElement>arrayBars[barIndexTwo];

        setTimeout(() => {
          barOneStyle.style.height = `${barValueOne}px`;
          barTwoeStyle.style.height = `${barValueTwo}px`;
          this.numberOfSwaps++;
         }, i * this.animationSpeedMs);

      }
      this.currentStep++;
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
    switch (this.selectedAlgorithm.getValue()) {
      case 'bubble':
        this.bubbleSort();
        break; 
      case 'quick':
        this.quickSort();
        break;
      case 'merge':
        this.mergeSort();
        break;
      case 'selection':
        this.selectionSort();
        break;
      default:
        this.bubbleSort();
        break;
    }

  }

  onPause(): void {
    this.isPaused = !this.isPaused;
    if (!this.isPaused) {
      console.log(this.currentStep)
      switch (this.selectedAlgorithm.getValue()) {
        case 'bubble':
          this.bubbleSort();
          break; 
        case 'quick':
          this.quickSort();
          break;
        case 'merge':
          this.mergeSort();
          break;
        case 'selection':
          this.selectionSort();
          break;
        default:
          this.bubbleSort();
          break;
      }
    }
  }

  onSpeedChange(speedMs: number): void {
    this.animationSpeedMs = speedMs;
  }
}
