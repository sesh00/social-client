import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const body = new URLSearchParams();
    body.set('email', email);
    body.set('password', password);

    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
    };

    return this.http.post(`${this.apiUrl}/login`, body.toString(), options);
  }

  register(name: string, info: string, birthdate: string, email: string, password: string): Observable<any> {
    const body = new URLSearchParams();
    body.set('name', name);
    body.set('info', info);
    body.set('birthdate', birthdate);
    body.set('email', email);
    body.set('password', password);



    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
    };

    return this.http.post(`${this.apiUrl}/register`, body.toString(), options);
  }
}
