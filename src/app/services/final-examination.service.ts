import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { FinalExamination } from '../models/FinalExamination';
import { environment } from '../../environments/environment';
import {Observable} from 'rxjs';

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

  getFinalExamination(certificationTypeId: number, curriculumTopicIdArray: number[]): Observable<any> {
    return this.http.post(this.url + '/' + certificationTypeId, curriculumTopicIdArray);
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
