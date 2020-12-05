import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {CarModel} from '../models/car-model';
import {CarLocation} from '../models/car-location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apiUrl = 'http://localhost:5000/location';
  private httpOptions = {
    headers: new HttpHeaders({
      'Accept': '  application/hal+json',
      'Content-Type': 'application/hal+json'
    })
  };

  constructor(private http: HttpClient) {
  }

  searchByParam(param: string): Observable<CarLocation[]> {
    if (param === '') {
      return of([]);
    }
    return this.http.get<CarLocation[]>(this.apiUrl + `/search?param=${param}`);
  }
}
