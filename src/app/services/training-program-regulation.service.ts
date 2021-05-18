import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { TrainingProgramRegulation } from '../models/TrainingProgramRegulation';
import { environment } from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable()
export class TrainingProgramRegulationService {
  public url = environment.apiUrl + 'api/TrainingProgramRegulations';
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

  createValue(trainingProgramRegulation: TrainingProgramRegulation): Observable<any> {
    return this.http.post(this.url, trainingProgramRegulation);
  }

  updateValue(trainingProgramRegulation: TrainingProgramRegulation): Observable<any> {
    return this.http.put(this.url, trainingProgramRegulation);
  }

  deleteValue(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }
}
