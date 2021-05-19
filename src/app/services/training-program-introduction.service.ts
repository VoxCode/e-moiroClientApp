import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { TrainingProgramTestWork } from '../models/TrainingProgramTestWork';
import { environment } from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable()
export class TrainingProgramIntroductionService {
  public url = environment.apiUrl + 'api/TrainingProgramIntroductions';
  constructor(private http: HttpClient) { }

  getValueFromTrainingProgram(trainingProgramId: number): Observable<any> {
    return this.http.get(this.url + '/FromTrainingProgram/' + trainingProgramId);
  }

  createValue(trainingProgramTestWork: TrainingProgramTestWork): Observable<any> {
    return this.http.post(this.url, trainingProgramTestWork);
  }

  updateValue(trainingProgramTestWork: TrainingProgramTestWork): Observable<any> {
    return this.http.put(this.url, trainingProgramTestWork);
  }
}
