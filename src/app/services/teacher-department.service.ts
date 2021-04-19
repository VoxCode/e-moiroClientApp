import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {TeacherDepartment} from '../models/TeacherDepartment';

@Injectable()
export class TeacherDepartmentService {
  public url = environment.apiUrl + 'api/teacherDepartments';
  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  getValues() {
    return this.http.get(this.url);
  }
  // tslint:disable-next-line:typedef
  getDepartmentsForCurrentTeacher(teacherId: number) {
    return this.http.get(this.url + '/' + teacherId);
  }
  // tslint:disable-next-line:typedef
  createValue(teacherDepartment: TeacherDepartment) {
    return this.http.post(this.url, teacherDepartment);
  }
  // tslint:disable-next-line:typedef
  updateValue(teacherDepartment: TeacherDepartment) {
    return this.http.put(this.url, teacherDepartment);
  }
  // tslint:disable-next-line:typedef
  deleteValue(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
