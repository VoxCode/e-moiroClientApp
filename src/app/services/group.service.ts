import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Group } from '../models/Group';
import { environment } from '../../environments/environment';

@Injectable()
export class GroupService {
  public url = environment.apiUrl + 'api/group';
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
  createValue(group: Group) {
    return this.http.post(this.url, group);
  }
  // tslint:disable-next-line:typedef
  updateValue(group: Group) {
    return this.http.put(this.url, group);
  }
  // tslint:disable-next-line:typedef
  deleteValue(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
