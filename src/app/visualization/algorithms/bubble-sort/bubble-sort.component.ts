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

  NUMBER_OF_ARRAY_BARS = 10;
  currentArray:any = [];
  PRIMARY_COLOR = '#0080FF';
  SECONDARY_COLOR = 'red';
  ANIMATION_SPEED_MS = 30;
  PIVOT_COLOR = "green";
  NUMBER_OF_SWAP = 0;
  SELECTED_ALGORITHM = "";
  clickEventSubscription: Subscription;
  isPaused = false;
  currentStep = 0;

 constructor(private observableService:ObservableService) {
   this.resetArray();
   this.clickEventSubscription = this.observableService.getClickEvent().subscribe((shortType)=>{
     this.NUMBER_OF_SWAP = 0;
     switch(shortType){
       case "re-define":{
         this.resetArray();
         break;
       }
       case "bubble":{
         this.SELECTED_ALGORITHM = "BUBBLE SORT";
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
     array.push(this.randomIntFromInterval(5, 50));
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
        this.NUMBER_OF_SWAP++;
      
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
      this.NUMBER_OF_SWAP--;
      
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
     let arrayBars = document.getElementsByClassName('array-bar');

     for(let i = this.currentStep; i < animations.length; i++) {
      
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
           barTwoStyle.style.backgroundColor = this.SECONDARY_COLOR;
          }, i * this.ANIMATION_SPEED_MS);
          await this.delay(i *this.ANIMATION_SPEED_MS);
       } else if(check === "HighLightOff") {
         let barOneStyle = <HTMLElement>arrayBars[v1];
         let barTwoStyle = <HTMLElement>arrayBars[v2];

         setTimeout(() => {
           barOneStyle.style.backgroundColor = this.PRIMARY_COLOR;
           barTwoStyle.style.backgroundColor = this.PRIMARY_COLOR;
          }, i * this.ANIMATION_SPEED_MS);
          await this.delay(i *this.ANIMATION_SPEED_MS);
       } else if(check === "Swap") {
         let barOneStyle = <HTMLElement>arrayBars[v1];
         let barTwoStyle = <HTMLElement>arrayBars[v3];

         setTimeout(() => {
           barOneStyle.style.height = `${v2}px`;
           barTwoStyle.style.height = `${v4}px`;
           this.NUMBER_OF_SWAP++;
          }, i * this.ANIMATION_SPEED_MS);
          await this.delay(i *this.ANIMATION_SPEED_MS);
       }
       
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
        this.NUMBER_OF_SWAP++;
      
    }
  }

 randomIntFromInterval(min:any,max:any) {
   return Math.floor(Math.random() * (max - min + 1) + min);
 }

}
