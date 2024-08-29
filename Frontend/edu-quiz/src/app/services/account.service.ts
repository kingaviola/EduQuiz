import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistrationModel } from '../models/registration.model';
import { LoginModel } from '../models/login.model';
import { UserProfile } from '../models/user-profile.model';
import { Image } from '../models/image.model'

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  isAuthenticated: boolean = false;

  private apiUrl = "https://localhost:7140/api/accounts";

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

  setUserLoggedInStatus(status: boolean) {
    this.isAuthenticated = status;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getUserProfileData(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.apiUrl}/profile`);
  }

  uploadImage(newImage: Image): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/profile/image`, newImage);
  }
}
