import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Regulation } from '../models/Regulation';
import { environment } from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable()
export class RegulationService {
  public url = environment.apiUrl + 'api/Regulations';
  constructor(private http: HttpClient) { }

  getValues(): Observable<any> {
    return this.http.get(this.url);
  }
  getValue(id: number): Observable<any>{
    return this.http.get(this.url + '/' + id);
  }
  getAuthorValues(author: string): Observable<any> {
    return this.http.get(this.url + '/Author' + author);
  }
  getByCurriculumTopics(curriculumTopicIdArray: number[]): Observable<any> {
    return this.http.post(this.url + '/CurriculumTopics', curriculumTopicIdArray);
  }
  createValue(regulation: Regulation): Observable<any> {
    return this.http.post(this.url, regulation);
  }
  updateValue(regulation: Regulation): Observable<any> {
    return this.http.put(this.url, regulation);
  }
  deleteValue(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }
}
