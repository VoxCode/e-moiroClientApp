import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Expert} from '../models/Expert';
import {Observable} from 'rxjs';

@Injectable()
export class ExpertService {
  public url = environment.apiUrl + 'api/experts';
  constructor(private http: HttpClient) { }

  getValues(): Observable<any> {
    return this.http.get(this.url);
  }

  getValue(id: number): Observable<any> {
    return this.http.get(this.url + '/' + id);
  }

  createValue(expert: Expert): Observable<any> {
    return this.http.post(this.url, expert);
  }

  updateValue(expert: Expert): Observable<any> {
    return this.http.put(this.url, expert);
  }

  deleteValue(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }
}
