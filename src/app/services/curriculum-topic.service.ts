import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { CurriculumTopic } from '../models/CurriculumTopic';
import { environment } from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable()
export class CurriculumTopicService {
  public url = environment.apiUrl + 'api/curriculumTopics';
  constructor(private http: HttpClient) { }

  getValues(): Observable<any> {
    return this.http.get(this.url);
  }
  getValue(studentCategoryId: number, departmentId: number): Observable<any> {
    return this.http.get(this.url + '/' + studentCategoryId + '/' + departmentId);
  }
  getFromTrainingProgram(trainingProgramId: number): Observable<any> {
    return this.http.get(this.url + '/TrainingProgram/' + trainingProgramId);
  }
  createValue(curriculumTopic: CurriculumTopic): Observable<any> {
    return this.http.post(this.url, curriculumTopic);
  }
  updateValue(curriculumTopic: CurriculumTopic): Observable<any> {
    return this.http.put(this.url, curriculumTopic);
  }
  deleteValue(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }
}
