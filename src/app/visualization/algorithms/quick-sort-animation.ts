let animations: any = [];

export function getAnimationsForQuickSort(array: number[]) {
  let newArray = array.slice();
   quickSort(0,newArray.length,newArray);
   let tempArray = animations.slice();
   animations = [];
   return tempArray;
}

function quickSort(low: number,high:number ,array: number[]) {
  if(low < high) {
    // Make partition in which on left side all the smaller elemnts of partition and on the right hand side all the greater elements
    let j = partition(low,high,array);
    // Divinding the array with pivot taken as a partition
    quickSort(low,j,array);
    quickSort(j+1,high,array);
  }
  return array;
}

function partition(low:number,high: number,unsortedArray: number[]) {
  let pivot = unsortedArray[low];
  animations.push(["PivotOn",low]);
  let i = low;
  let j = high;

  while(i < j) {
    do {
      i++;
    } while(unsortedArray[i] <= pivot);

    do {
      j--;
    } while(unsortedArray[j] > pivot);

    if(i < j) {
      swap(i,j,unsortedArray);
    }

  }

  swap(low,j,unsortedArray);
  animations.push(["HighLightOn",low,j]);
  animations.push(["Swap",low,unsortedArray[low],j,unsortedArray[j]]);
  animations.push(["HighLightOff",low,j]);
  animations.push(["PivotOff",low]);
  return j;
}

function swap(i: number,j: number, unsortedArray: number[]) {
  let temp = unsortedArray[i];
  unsortedArray[i] = unsortedArray[j];
  unsortedArray[j] = temp;
}
