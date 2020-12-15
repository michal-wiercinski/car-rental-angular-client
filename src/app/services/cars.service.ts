import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Car} from '../models/car';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CarsService {
  private apiUrl = 'http://localhost:5000/cars';

  constructor(private http: HttpClient) {
  }

  getAllCars(page: number, size: number): Observable<GetResponseCars> {

    return this.http.get<GetResponseCars>(this.apiUrl + `?page=${page}&size=${size}`, {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
          Pragma: 'no-cache',
          Expires: '0'
        }
      }
    );
  }

  createCar(car: Car): Observable<Car> {
    return this.http.post<Car>(this.apiUrl, car);
  }

  getCar(id: number): Observable<Car> {
    return this.http.get<Car>(`${this.apiUrl}/${id}`);
  }

  updateCar(id: number, data): Observable<Car> {
    return this.http.put<Car>(`${this.apiUrl}/${id}`, data);
  }

  deleteCar(id: number): Observable<Car> {
    return this.http.delete<Car>(`${this.apiUrl}/${id}`);
  }

  changeAvailability(id: number, carStatus: string, car: Car): Observable<Car> {
    return this.http.patch<Car>(`${this.apiUrl}/make-availability/${id}/${carStatus}`, car);
  }

  findCars(urlParam: string): Observable<GetResponseCars> {
    return this.http.get<GetResponseCars>(`${this.apiUrl}/search?${urlParam}`);
  }
}

interface GetResponseCars {

  _embedded: {
    cars: Car[];
  };
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  };
}
