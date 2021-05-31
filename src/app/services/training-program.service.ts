import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { TrainingProgram } from '../models/TrainingProgram';
import { environment } from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable()
export class TrainingProgramService {
  public url = environment.apiUrl + 'api/TrainingPrograms';
  constructor(private http: HttpClient) { }

  getValues(): Observable<any> {
    return this.http.get(this.url);
  }

  getValue(id: number): Observable<any> {
    return this.http.get(this.url + '/' + id);
  }

  getValueForDocxGenerator(id: number): Observable<any> {
    return this.http.get(this.url + '/ForDocxGenerator/' + id);
  }

  getValueForTeacher(userName: string): Observable<any> {
    return this.http.get(this.url + '/ForTeacher/' + userName);
  }

  createValue(trainingProgram: TrainingProgram): Observable<any> {
    return this.http.post(this.url, trainingProgram);
  }

  updateValue(trainingProgram: TrainingProgram): Observable<any> {
    return this.http.put(this.url, trainingProgram);
  }

  deleteValue(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }
}
