import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { QuizModel } from '../models/quiz.model';
import { QuizCard } from '../models/quiz-card.model';
import { map } from 'rxjs/operators';
import { Question, SimpleAnswer } from '../models/question.model';
import { ProcessImportedDataService } from './process-imported-data.service';
import { FilledQuiz } from '../models/filled-quiz.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  //maybe with "quizzes"
  private apiUrl = "https://localhost:7140/Quizzes";
  private quizDeletedSubject = new Subject<void>();
  quizDeleted$ = this.quizDeletedSubject.asObservable();

  constructor(private http: HttpClient, private processService: ProcessImportedDataService) { }

  createQuiz(newQuiz: QuizModel): Observable<number> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<number>(this.apiUrl, JSON.stringify(newQuiz), { headers: headers });
  }

  saveQuiz(updatedQuiz: QuizModel): Observable<QuizModel> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put<QuizModel>(this.apiUrl + `/${updatedQuiz.id}`, JSON.stringify(updatedQuiz), { headers: headers });
  }

  getQuizzesByUserId(userId: number): Observable<QuizCard[]> {
    return this.http.get<QuizCard[]>(`${this.apiUrl}?userId=${userId}`).pipe(
      map((data: any[]) => this.mapQuizCards(data))
    );
  }
  
  getQuizCardsByGroupId(groupId: number): Observable<QuizCard[]> {
    return this.http.get<QuizCard[]>(`${this.apiUrl}/group/${groupId}`).pipe(
      map((data: any[]) => this.mapQuizCards(data))
    );
  }
  
    private mapQuizCards(data: any[]): QuizCard[] {
      return data.map((attr:any) => ({
        id: attr.Id,
        name: attr.Name,
        description: attr.Description,
        creationDate: new Date(attr.CreationDate),
        deadline: attr.Deadline ? new Date(attr.Deadline) : null,
        creatorId: attr.CreatorId
      } as QuizCard));
    }
  
  deleteQuizbyId(quizId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${quizId}`);
  }

  notifyQuizDeleted(): void {
    this.quizDeletedSubject.next();
  }

  getQuizById(quizId: number): Observable<QuizModel> {
    return this.http.get<any>(`${this.apiUrl}/${quizId}`).pipe(
      map(resp => resp.value),
      map((data: any) => this.mapQuiz(data))
    );
  }

  private mapQuiz(data: any): QuizModel {
    const questions: Question[] = this.processService.mapJsonQuestions(data);

    return {
      id: data.id,
      userId: 0,
      name: data.name,
      description: data.description,
      creationDate: data.creationDate,
      questions: questions,
      settings: data.settings
    } as QuizModel
  }

  shareQuiz(quizId: number, groupId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/share/${quizId}/group/${groupId}`, {});
  }

  sendFilledQuiz(history: FilledQuiz): Observable<FilledQuiz> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<FilledQuiz>(`${this.apiUrl}/history`, JSON.stringify(history), { headers: headers });
  }

}
