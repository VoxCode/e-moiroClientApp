import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { ScheduleDateScheduleBlock } from '../../models/schedule-models/ScheduleDateScheduleBlock';
import { environment } from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable()
export class ScheduleDateScheduleBlockService {
  public url = environment.apiUrl + 'api/ScheduleDateScheduleBlocks';
  constructor(private http: HttpClient) { }

  getValues(): Observable<any> {
    return this.http.get(this.url);
  }

  getValue(id: number): Observable<any> {
    return this.http.get(this.url + '/' + id);
  }

  getValuesFromTrainingProgram(scheduleDateId: number): Observable<any> {
    return this.http.get(this.url + '/FromScheduleDate/' + scheduleDateId);
  }

  updateSerialNumbers(scheduleDateScheduleBlocks: ScheduleDateScheduleBlock[]): Observable<any> {
    return this.http.put(this.url + '/SerialNumbers', scheduleDateScheduleBlocks);
  }

  createValue(scheduleDateScheduleBlock: ScheduleDateScheduleBlock): Observable<any> {
    return this.http.post(this.url, scheduleDateScheduleBlock);
  }

  updateValue(scheduleDateScheduleBlock: ScheduleDateScheduleBlock): Observable<any> {
    return this.http.put(this.url, scheduleDateScheduleBlock);
  }

  deleteValue(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }
}
