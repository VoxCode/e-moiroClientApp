import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {ClassRoom} from '../../models/schedule-models/ClassRoom';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';


@Injectable()
export class ClassRoomService {
  public url = environment.apiUrl + 'api/ClassRooms';
  constructor(private http: HttpClient) { }

  getValues(): Observable<any> {
    return this.http.get(this.url);
  }

  getValue(id: number): Observable<any> {
    return this.http.get(this.url + '/' + id);
  }

  createValue(classRoom: ClassRoom): Observable<any> {
    return this.http.post(this.url, classRoom);
  }

  updateValue(classRoom: ClassRoom): Observable<any> {
    return this.http.put(this.url, classRoom);
  }

  deleteValue(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }
}
