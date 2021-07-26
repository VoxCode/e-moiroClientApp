import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { ScheduleBlockClassTime } from '../../models/schedule-models/ScheduleBlockClassTime';
import { environment } from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable()
export class ScheduleBlockClassTimeService {
  public url = environment.apiUrl + 'api/ScheduleBlockClassTimes';
  constructor(private http: HttpClient) { }

  getValues(): Observable<any> {
    return this.http.get(this.url);
  }

  getValue(id: number): Observable<any> {
    return this.http.get(this.url + '/' + id);
  }

  getValuesFromTrainingProgram(scheduleBlockId: number): Observable<any> {
    return this.http.get(this.url + '/FromScheduleBlock/' + scheduleBlockId);
  }

  updateSerialNumbers(scheduleBlockClassTimes: ScheduleBlockClassTime[]): Observable<any> {
    return this.http.put(this.url + '/SerialNumbers', scheduleBlockClassTimes);
  }

  createValue(scheduleBlockClassTime: ScheduleBlockClassTime): Observable<any> {
    return this.http.post(this.url, scheduleBlockClassTime);
  }

  updateValue(scheduleBlockClassTime: ScheduleBlockClassTime): Observable<any> {
    return this.http.put(this.url, scheduleBlockClassTime);
  }

  deleteValue(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }
}
