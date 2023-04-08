import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../enviroment';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor(private readonly http: HttpClient) { }

  createClass(params: any) {
    return this.http.post<any>(`${environment.baseUrl}/class/create`, params);
  }

  deleteClass() {}
}
