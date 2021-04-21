import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Expert} from '../models/Expert';

@Injectable()
export class ExpertService {
  public url = environment.apiUrl + 'api/experts';
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
  createValue(expert: Expert) {
    return this.http.post(this.url, expert);
  }
  // tslint:disable-next-line:typedef
  updateValue(expert: Expert) {
    return this.http.put(this.url, expert);
  }
  // tslint:disable-next-line:typedef
  deleteValue(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
