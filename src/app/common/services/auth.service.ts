import { Injectable } from '@angular/core';
import { environment } from '../../../enviroment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { RegisterResponse } from '../models/register-response.model';
import { AuthenticateResponse } from '../models/authenticate-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private readonly http: HttpClient) { 
    if (localStorage.getItem('user')) {
      this.loggedIn.next(true);
    } else {
      this.loggedIn.next(false);
    }
  }


    
  

  public register(user: User): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${environment.baseUrl}/users/register`, user);
  }

  public authenticate(user: User): Observable<AuthenticateResponse> {
    return this.http.post<AuthenticateResponse>(`${environment.baseUrl}/users/login`, user).pipe(
      finalize(()=> {this.loggedIn.next(true);console.log('asd')})
    );
  }

  public logout(): void {
    localStorage.clear();
    this.loggedIn.next(false);
  }

  public storeUserData(accessToken: string, user: User): void {
    localStorage.setItem('id_token', accessToken);
    localStorage.setItem('user', JSON.stringify(user));
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }
}
