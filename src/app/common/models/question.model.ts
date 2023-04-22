import { SortingAlgorithm } from "./sorting-algorithms.model";

export interface Question {
    algorithm: SortingAlgorithm,
    array: number[],
    question: string,
    options: string[],
    answer: string
}