import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnumService {

  private apiUrl = 'http://localhost:8080/enums';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<EnumsResponse<string, Set<string>>> {
    return this.http.get<EnumsResponse<string, Set<string>>>(this.apiUrl);
  }

  getAllEnumsNameInCamelCase(): Observable<Set<string>> {
    return this.http.get<Set<string>>(this.apiUrl + '/convertNames');
  }
}

interface EnumsResponse<K, V> {
  [key: string]: Set<string>;
}


