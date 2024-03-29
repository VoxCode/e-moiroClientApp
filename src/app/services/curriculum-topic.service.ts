import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { CurriculumTopic } from '../models/CurriculumTopic';
import { environment } from '../../environments/environment';
import {Observable} from 'rxjs';
import {TrainingProgram} from '../models/TrainingProgram';
import {Department} from "../models/Department";

@Injectable()
export class CurriculumTopicService {
  public url = environment.apiUrl + 'api/curriculumTopics';
  constructor(private http: HttpClient) { }

  getValues(): Observable<any> {
    return this.http.get(this.url);
  }
  getValuesFromFilter(studentCategoryId: number, departmentId: number, authorIndex: string): Observable<any> {
    return this.http.get(this.url + '/' + studentCategoryId + '/' + departmentId + '/' + authorIndex);
  }
  getValuesByDepartment(studentCategoryId: number, departmentId: number): Observable<any> {
    return this.http.get(this.url + '/GetByDepartment/' + studentCategoryId + '/' + departmentId);
  }
  getAuthorValues(author: string): Observable<any> {
    return this.http.get(this.url + '/Author' + author);
  }
  getFromTrainingProgram(trainingProgramId: number): Observable<any> {
    return this.http.get(this.url + '/TrainingProgram/' + trainingProgramId);
  }
  connectToDepartments(curriculumTopicId: number, departments: Department[]): Observable<any>{
    return this.http.put(this.url + '/ConnectToDepartments/' + curriculumTopicId, departments);
  }
  createValue(curriculumTopic: CurriculumTopic): Observable<any> {
    return this.http.post(this.url, curriculumTopic);
  }
  createRelationships(trainingProgram: TrainingProgram, curriculumTopicId: number): Observable<any> {
    return this.http.post(this.url + '/PostTrainingProgram/' + curriculumTopicId, trainingProgram);
  }
  updateValue(curriculumTopic: CurriculumTopic): Observable<any> {
    return this.http.put(this.url, curriculumTopic);
  }
  deleteValue(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }
}
