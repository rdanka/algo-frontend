import { Injectable } from '@angular/core';
import { environment } from '../../../enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly http: HttpClient) { }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    return true;
  }

  public login(): void {
    // Login logic here
  }

  public logout(): void {
    // Logout logic here
  }

  public register(user: User): Observable<{success: boolean, msg: string}> {
    return this.http.post<{success: boolean, msg: string}>(`${environment.baseUrl}/users/register`, user);
  }
}
