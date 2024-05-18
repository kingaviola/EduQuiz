import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistrationModel } from '../models/registration.model';
import { LoginModel } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private apiUrl = "https://localhost:7140/Account";

  constructor(private http: HttpClient) { }

  register(data: RegistrationModel): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, data, {
      withCredentials: true
    });
  }

  login(data: LoginModel): Observable<number> {
    return this.http.post<any>(`${this.apiUrl}/login`, data, {
      withCredentials: true
    });
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}, {
      withCredentials: true
    });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('MyAuthCookie');
  }
}
