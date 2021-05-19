import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { TrainingProgramTeacher } from '../models/TrainingProgramTeacher';
import { environment } from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable()
export class TrainingProgramTeacherService {
  public url = environment.apiUrl + 'api/TrainingProgramTeachers';
  constructor(private http: HttpClient) { }

  getValues(): Observable<any> {
    return this.http.get(this.url);
  }

  getValue(id: number): Observable<any> {
    return this.http.get(this.url + '/' + id);
  }

  getValuesFromTrainingProgram(trainingProgramId: number): Observable<any> {
    return this.http.get(this.url + '/FromTrainingProgram/' + trainingProgramId);
  }

  createValue(trainingProgramTeacher: TrainingProgramTeacher): Observable<any> {
    return this.http.post(this.url, trainingProgramTeacher);
  }

  updateValue(trainingProgramTeacher: TrainingProgramTeacher): Observable<any> {
    return this.http.put(this.url, trainingProgramTeacher);
  }

  deleteValue(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }
}
