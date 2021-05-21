import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { MainLiterature } from '../models/MainLiterature';
import { environment } from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable()
export class MainLiteratureService {
  public url = environment.apiUrl + 'api/MainLiteratures';
  constructor(private http: HttpClient) { }

  getValues(): Observable<any> {
    return this.http.get(this.url);
  }

  getValue(id: number): Observable<any> {
    return this.http.get(this.url + '/' + id);
  }

  getMainLiterature(curriculumTopicIdArray: number[]): Observable<any> {
    return this.http.post(this.url + '/' + 1, curriculumTopicIdArray);
  }

  createValue(mainLiterature: MainLiterature): Observable<any> {
    return this.http.post(this.url, mainLiterature);
  }

  updateValue(mainLiterature: MainLiterature): Observable<any> {
    return this.http.put(this.url, mainLiterature);
  }

  deleteValue(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }
}
