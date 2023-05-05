import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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
export class VisualizationComponent {

  currentArray: number[];
  PRIMARY_COLOR = '#0080FF';
  CANVAS_SIZE = 500;
  SECONDARY_COLOR = '#FDDD5C';
  animationSpeedMs = 50;
  numberOfSwaps = 0;
  selectedAlgorithm = new BehaviorSubject('Bubble Sort');
  isPaused = false;
  currentStep = 0;
  sizeMultiplier = 5;
  allNumberOfSwaps: number;
  originalArray: number[];
  isStepBack = false;
  isStepForward = false;

  constructor() {}

    async bubbleSort() {
      let animations = animateBubbleSort(this.currentArray);
      this.allNumberOfSwaps = animations.filter((array: any) => array[0] === "Swap").length;
      
      let arrayBars = document.getElementsByClassName('array-bar');
      for(let i = this.currentStep; i < animations.length; i++) {
        const [action,barOneIndex,barTwoIndex,barOneValue,barTwoValue] = animations[i];
        if(action === "HighLightOn") {
          let barOneStyle = <HTMLElement>arrayBars[barOneIndex];
          let barTwoStyle = <HTMLElement>arrayBars[barTwoIndex];
          
            await new Promise<void>( (resolve,reject)  => setTimeout(() => {
              barOneStyle.style.backgroundColor = this.SECONDARY_COLOR;
              barTwoStyle.style.backgroundColor = this.SECONDARY_COLOR;
              resolve();
            }, this.animationSpeedMs));
          
        } else if(action === "HighLightOff") {
          let barOneStyle = <HTMLElement>arrayBars[barOneIndex];
          let barTwoStyle = <HTMLElement>arrayBars[barTwoIndex];
          
            await new Promise<void>( resolve => setTimeout(() => {
            barOneStyle.style.backgroundColor = this.PRIMARY_COLOR;
            barTwoStyle.style.backgroundColor = this.PRIMARY_COLOR;
            resolve();
          }, this.animationSpeedMs));
        
        } else if(action === "Swap") {
          let barOneStyle = <HTMLElement>arrayBars[barOneIndex];
          let barTwoStyle = <HTMLElement>arrayBars[barTwoIndex];

          await new Promise<void>( resolve => setTimeout(() => {
            barOneStyle.style.backgroundColor = this.SECONDARY_COLOR;
            barTwoStyle.style.backgroundColor = this.SECONDARY_COLOR;
            resolve();
            
              barOneStyle.style.height = `${barOneValue * this.sizeMultiplier}px`;
              barTwoStyle.style.height = `${barTwoValue * this.sizeMultiplier}px`;
              if (this.currentArray.length < 34) {
                barOneStyle.children[0].innerHTML = barOneValue;
                barTwoStyle.children[0].innerHTML = barTwoValue;
              }
              this.numberOfSwaps++;
          
          }, this.animationSpeedMs));
        } else if (action === "Correct") {
          let barOneStyle = <HTMLElement>arrayBars[barOneIndex];
          let barTwoStyle = <HTMLElement>arrayBars[barTwoIndex];
          
          await new Promise<void>( resolve => setTimeout(() => {
          barOneStyle.style.backgroundColor = '#44BBA4';
          barTwoStyle.style.backgroundColor = '#44BBA4';
          resolve();
          }, this.animationSpeedMs));
        }
        if(this.isPaused) {
          break; 
        }
        this.currentStep++;
      }
    }

