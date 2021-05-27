import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { TrainingProgramAdditionalLiterature } from '../models/TrainingProgramAdditionalLiterature';
import { environment } from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable()
export class TrainingProgramAdditionalLiteratureService {
  public url = environment.apiUrl + 'api/TrainingProgramAdditionalLiteratures';
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

  updateSerialNumbers(trainingProgramAdditionalLiteratures: TrainingProgramAdditionalLiterature[]): Observable<any> {
    return this.http.put(this.url + '/SerialNumbers', trainingProgramAdditionalLiteratures);
  }

  createValue(trainingProgramAdditionalLiterature: TrainingProgramAdditionalLiterature): Observable<any> {
    return this.http.post(this.url, trainingProgramAdditionalLiterature);
  }

  updateValue(trainingProgramAdditionalLiterature: TrainingProgramAdditionalLiterature): Observable<any> {
    return this.http.put(this.url, trainingProgramAdditionalLiterature);
  }

  deleteValue(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }
}
