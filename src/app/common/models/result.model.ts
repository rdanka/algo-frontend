import { SortingAlgorithm } from "./sorting-algorithms.model";

export interface Result {
    studentId: string,
    algorithmName:  SortingAlgorithm,
    result: number
}