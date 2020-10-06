import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/users';
  private httpOptions = {
    headers: new HttpHeaders({'Content-type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  login(credentials): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, {
      email: credentials.email,
      password: credentials.password
    }, this.httpOptions);
  }

  register(user): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/registration`, {
      firstName: user.firstName,
      lastName: user.lastName,
      password: user.password,
      email: user.email,
      city: user.city,
      street: user.street,
      houseNumber: user.houseNumber,
      zipCode: user.zipCode
    }, this.httpOptions);
  }
}
