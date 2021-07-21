import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {ScheduleDate} from '../../models/schedule-models/ScheduleDate';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';



@Injectable()
export class ScheduleDateService {
  public url = environment.apiUrl + 'api/ScheduleDate';
  constructor(private http: HttpClient) { }

  getValues(): Observable<any> {
    return this.http.get(this.url);
  }

  getValue(id: number): Observable<any> {
    return this.http.get(this.url + '/' + id);
  }

  createValue(scheduleDate: ScheduleDate): Observable<any> {
    return this.http.post(this.url, scheduleDate);
  }

  updateValue(scheduleDate: ScheduleDate): Observable<any> {
    return this.http.put(this.url, scheduleDate);
  }

  deleteValue(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }
}
