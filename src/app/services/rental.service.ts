import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  private apiUrl = 'http://localhost:5000/rentals';

  constructor(private http: HttpClient) {
  }

  public createRent(carId: number, rentalsValue): Observable<any> {
    return this.http.post(`${this.apiUrl}/${carId}`, rentalsValue);
  }
}
