import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ObservableService } from 'src/app/common/services/observable.service';
import { animateBubbleSort } from './bubble-sort-animation';

@Component({
  selector: 'bubble-sort',
  templateUrl: './bubble-sort.component.html',
  styleUrls: ['./bubble-sort.component.scss']
})
export class BubbleSortComponent {

  NUMBER_OF_ARRAY_BARS = 50;
  currentArray:any = [];
  PRIMARY_COLOR = '#0080FF';
  SECONDARY_COLOR = 'red';
  animationSpeedMs = 10;
  pivotColor = "green";
  numberOfSwaps = 0;
  selectedAlgorithm = "";
  clickEventSubscription: Subscription;
  isPaused = false;
  currentStep = 0;
  allNumberOfSwaps:number;

 constructor(private observableService:ObservableService) {
   this.resetArray();
   this.clickEventSubscription = this.observableService.getClickEvent().subscribe((shortType)=>{
     this.numberOfSwaps = 0;
     switch(shortType){
       case "re-define":{
         this.resetArray();
         break;
       }
       case "bubble":{
         this.selectedAlgorithm = "BUBBLE SORT";
         this.playAnimatedSort();
         break;
       }
     }
   })

   this.observableService.getChangeInSize().subscribe((size)=>{
       this.NUMBER_OF_ARRAY_BARS = size;
       this.resetArray();
   });

  }

  resetArray(){
   const array = []
   for (let i = 0; i < this.NUMBER_OF_ARRAY_BARS; i++) {
     array.push(this.randomIntFromInterval(5, 500));
   }
   this.currentArray = array;
  }

  next(): void {
    this.currentStep++;
    let animations = animateBubbleSort(this.currentArray);
    let arrayBars = document.getElementsByClassName('array-bar');
    const [check,v1,v2,v3,v4] = animations[this.currentStep];
    if(check === "HighLightOn") {
      let barOneStyle = <HTMLElement>arrayBars[v1];
      let barTwoStyle = <HTMLElement>arrayBars[v2];

     
        barOneStyle.style.backgroundColor = this.SECONDARY_COLOR;
        barTwoStyle.style.backgroundColor = this.SECONDARY_COLOR;
      
    } else if(check === "HighLightOff") {
      let barOneStyle = <HTMLElement>arrayBars[v1];
      let barTwoStyle = <HTMLElement>arrayBars[v2];


        barOneStyle.style.backgroundColor = this.PRIMARY_COLOR;
        barTwoStyle.style.backgroundColor = this.PRIMARY_COLOR;
      
    } else if(check === "Swap") {
      let barOneStyle = <HTMLElement>arrayBars[v1];
      let barTwoStyle = <HTMLElement>arrayBars[v3];

      
        barOneStyle.style.height = `${v2}px`;
        barTwoStyle.style.height = `${v4}px`;
        this.numberOfSwaps++;
      
    }
  }

  back(): void {
    this.currentStep--;
    let animations = animateBubbleSort(this.currentArray);
    let arrayBars = document.getElementsByClassName('array-bar');
    const [check,v1,v2,v3,v4] = animations[this.currentStep];
    if(check === "HighLightOff") {
      let barOneStyle = <HTMLElement>arrayBars[v1];
      let barTwoStyle = <HTMLElement>arrayBars[v2];
    
      barOneStyle.style.backgroundColor = this.SECONDARY_COLOR;
      barTwoStyle.style.backgroundColor = this.SECONDARY_COLOR;
      
    } else if(check === "HighLightOn") {
      let barOneStyle = <HTMLElement>arrayBars[v1];
      let barTwoStyle = <HTMLElement>arrayBars[v2];

      barOneStyle.style.backgroundColor = this.PRIMARY_COLOR;
      barTwoStyle.style.backgroundColor = this.PRIMARY_COLOR;
    
    } else if(check === "Swap") {
      let barOneStyle = <HTMLElement>arrayBars[v1];
      let barTwoStyle = <HTMLElement>arrayBars[v3];

      barOneStyle.style.height = `${v4}px`;
      barTwoStyle.style.height = `${v2}px`;
      this.numberOfSwaps--;
      
    }
  }

  pause(): void {
    this.isPaused = !this.isPaused;
    if (this.isPaused) {
      this.playAnimatedSort();
      console.log('play')
    }
  }

  delay = (ms: number): Promise<void> => new Promise(res => setTimeout(res, ms));
  
  async playAnimatedSort() {
     let animations = animateBubbleSort(this.currentArray);
     this.allNumberOfSwaps = animations.length / 3;
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
          }, i * this.animationSpeedMs);
          //await this.delay(i *this.animationSpeedMs);
       }
       await this.delay(i *this.animationSpeedMs);
     }
  }

  displayCurrentSort() {
    let animations = animateBubbleSort(this.currentArray);
    let arrayBars = document.getElementsByClassName('array-bar');
    const [check,v1,v2,v3,v4] = animations[this.currentStep];
    if(check === "HighLightOn") {
      let barOneStyle = <HTMLElement>arrayBars[v1];
      let barTwoStyle = <HTMLElement>arrayBars[v2];

     
        barOneStyle.style.backgroundColor = this.SECONDARY_COLOR;
        barTwoStyle.style.backgroundColor = this.SECONDARY_COLOR;
      
    } else if(check === "HighLightOff") {
      let barOneStyle = <HTMLElement>arrayBars[v1];
      let barTwoStyle = <HTMLElement>arrayBars[v2];


        barOneStyle.style.backgroundColor = this.PRIMARY_COLOR;
        barTwoStyle.style.backgroundColor = this.PRIMARY_COLOR;
      
    } else if(check === "Swap") {
      let barOneStyle = <HTMLElement>arrayBars[v1];
      let barTwoStyle = <HTMLElement>arrayBars[v3];

      
        barOneStyle.style.height = `${v2}px`;
        barTwoStyle.style.height = `${v4}px`;
        this.numberOfSwaps++;
      
    }
  }

 randomIntFromInterval(min:any,max:any) {
   return Math.floor(Math.random() * (max - min + 1) + min);
 }


 onSpeedChange(speed: string) {
  console.log(speed);
  this.animationSpeedMs = parseInt(speed);
 }
}
