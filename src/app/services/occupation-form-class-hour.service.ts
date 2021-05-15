import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Observable} from 'rxjs';
import {OccupationFormClassHour} from '../models/OccupationFormClassHour';

@Injectable()
export class OccupationFormClassHourService {
  public url = environment.apiUrl + 'api/OccupationFormClassHours';
  constructor(private http: HttpClient) { }

  getValues(curriculumTopicTrainingProgramId: number): Observable<any> {
    return this.http.get(this.url + '/' + curriculumTopicTrainingProgramId);
  }

  createValue(occupationFormClassHour: OccupationFormClassHour): Observable<any> {
    return this.http.post(this.url, occupationFormClassHour);
  }

  updateValue(occupationFormClassHour: OccupationFormClassHour): Observable<any> {
    return this.http.put(this.url, occupationFormClassHour);
  }

  deleteValue(occupationFormClassHour: OccupationFormClassHour): Observable<any> {
    return this.http.post(this.url + '/Delete', occupationFormClassHour);
  }
}
