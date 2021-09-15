import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {ScheduleBlockTeacher} from '../../models/schedule-models/ScheduleBlockTeacher';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';



@Injectable()
export class ScheduleBlockTeacherService {
  public url = environment.apiUrl + 'api/ScheduleBlockTeachers';
  constructor(private http: HttpClient) { }

  getValues(): Observable<any> {
    return this.http.get(this.url);
  }

  getValue(id: number): Observable<any> {
    return this.http.get(this.url + '/' + id);
  }

  getValuesFromScheduleBlock(scheduleBlockId: number): Observable<any> {
    return this.http.get(this.url + '/FromScheduleBlock/' + scheduleBlockId);
  }

  updateSerialNumbers(scheduleBlockTeachers: ScheduleBlockTeacher[]): Observable<any> {
    return this.http.put(this.url + '/SerialNumbers', scheduleBlockTeachers);
  }

  createValue(scheduleBlockTeacher: ScheduleBlockTeacher): Observable<any> {
    return this.http.post(this.url, scheduleBlockTeacher);
  }

  updateValue(scheduleBlockTeacher: ScheduleBlockTeacher): Observable<any> {
    return this.http.put(this.url, scheduleBlockTeacher);
  }

  deleteValue(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }
}
