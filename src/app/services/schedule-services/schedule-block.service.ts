import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ScheduleBlock} from '../../models/schedule-models/ScheduleBlock';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';


@Injectable()
export class ScheduleBlockService {
  public url = environment.apiUrl + 'api/ScheduleBlocks';

  constructor(private http: HttpClient) {
  }

  getValues(): Observable<any> {
    return this.http.get(this.url);
  }

  getValue(id: number): Observable<any> {
    return this.http.get(this.url + '/' + id);
  }

  getSchedule(): Observable<any> {
    return this.http.get(this.url + '/ScheduleElements');
  }

  getScheduleElement(id: number): Observable<any> {
    return this.http.get(this.url + '/ScheduleElements' + '/' + id);
  }

  getScheduleRange(s: Date, e: Date): Observable<any> {
    return this.http.get(this.url + '/ScheduleElementsRange' + '?' + `s=${s.toISOString()}&e=${e.toISOString()}`, );
  }

  createValue(scheduleBlock: ScheduleBlock): Observable<any> {
    return this.http.post(this.url, scheduleBlock);
  }

  updateValue(scheduleBlock: ScheduleBlock): Observable<any> {
    return this.http.put(this.url, scheduleBlock);
  }

  deleteValue(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }
}
