import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {User} from '../models/User';
import {Observable} from 'rxjs';

@Injectable()
export class UserService {
  public url = environment.apiUrl + 'api/users';
  constructor(private http: HttpClient) { }

  getValues(): Observable<any> {
    return this.http.get(this.url);
  }

  getValue(id: string): Observable<any> {
    return this.http.get(this.url + '/' + id);
  }

  createValue(user: User): Observable<any> {
    return this.http.post(this.url, user);
  }

  updateValue(userId: string, teacherId: number): Observable<any> {
    return this.http.get(this.url + '/' + userId + '/' + teacherId);
  }

  deleteValue(id: string): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }
}
