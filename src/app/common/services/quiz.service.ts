import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../enviroment';
import { Quiz } from '../models/quiz.model';
import { Observable } from 'rxjs';
import { Question } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private readonly http: HttpClient) { }

  getQuizByAlgorithm(algorithm: string): Observable<Quiz> {
    return this.http.get<Quiz>(`${environment.baseUrl}/quiz/getQuizByAlgorithm?algorithm=${algorithm}`);
  }

  addQuestion(params: Question): Observable<void> {
    return this.http.post<void>(`${environment.baseUrl}/quiz/addQuestion`, params);
  }
}
