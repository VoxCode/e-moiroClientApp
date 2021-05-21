import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Role} from '../models/Role';
import {Observable} from 'rxjs';

@Injectable()
export class RoleService {
  public url = environment.apiUrl + 'api/roles';
  constructor(private http: HttpClient) { }

  getValues(): Observable<any> {
    return this.http.get(this.url);
  }

  getValue(id: string): Observable<any> {
    return this.http.get(this.url + '/' + id);
  }

  createValue(role: Role): Observable<any> {
    return this.http.post(this.url, role);
  }

  updateValue(role: Role): Observable<any> {
    return this.http.put(this.url, role);
  }

  deleteValue(id: string): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }
}
