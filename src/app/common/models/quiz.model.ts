import { Question } from "./question.model";

export interface Quiz {
    algorithm: string,
    questions: Question[],
}