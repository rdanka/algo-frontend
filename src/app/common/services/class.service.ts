import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../enviroment';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor(private readonly http: HttpClient) { }

  createClass(params: any) {

  const headers= new HttpHeaders()
                .set('content-type', 'application/json')
                .set('Authorization', `${localStorage.getItem('id_token')}`);

    return this.http.post<any>(`${environment.baseUrl}/users/addClass`, params, { headers });
  }

  deleteClass() {}
}
