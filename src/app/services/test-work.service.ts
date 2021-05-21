import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { TestWork } from '../models/TestWork';
import { environment } from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable()
export class TestWorkService {
  public url = environment.apiUrl + 'api/TestWorks';
  constructor(private http: HttpClient) { }

  getValues(): Observable<any> {
    return this.http.get(this.url);
  }

  getValue(id: number): Observable<any> {
    return this.http.get(this.url + '/' + id);
  }

  createValue(testWork: TestWork): Observable<any> {
    return this.http.post(this.url, testWork);
  }

  updateValue(testWork: TestWork): Observable<any> {
    return this.http.put(this.url, testWork);
  }

  deleteValue(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }
}
