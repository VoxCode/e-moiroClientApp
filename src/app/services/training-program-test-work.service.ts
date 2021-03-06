import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { TrainingProgramTestWork } from '../models/TrainingProgramTestWork';
import { environment } from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable()
export class TrainingProgramTestWorkService {
  public url = environment.apiUrl + 'api/TrainingProgramTestWorks';
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

  createValue(trainingProgramTestWork: TrainingProgramTestWork): Observable<any> {
    return this.http.post(this.url, trainingProgramTestWork);
  }

  updateValue(trainingProgramTestWork: TrainingProgramTestWork): Observable<any> {
    return this.http.put(this.url, trainingProgramTestWork);
  }

  deleteValue(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }
}
