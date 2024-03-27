import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  getData() :Observable<any> {
    return this.http.get<any>('http://localhost:8000/user');
  }
  getUserIdByName(userName:string) :Observable<any> {
    const url = `http://localhost:8000/user?userName=${userName}`;
    return this.http.get<any>(url);
  }
}