    async selectionSort() {
      let animations = animateSelectionSort(this.currentArray);
      let arrayBars = document.getElementsByClassName('array-bar');
      
      this.allNumberOfSwaps = animations.filter((array: any) => array[0] === "Swap").length;
      for (let i = this.currentStep; i < animations.length; i++) {


        const element  =  animations[i];
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
            [ barOneStyle.children[0].innerHTML, barTwoStyle.children[0].innerHTML ] = [ barTwoStyle.children[0].innerHTML, barOneStyle.children[0].innerHTML ]
          } 
    
          barOneStyle.style.backgroundColor = this.PRIMARY_COLOR;
          barTwoStyle.style.backgroundColor = this.PRIMARY_COLOR;
          this.numberOfSwaps++;
        }
        if(this.isPaused) {
          break; 
        }
        this.currentStep++;
      }
    }
    
  async mergeSort(){
    const arrayBars = document.getElementsByClassName('array-bar');
    let animations = getMergeSortAnimations(this.currentArray);
    this.allNumberOfSwaps = animations.length / 3;
    for (let i = this.currentStep; i < animations.length; i++) {
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = <HTMLElement>arrayBars[barOneIdx];
        const barTwoStyle = <HTMLElement>arrayBars[barTwoIdx];
        const color = i % 3 === 0 ? this.SECONDARY_COLOR : this.PRIMARY_COLOR;
        await new Promise<void>((resolve,reject)  => setTimeout(() => {
          barOneStyle.style.backgroundColor = color;
          barTwoStyle.style.backgroundColor = color;
          resolve();
        }, this.animationSpeedMs));
      } else {
        await new Promise<void>((resolve,reject)  => setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = <HTMLElement>arrayBars[barOneIdx];
          barOneStyle.style.height = `${newHeight * this.sizeMultiplier}px`;
          if (this.currentArray.length < 34) {
            barOneStyle.children[0].innerHTML = newHeight;
          }
          this.numberOfSwaps++;
          resolve();
        }, this.animationSpeedMs));
      }
      if(this.isPaused) {
        break; 
      }
      this.currentStep++;
    }
   }


   async quickSort() {
    let arrayBars = document.getElementsByClassName('array-bar');
    let animations = getAnimationsForQuickSort(this.currentArray);
    this.allNumberOfSwaps = animations.filter((array: any) => array[0] === "Swap").length;
    for(let i = this.currentStep; i< animations.length; i++) {
      let check = animations[i][0];
      if(check === "PivotOn") {
        let pivotBar = animations[i][1];
        const barPivotStyle = <HTMLElement>arrayBars[pivotBar];

        await new Promise<void>( (resolve,reject)  => setTimeout(() => {
         barPivotStyle.style.backgroundColor = 'red';
         resolve();
        }, this.animationSpeedMs));
        
      }
      else if(check === "HighLightOn") {
        const [barOneIdx,barTwoIdx] = animations[i].slice(1);
        const barOneStyle = <HTMLElement>arrayBars[barOneIdx];
        const barTwoStyle = <HTMLElement>arrayBars[barTwoIdx];

        await new Promise<void>( (resolve,reject)  => setTimeout(() => {
          barOneStyle.style.backgroundColor = this.SECONDARY_COLOR;
          barTwoStyle.style.backgroundColor = this.SECONDARY_COLOR;
          resolve();
        }, this.animationSpeedMs));
      }
      else if(check === "HighLightOff") {
        const [barOneIdx,barTwoIdx] = animations[i].slice(1);
        const barOneStyle = <HTMLElement>arrayBars[barOneIdx];
        const barTwoStyle = <HTMLElement>arrayBars[barTwoIdx];

        await new Promise<void>( (resolve,reject)  => setTimeout(() => {
          barOneStyle.style.backgroundColor = this.PRIMARY_COLOR;
          barTwoStyle.style.backgroundColor = this.PRIMARY_COLOR;
          resolve();
        }, this.animationSpeedMs));
      }
      else if(check === "PivotOff") {
        let pivotBar = animations[i][1];
        const barPivotStyle = <HTMLElement>arrayBars[pivotBar];
        await new Promise<void>( (resolve,reject)  => setTimeout(() => {
         barPivotStyle.style.backgroundColor = this.PRIMARY_COLOR;
         resolve();
        }, this.animationSpeedMs));
      }
      else if(check === "Swap") {
        const [barIndexOne,barValueOne,barIndexTwo,barValueTwo] = animations[i].slice(1);
        const barOneStyle = <HTMLElement>arrayBars[barIndexOne];
        const barTwoStyle = <HTMLElement>arrayBars[barIndexTwo];
        await new Promise<void>((resolve,reject)  => setTimeout(() => {
          this.numberOfSwaps++;
          if (this.currentArray.length < 34) {
            barOneStyle.children[0].innerHTML = barValueOne;
            barTwoStyle.children[0].innerHTML = barValueTwo;
          }
          barOneStyle.style.height = `${barValueOne * this.sizeMultiplier}px`;
          barTwoStyle.style.height = `${barValueTwo * this.sizeMultiplier}px`;
        resolve();
        }, this.animationSpeedMs));
      }
      if(this.isPaused) {
        break; 
      }
      this.currentStep++;
    }
   }

  selectAlgorithm(algorithm: string): void {
    this.selectedAlgorithm.next(algorithm);
    this.currentArray = generateArray(this.currentArray.length);
    this.setSizeMultiplier(Math.max(...this.currentArray));
    this.resetCanvas();
  }

  onArraySizeChange(size: number): void {
    this.currentArray = generateArray(size);
    this.setSizeMultiplier(Math.max(...this.currentArray));
    this.resetCanvas();
  }

  onArrayChange(array: number[]): void {
    this.originalArray = array;
    this.currentArray = array;
    this.setSizeMultiplier(Math.max(...this.currentArray));
    this.resetCanvas();
  }

  setSizeMultiplier(max:number):void {
    this.sizeMultiplier = this.CANVAS_SIZE / max;
  }

  resetCanvas(): void {
    let highestTimeoutId = setTimeout(";");
    for (let i = 0 ; i < highestTimeoutId ; i++) {
        clearTimeout(i); 
    }
    this.currentStep = 0;
    this.numberOfSwaps = 0;
    this.allNumberOfSwaps = 0;
    this.isPaused = false;
  }

  onArraySort(): void {
    this.onArrayChange(this.originalArray);
    this.allNumberOfSwaps = 0;
    this.numberOfSwaps = 0;
    this.currentStep = 0;
    switch (this.selectedAlgorithm.getValue()) {
      case 'Bubble Sort':
        this.bubbleSort();
        break; 
      case 'Quick Sort':
        this.quickSort();
        break;
      case 'Merge Sort':
        this.mergeSort();
        break;
      case 'Selection Sort':
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
      switch (this.selectedAlgorithm.getValue()) {
        case 'Bubble Sort':
          this.bubbleSort();
          break; 
        case 'Quick Sort':
          this.quickSort();
          break;
        case 'Merge Sort':
          this.mergeSort();
          break;
        case 'Selection Sort':
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

  stepBack(): void {
    if (this.currentStep === 0) {
      return;
    }
    this.currentStep -= 2;
    this.isStepBack = true;
   switch (this.selectedAlgorithm.getValue()) {
    case 'Bubble Sort':
      this.bubbleSort();
      break;
    case 'Quick Sort':
      this.quickSort();
      break;
    case 'Merge Sort':
      this.mergeSort();
      break;
    case 'Selection Sort':
      this.selectionSort();
      break;
    default:
      this.bubbleSort();
      break;
   }
  }

  stepForward(): void {
    if (this.currentStep === this.numberOfSwaps) {
      return;
    }
    this.currentStep += 1;

   switch (this.selectedAlgorithm.getValue()) {
    case 'Bubble Sort':
      this.bubbleSort();
      break;
    case 'Quick Sort':
      this.quickSort();
      break;
    case 'Merge Sort':
      this.mergeSort();
      break;
    case 'Selection Sort':
      this.selectionSort();
      break;
    default:
      this.bubbleSort();
      break;
   }
  }

}
