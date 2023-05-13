import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { environment } from 'src/enviroment.prod';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private readonly http: HttpClient) {  }

  public isStudentRegistered(neptunId: string): Observable<boolean> {
    return this.http.post<any>(`${environment.baseUrl}/students/login`, {neptunId}).pipe(
      map((res) => res.success)
    );
  }
}
