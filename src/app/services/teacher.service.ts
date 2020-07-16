import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Teacher } from '../models/Teacher';
import { environment } from '../../environments/environment';

@Injectable()
export class TeacherService {
  public url = environment.apiUrl + 'api/teacher';
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
  createValue(teacher: Teacher) {
    return this.http.post(this.url, teacher);
  }
  // tslint:disable-next-line:typedef
  updateValue(teacher: Teacher) {
    return this.http.put(this.url, teacher);
  }
  // tslint:disable-next-line:typedef
  deleteValue(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
