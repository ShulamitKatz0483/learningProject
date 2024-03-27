import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentInLessonService {

  private apiUrl = 'http://localhost:8000'; 

  constructor(private http: HttpClient) { }

  addStudentToLesson(idLesson: number, idUser: number): Observable<any> {
    const url = `${this.apiUrl}/studentInLesson`;
    const data = { idLesson, idUser };

    return this.http.post<any>(url, data);
  }
}
