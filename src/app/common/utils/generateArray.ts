import { randomIntFromInterval } from "./randomIntFromInterval";

export function generateArray(arraySize: number): number[] {
    const array = []
    for (let i = 0; i < arraySize; i++) {
        array.push(randomIntFromInterval(5, 500));
    }
    console.log('Array generated: ', array);
    return array;
}