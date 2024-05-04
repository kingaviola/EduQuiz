import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuizModel } from '../models/quiz.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  //maybe with "quizzes"
  private apiUrl = "https://localhost:7140/Quizzes"

  constructor(private http: HttpClient) { }

  createQuiz(newQuiz: QuizModel): Observable<number> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<number>(this.apiUrl, JSON.stringify(newQuiz), { headers: headers });
  }

  saveQuiz(updatedQuiz: QuizModel): Observable<QuizModel> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put<QuizModel>(this.apiUrl + `/${updatedQuiz.id}`, JSON.stringify(updatedQuiz), { headers: headers });
  }
}
