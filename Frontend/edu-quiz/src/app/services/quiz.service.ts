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

  createQuiz(newQuiz: QuizModel): Observable<QuizModel> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<QuizModel>(this.apiUrl, JSON.stringify(newQuiz), { headers: headers });
  }
}
