import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Role} from '../models/Role';

@Injectable()
export class RoleService {
  public url = environment.apiUrl + 'api/roles';
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
  createValue(role: Role) {
    return this.http.post(this.url, role);
  }
  // tslint:disable-next-line:typedef
  updateValue(role: Role) {
    return this.http.put(this.url, role);
  }
  // tslint:disable-next-line:typedef
  deleteValue(id: string) {
    return this.http.delete(this.url + '/' + id);
  }
}
