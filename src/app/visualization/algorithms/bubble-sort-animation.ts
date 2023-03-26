let animations: any = [];

export function animateBubbleSort(array: any) {
  let tempArray = array.slice();
  bubbleSort(tempArray);
  let tempAnimations = animations.slice();
  animations = [];
  return tempAnimations;
}

function bubbleSort(array: any) {
  let arrayLength = array.length;
  for(let i = 0; i < arrayLength - 1; i++) {
    for(let j = 0; j < arrayLength - i - 1; j++) {
      animations.push(["HighLightOn",j,j+1]);
      if(array[j] > array[j+1]) {
        [array[j], array[j+1]] = [array[j+1], array[j]];
        animations.push(["Swap",j,array[j],j+1,array[j+1]]);
      } else {
        animations.push(["Correct",j,j+1]);
      }
      animations.push(["HighLightOff",j,j+1]);
    }
  }
}
