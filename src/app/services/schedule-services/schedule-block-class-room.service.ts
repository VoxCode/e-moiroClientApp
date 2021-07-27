import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { ScheduleBlockClassRoom } from '../../models/schedule-models/ScheduleBlockClassRoom';
import { environment } from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable()
export class ScheduleBlockClassRoomService {
  public url = environment.apiUrl + 'api/ScheduleBlockClassRooms';
  constructor(private http: HttpClient) { }

  getValues(): Observable<any> {
    return this.http.get(this.url);
  }

  getValue(id: number): Observable<any> {
    return this.http.get(this.url + '/' + id);
  }

  getValuesFromClassRoom(scheduleBlockId: number): Observable<any> {
    return this.http.get(this.url + '/FromScheduleBlock/' + scheduleBlockId);
  }

  updateSerialNumbers(scheduleBlockClassRooms: ScheduleBlockClassRoom[]): Observable<any> {
    return this.http.put(this.url + '/SerialNumbers', scheduleBlockClassRooms);
  }

  createValue(scheduleBlockClassRoom: ScheduleBlockClassRoom): Observable<any> {
    return this.http.post(this.url, scheduleBlockClassRoom);
  }

  updateValue(scheduleBlockClassRoom: ScheduleBlockClassRoom): Observable<any> {
    return this.http.put(this.url, scheduleBlockClassRoom);
  }

  deleteValue(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }
}
