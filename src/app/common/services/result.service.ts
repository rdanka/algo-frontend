import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(private readonly http: HttpClient) { }

  getResultsByStudentId(studentId: string) {
    const headers= new HttpHeaders()
                .set('content-type', 'application/json')
                .set('Authorization', `${localStorage.getItem('id_token')}`);

    return this.http.get<any>(`${environment.baseUrl}/results/getByStudentId?studentId=${studentId}`, { headers });
  }

  getResultsByClassId(className: string) {
    const headers= new HttpHeaders()
                .set('content-type', 'application/json')
                .set('Authorization', `${localStorage.getItem('id_token')}`);

    return this.http.get<any>(`${environment.baseUrl}/results/getByClassId?className=${className}`, { headers });
  }

  addResult(params: any) {
    return this.http.post<any>(`${environment.baseUrl}/results/add`, params);
  }
}
