import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Observable} from 'rxjs';
import {MaxVariableTopicTime} from '../models/MaxVariableTopicTime';

@Injectable()
export class MaxVariableTopicTimeService {
  public url = environment.apiUrl + 'api/MaxVariableTopicTime';
  constructor(private http: HttpClient) { }

  getValues(trainingProgramCurriculumSectionId: number): Observable<any> {
    return this.http.get(this.url + '/' + trainingProgramCurriculumSectionId);
  }

  createValue(maxVariableTopicTime: MaxVariableTopicTime): Observable<any> {
    return this.http.post(this.url, maxVariableTopicTime);
  }

  updateValue(maxVariableTopicTime: MaxVariableTopicTime): Observable<any> {
    return this.http.put(this.url, maxVariableTopicTime);
  }

  deleteValue(maxVariableTopicTime: MaxVariableTopicTime): Observable<any> {
    return this.http.post(this.url + '/Delete', maxVariableTopicTime);
  }
}
