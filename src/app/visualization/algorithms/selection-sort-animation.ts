let animations: any = [];

export function animateSelectionSort(array: any) {
  let tempArray = array.slice();
  selectionSort(tempArray);
  let tempAnimations = animations.slice();
  animations = [];
  return tempAnimations;
}

function selectionSort(array: any) {
  let arrayLength = array.length;
  for(let i = 0; i < arrayLength - 1; i++) {
    let minIndex = i;
    for(let j = i + 1; j < arrayLength; j++) {
      animations.push(["Comparison", j, minIndex]);
      if(array[j] < array[minIndex]) {
        minIndex = j;
      }
    }
    animations.push(["Swap", i, minIndex]);
    [array[i], array[minIndex]] = [array[minIndex], array[i]];
  }
}