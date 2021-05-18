import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { TrainingProgramFinalExamination } from '../models/TrainingProgramFinalExamination';
import { environment } from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable()
export class TrainingProgramFinalExaminationService {
  public url = environment.apiUrl + 'api/TrainingProgramFinalExaminations';
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

  createValue(trainingProgramFinalExamination: TrainingProgramFinalExamination): Observable<any> {
    return this.http.post(this.url, trainingProgramFinalExamination);
  }

  updateValue(trainingProgramFinalExamination: TrainingProgramFinalExamination): Observable<any> {
    return this.http.put(this.url, trainingProgramFinalExamination);
  }

  deleteValue(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }
}
