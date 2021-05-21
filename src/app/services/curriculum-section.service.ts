import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { CurriculumSection } from '../models/CurriculumSection';
import { environment } from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable()
export class CurriculumSectionService {
  public url = environment.apiUrl + 'api/CurriculumSections';
  constructor(private http: HttpClient) { }

  getValues(): Observable<any> {
    return this.http.get(this.url);
  }

  getSelectValues(departmentId: number): Observable<any> {
    return this.http.get(this.url + '/' + departmentId + '/' + 1);
  }

  getValue(id: number): Observable<any> {
    return this.http.get(this.url + '/' + id);
  }

  createValue(curriculumSection: CurriculumSection): Observable<any> {
    return this.http.post(this.url, curriculumSection);
  }

  updateValue(curriculumSection: CurriculumSection): Observable<any> {
    return this.http.put(this.url, curriculumSection);
  }

  deleteValue(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }
}
