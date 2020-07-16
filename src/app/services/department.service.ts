import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Department } from '../models/Department';
import { environment } from '../../environments/environment';

@Injectable()
export class DepartmentService {
  public url = environment.apiUrl + 'api/department';
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
  createValue(department: Department) {
    return this.http.post(this.url, department);
  }
  // tslint:disable-next-line:typedef
  updateValue(department: Department) {
    return this.http.put(this.url, department);
  }
  // tslint:disable-next-line:typedef
  deleteValue(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
