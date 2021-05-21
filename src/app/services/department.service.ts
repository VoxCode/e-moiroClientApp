import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Department } from '../models/Department';
import { environment } from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable()
export class DepartmentService {
  public url = environment.apiUrl + 'api/departments';
  constructor(private http: HttpClient) { }

  getValues(): Observable<any> {
    return this.http.get(this.url);
  }

  getValue(id: number): Observable<any> {
    return this.http.get(this.url + '/' + id);
  }

  getDepartmentsForCurrentUser(userName: string, key: number): Observable<any> {
    return this.http.get(this.url + '/' + userName + '/' + key);
  }

  createValue(department: Department): Observable<any> {
    return this.http.post(this.url, department);
  }

  updateValue(department: Department): Observable<any> {
    return this.http.put(this.url, department);
  }

  deleteValue(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }
}
