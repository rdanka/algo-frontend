let animations: any = [];

export function getAnimationsForQuickSort(array: number[]) {
  let newArray = array.slice();
   quickSort(0,newArray.length -1,newArray);
   let tempArray = animations.slice();
   animations = [];
   return tempArray;
}

function quickSort(low: number,high:number ,array: number[]) {
  if(low >=0 && high >= 0 && low < high) {
    // Make partition in which on left side all the smaller elemnts of partition and on the right hand side all the greater elements
    let p = partition(low,high,array);
    // Divinding the array with pivot taken as a partition
    quickSort(low,p,array);
    quickSort(p+1,high,array);
  }
  return array;
}

// Divides array into two partitions
function partition(low:number,high: number,unsortedArray: number[]) {
  let pivot = unsortedArray[low];
  animations.push(["PivotOn",low]);
  // Left index
  let i = low - 1;
  // Right index
  let j = high + 1;

  while(i < j) {
    // Move the left index to the right at least once and while the element at
    // the left index is less than the pivot
    do {
      i++;
      animations.push(["HighLightOn",i,i]);
      animations.push(["HighLightOff",i,i]);
      animations.push(["PivotOn",low]);

    } while(unsortedArray[i] < pivot);

    // Move the right index to the left at least once and while the element at
    // the right index is greater than the pivot
    do {
      j--;
      animations.push(["HighLightOn",j,j]);
      animations.push(["HighLightOff",j,j]);
      animations.push(["PivotOn",low]);
    } while(unsortedArray[j] > pivot);

    if(i < j) {
      swap(i,j,unsortedArray);
      animations.push(["HighLightOn",i,j]);
      animations.push(["Swap",i,unsortedArray[i],j,unsortedArray[j]]);
      animations.push(["HighLightOff",i,j]);
    }
  }

  swap(low,j,unsortedArray);
  animations.push(["Swap",low,unsortedArray[low],j,unsortedArray[j]]);
  animations.push(["PivotOff",low]);
  return j;
}

function swap(i: number,j: number, unsortedArray: number[]) {
  let temp = unsortedArray[i];
  unsortedArray[i] = unsortedArray[j];
  unsortedArray[j] = temp;
}
