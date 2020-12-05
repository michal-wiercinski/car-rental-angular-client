import {CarModel} from '../models/car-model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarModelService {
  private apiUrl = 'http://localhost:5000/carModel';
  private httpOptions = {
    headers: new HttpHeaders({
      'Accept': '  application/hal+json',
      'Content-Type': 'application/hal+json'
    })
  };

  constructor(private http: HttpClient) {
  }

  searchByName(param: string): Observable<CarModel[]> {
    if (param === '') {
      return of([]);
    }
    return this.http.get<CarModel[]>(this.apiUrl + `/search?param=${param}`);
    /*return this.http
      .get(WIKI_URL, {params: PARAMS.set('search', term)}).pipe(
        map(response => response[1])
      );*/
  }
}

/* getAllCars(): Observable<Car[]> {
   return this.http.get<Car[]>(this.apiUrl);
 }

 getAllCarsWithPagination(page: number, size: number): Observable<GetResponseCars> {

   return this.http.get<GetResponseCars>(this.apiUrl + `?page=${page}&size=${size}`);
 }

 getCar(id: number): Observable<Car> {
   return this.http.get<Car>(this.apiUrl + `/${id}`);
 }*/
