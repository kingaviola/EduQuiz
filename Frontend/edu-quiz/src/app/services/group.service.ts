import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GroupCard } from '../models/qroup-card.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private apiUrl = "https://localhost:7140/Groups";

  constructor(private http: HttpClient) { }

  getCreatedGroups(userId: number): Observable<GroupCard[]> {
    return this.http.get<GroupCard[]>(`${this.apiUrl}/created-by/${userId}`).pipe(
      map((data: any[]) => this.mapGroupCards(data))
    );
  }

  getJoinedGroups(userId: number): Observable<GroupCard[]> {
    return this.http.get<GroupCard[]>(`${this.apiUrl}/joined-by/${userId}`).pipe(
      map((data: any[]) => this.mapGroupCards(data))
    );
  }

  private mapGroupCards(data: any[]): GroupCard[] {
    return data.map((attr: any) => ({
      id: attr.Id,
      name: attr.Name,
      membersNum: attr.MembersNum,
      desc: attr.Description,
      creatorId: attr.CreatorId,
      creatorName: attr.CreatorName,
      joinCode: attr.JoinCode
    } as GroupCard));
  }
}
