import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Observable} from 'rxjs';
import {GuidedTestWorkAssignment} from '../models/GuidedTestWorkAssignment';

@Injectable()
export class GuidedTestWorkAssignmentService {
  public url = environment.apiUrl + 'api/GuidedTestWorkAssignments';
  constructor(private http: HttpClient) { }

  getValues(): Observable<any> {
    return this.http.get(this.url);
  }
  getValue(id: number): Observable<any> {
    return this.http.get(this.url + '/' + id);
  }
  getGuidedTestWorkAssignments(curriculumTopicIdArray: number[]): Observable<any> {
    return this.http.post(this.url + '/FromCurriculumTopics', curriculumTopicIdArray);
  }
  createValue(guidedTestWorkAssignment: GuidedTestWorkAssignment): Observable<any> {
    return this.http.post(this.url, guidedTestWorkAssignment);
  }
  updateValue(guidedTestWorkAssignment: GuidedTestWorkAssignment): Observable<any> {
    return this.http.put(this.url, guidedTestWorkAssignment);
  }
  deleteValue(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }
}
