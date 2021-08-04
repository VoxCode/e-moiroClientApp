import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { AdditionalLiterature } from '../models/AdditionalLiterature';
import { environment } from '../../environments/environment';
import {Observable} from 'rxjs';


@Injectable()
export class AdditionalLiteratureService {
  public url = environment.apiUrl + 'api/AdditionalLiteratures';
  constructor(private http: HttpClient) { }

  getValues(): Observable<any> {
    return this.http.get(this.url);
  }
  getValue(id: number): Observable<any> {
    return this.http.get(this.url + '/' + id);
  }
  getAuthorValues(author: string): Observable<any> {
    return this.http.get(this.url + '/Author' + author);
  }
  getAdditionalLiterature(curriculumTopicIdArray: number[]): Observable<any> {
    return this.http.post(this.url + '/GetAdditionalLiterature', curriculumTopicIdArray);
  }
  createValue(additionalLiterature: AdditionalLiterature): Observable<any> {
    return this.http.post(this.url, additionalLiterature);
  }
  updateValue(additionalLiterature: AdditionalLiterature): Observable<any> {
    return this.http.put(this.url, additionalLiterature);
  }
  deleteValue(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }
}
