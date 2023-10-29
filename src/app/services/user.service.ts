// user.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  getUserDetails(userId: number | undefined): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}/details`);
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }

  updateUserData(userId: number | undefined, userData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers };

    const url = `${this.apiUrl}/${userId}`;

    return this.http.post(url, userData, options);
  }

  addFriend(userId: number): Observable<any> {
    const friendData = { friendId: userId, currentId: this.getCurrentUserId()};
    return this.http.post(`${this.apiUrl}/${this.getCurrentUserId()}/friends`, friendData);
  }

  removeFriend(userId: number): Observable<any> {
    const friendData = { friendId: userId, currentId: this.getCurrentUserId()};
    return this.http.post(`${this.apiUrl}/${this.getCurrentUserId()}/friends/${userId}`, friendData);
  }

  getCurrentUserId(): number {
    const savedUserIdString = localStorage.getItem('userId');
    return savedUserIdString ? +savedUserIdString : 0;
  }
  getUserNews(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${this.getCurrentUserId()}/news`);
  }

  publishNews(userId: number | undefined, content: string): Observable<any> {
    const newsData = { userId: userId, content: content };
    return this.http.post(`${this.apiUrl}/${userId}/publish`, newsData);
  }

}
