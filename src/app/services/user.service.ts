import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {User} from '../models/User';

@Injectable()
export class UserService {
  public url = environment.apiUrl + 'api/users';
  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  getValues() {
    return this.http.get(this.url);
  }
  // tslint:disable-next-line:typedef
  getValue(id: string) {
    return this.http.get(this.url + '/' + id);
  }
  // tslint:disable-next-line:typedef
  createValue(user: User) {
    return this.http.post(this.url, user);
  }
  // tslint:disable-next-line:typedef
  updateValue(user: User) {
    return this.http.put(this.url, user);
  }
  // tslint:disable-next-line:typedef
  deleteValue(id: string) {
    return this.http.delete(this.url + '/' + id);
  }
}
