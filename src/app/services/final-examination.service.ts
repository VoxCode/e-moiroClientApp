import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { FinalExamination } from '../models/FinalExamination';
import { environment } from '../../environments/environment';
import {Observable} from 'rxjs';
import {Department} from "../models/Department";

@Injectable()
export class FinalExaminationService {
  public url = environment.apiUrl + 'api/FinalExaminations';
  constructor(private http: HttpClient) { }

  getValues(): Observable<any> {
    return this.http.get(this.url);
  }
  getValue(id: number): Observable<any> {
    return this.http.get(this.url + '/' + id);
  }
  getAuthorValues(author: string): Observable<any> {
    return this.http.get(this.url + '/Author' + author);
  }
  getFinalExamination(certificationTypeId: number, curriculumTopicIdArray: number[]): Observable<any> {
    return this.http.post(this.url + '/' + certificationTypeId, curriculumTopicIdArray);
  }
  getFinalExaminationDepartment(certificationTypeId: number, departmentId: number): Observable<any> {
    return this.http.get(this.url + '/GetByDepartment/' + certificationTypeId + '/' + departmentId);
  }
  connectToDepartments(finalExaminationId: number, departments: Department[]): Observable<any>{
    return this.http.put(this.url + '/ConnectToDepartments/' + finalExaminationId, departments);
  }
  createValue(finalExamination: FinalExamination): Observable<any> {
    return this.http.post(this.url, finalExamination);
  }
  updateValue(finalExamination: FinalExamination): Observable<any> {
    return this.http.put(this.url, finalExamination);
  }
  deleteValue(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }
}
