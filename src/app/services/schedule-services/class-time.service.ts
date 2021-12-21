import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {ClassTime} from "../../models/schedule-models/СlassTime";


@Injectable()
export class ClassTimeService {
  public url = environment.apiUrl + 'api/ClassTimes';
  constructor(private http: HttpClient) { }

  getValues(): Observable<any> {
    return this.http.get(this.url);
  }

  getValue(id: number): Observable<any> {
    return this.http.get(this.url + '/' + id);
  }

  createValue(classTime: ClassTime): Observable<any> {
    return this.http.post(this.url, classTime);
  }

  updateValue(classTime: ClassTime): Observable<any> {
    return this.http.put(this.url, classTime);
  }

  deleteValue(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }
}
