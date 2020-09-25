import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { TestWork } from '../models/TestWork';
import { environment } from '../../environments/environment';

@Injectable()
export class TestWorkService {
  public url = environment.apiUrl + 'api/TestWorks';
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
  createValue(testWork: TestWork) {
    return this.http.post(this.url, testWork);
  }
  // tslint:disable-next-line:typedef
  updateValue(testWork: TestWork) {
    return this.http.put(this.url, testWork);
  }
  // tslint:disable-next-line:typedef
  deleteValue(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
