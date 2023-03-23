import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ObservableService } from 'src/app/common/services/observable.service';
import { animateBubbleSort } from './bubble-sort-animation';

@Component({
  selector: 'bubble-sort',
  templateUrl: './bubble-sort.component.html',
  styleUrls: ['./bubble-sort.component.scss']
})
export class BubbleSortComponent {

  NUMBER_OF_ARRAY_BARS = 20;
  PRIMARY_COLOR = '#0080FF';
  SECONDARY_COLOR = 'red';
  animationSpeedMs = 10;
  pivotColor = "green";
  numberOfSwaps = 0;
  selectedAlgorithm = "";
  isPaused = false;
  currentStep = 0;
  allNumberOfSwaps:number;

  @Input() currentArray: number[];
  @Input() arraySize: number;
  @Output() totalSwaps = new EventEmitter<number>();
  @Output() currentnumberOfSwaps = new EventEmitter<number>();

 constructor(private observableService:ObservableService) { }

  delay = (ms: number): Promise<void> => new Promise(res => setTimeout(res, ms));
  
  async playAnimatedSort() {
     let animations = animateBubbleSort(this.currentArray);
     this.allNumberOfSwaps = animations.length / 3;
     this.totalSwaps.emit(this.allNumberOfSwaps);
     let arrayBars = document.getElementsByClassName('array-bar');
     for(let i = this.currentStep; i < animations.length; i++) {
       console.log(this.animationSpeedMs)
       if(this.isPaused) {
        console.log('pause')
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
          this.currentnumberOfSwaps.emit(this.numberOfSwaps);
          }, i * this.animationSpeedMs);
          //await this.delay(i *this.animationSpeedMs);
       }
       await this.delay(this.animationSpeedMs);
     }
  }
}
