import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Group } from '../models/Group';
import { environment } from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable()
export class GroupService {
  public url = environment.apiUrl + 'api/Groups';
  constructor(private http: HttpClient) { }

  getValues(): Observable<any> {
    return this.http.get(this.url);
  }

  getValue(id: number): Observable<any> {
    return this.http.get(this.url + '/' + id);
  }

  createValue(group: Group): Observable<any> {
    return this.http.post(this.url, group);
  }

  updateValue(group: Group): Observable<any> {
    return this.http.put(this.url, group);
  }

  deleteValue(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }
}
