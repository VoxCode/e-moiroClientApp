import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { MainLiterature } from '../models/MainLiterature';
import { environment } from '../../environments/environment';
import {timeout} from 'rxjs/operators';

@Injectable()
export class MainLiteratureService {
  public url = environment.apiUrl + 'api/MainLiteratures';
  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  getValues() {
    return this.http.get(this.url);
  }
  // tslint:disable-next-line:typedef
  getValue(id: number) {
    return this.http.get(this.url + '/' + id);
  }
  // tslint:disable-next-line:typedef
  getMainLiterature(curriculumTopicIdArray: number[]) {
    return this.http.post(this.url + '/' + 1, curriculumTopicIdArray);
  }
  // tslint:disable-next-line:typedef
  createValue(mainLiterature: MainLiterature) {
    return this.http.post(this.url, mainLiterature);
  }
  // tslint:disable-next-line:typedef
  updateValue(mainLiterature: MainLiterature) {
    return this.http.put(this.url, mainLiterature);
  }
  // tslint:disable-next-line:typedef
  deleteValue(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
