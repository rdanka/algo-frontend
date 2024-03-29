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
    animations.push([i, j]); // HighlightOn
    animations.push([i, j]); // Highlight off
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push([k, auxiliaryArray[j]]); 
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    animations.push([i, i]);
    animations.push([i, i]);
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    animations.push([j, j]);
    animations.push([j, j]);
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}
