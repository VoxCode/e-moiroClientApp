import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Observable} from 'rxjs';
import {TrainingProgramIndependentWorkQuestion} from '../models/TrainingProgramIndependentWorkQuestion';

@Injectable()
export class TrainingProgramIndependentWorkQuestionService {
  public url = environment.apiUrl + 'api/IndependentWorkQuestions';
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

  createValue(trainingProgramIndependentWorkQuestion: TrainingProgramIndependentWorkQuestion): Observable<any> {
    return this.http.post(this.url, trainingProgramIndependentWorkQuestion);
  }

  updateValue(trainingProgramIndependentWorkQuestion: TrainingProgramIndependentWorkQuestion): Observable<any> {
    return this.http.put(this.url, trainingProgramIndependentWorkQuestion);
  }

  deleteValue(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }
}
