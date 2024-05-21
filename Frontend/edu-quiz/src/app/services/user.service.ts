import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserBasicData } from '../models/user-basic-data.model';
import { map } from 'rxjs/operators';
import { UserProfile } from '../models/user-profile.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = "https://localhost:7140/api/Users";

  constructor(private http:HttpClient) { }

  getUsersByPrefix(prefix: string): Observable<UserBasicData[]> {
    return this.http.get<UserBasicData[]>(`${this.apiUrl}?prefix=${prefix}`).pipe(
      map((data: any[]) => this.mapUserBasicData(data))
    )
  }


  getGroupUsers(groupId: number): Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>(`${this.apiUrl}/group/${groupId}`);
  }

  mapUserBasicData(data: any[]): UserBasicData[] {
    return data.map((attr: any) => ({
      id: attr.Id,
      userName: attr.UserName,
      name: attr.Name
    } as UserBasicData));
  }
}
