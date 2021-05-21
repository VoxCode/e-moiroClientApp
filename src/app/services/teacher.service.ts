import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Teacher } from '../models/Teacher';
import { environment } from '../../environments/environment';
import {Department} from '../models/Department';
import {Observable} from 'rxjs';

@Injectable()
export class TeacherService {
  public url = environment.apiUrl + 'api/teachers';
  constructor(private http: HttpClient) { }

  getValues(): Observable<any> {
    return this.http.get(this.url);
  }

  getValue(id: number): Observable<any> {
    return this.http.get(this.url + '/' + id);
  }

  createValue(teacher: Teacher): Observable<any> {
    return this.http.post(this.url, teacher);
  }

  updateValue(teacher: Teacher): Observable<any> {
    return this.http.put(this.url, teacher);
  }

  deleteValue(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }

  addTeacherDepartment(teacherId: number, departments: Department[]): Observable<any> {
    return this.http.post(this.url + '/' + teacherId, departments);
  }

  getTeacherDepartment(teacherId: number): Observable<any> {
    return this.http.get(this.url + '/GetTeacherDepartment/' + teacherId);
  }
}
