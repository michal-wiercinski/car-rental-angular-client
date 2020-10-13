import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {Car} from '../models/car';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/users';
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  getUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/get-user`);
  }

  updateUser(id: number, data): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, data);
  }

  sendPasswordResetToken(email: string) {
    return this.http.post(`${this.apiUrl}/reset-password`, email);
  }

  changePasswordByToken(token: string, data) {
    return this.http.patch(`${this.apiUrl}/change-password/${token}`, data);
  }

  updatePassword(data) {
    return this.http.patch(`${this.apiUrl}/update-password/`, data);
  }
}
