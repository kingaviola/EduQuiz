import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { GroupCard } from '../models/qroup-card.model';
import { map } from 'rxjs/operators';
import { Group } from '../models/group.model';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private apiUrl = "https://localhost:7140/api/Groups";
  private groupsChangesSubject = new Subject<void>();
  groupsChanged$ = this.groupsChangesSubject.asObservable();

  constructor(private http: HttpClient) { }

  notifyGroupsChange(): void {
    this.groupsChangesSubject.next();
  }

  getCreatedGroups(userId: number): Observable<GroupCard[]> {
    return this.http.get<GroupCard[]>(`${this.apiUrl}/created/${userId}`).pipe(
      map((data: any[]) => this.mapGroupCards(data))
    );
  }

  getJoinedGroups(userId: number): Observable<GroupCard[]> {
    return this.http.get<GroupCard[]>(`${this.apiUrl}/joined/${userId}`).pipe(
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

  joinGroup(code: string, userId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/join/${code}/user/${userId}`, {});
  }

  createGroup(newGroup: Group): Observable<void> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<void>(this.apiUrl, JSON.stringify(newGroup), {headers: headers});
  }

  getGroupById(groupId: number){
    return this.http.get<any>(`${this.apiUrl}/${groupId}`).pipe(
      map(resp => resp.value),
      map((data: any) => this.mapGroupData(data))
    );
  }

  private mapGroupData(data: any): Group {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      memberIds: data.memberIds,
      creatorId: data.creatorId,
      creatorName: data.creatorName,
      joinCode: data.joinCode,
      sharedQuizIds: data.sharedQuizIds
    } as Group
  }
}
