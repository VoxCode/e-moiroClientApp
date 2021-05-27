import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { TrainingProgramMainLiterature } from '../models/TrainingProgramMainLiterature';
import { environment } from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable()
export class TrainingProgramMainLiteratureService {
  public url = environment.apiUrl + 'api/TrainingProgramMainLiteratures';
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

  updateSerialNumbers(trainingProgramMainLiteratures: TrainingProgramMainLiterature[]): Observable<any> {
    return this.http.put(this.url + '/SerialNumbers', trainingProgramMainLiteratures);
  }

  createValue(trainingProgramMainLiterature: TrainingProgramMainLiterature): Observable<any> {
    return this.http.post(this.url, trainingProgramMainLiterature);
  }

  updateValue(trainingProgramMainLiterature: TrainingProgramMainLiterature): Observable<any> {
    return this.http.put(this.url, trainingProgramMainLiterature);
  }

  deleteValue(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }
}
