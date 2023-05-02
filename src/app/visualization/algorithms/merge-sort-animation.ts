export function getMergeSortAnimations(array: any) {
    const animations: any = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    let copyOfArray = array.slice();
    mergeSortHelper(copyOfArray, 0, copyOfArray.length - 1, auxiliaryArray, animations);
    return animations;
}
  
function mergeSortHelper(mainArray: number[], startIdx: number, endIdx: number, auxiliaryArray: number[], animations: any ) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}
  
function doMerge(mainArray: number[], startIdx:number, middleIdx:number, endIdx:number, auxiliaryArray:number[], animations:any) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push("HighLightOn",i,j);
      //animations.push([i, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push("HighLightOff",i,j);
      //animations.push([i, j]);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        //animations.push([k, auxiliaryArray[i]]);
        animations.push("Swap",k,auxiliaryArray[i]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        //animations.push([k, auxiliaryArray[j]]);
        animations.push("Swap",k,auxiliaryArray[j]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
     // animations.push([i, i]);
      animations.push("HighLightOn",i,i);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
     // animations.push([i, i]);
      animations.push("HighLightOff",i,i);
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      //animations.push([k, auxiliaryArray[i]]);
      animations.push("Swap",k,auxiliaryArray[i]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      //animations.push([j, j]);
      animations.push("HighLightOn",j,j);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      //animations.push([j, j]);
      animations.push("HighLightOff",j,j);
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      //animations.push([k, auxiliaryArray[j]]);
      animations.push("Swap",k,auxiliaryArray[j]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }