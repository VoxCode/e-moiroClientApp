import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { TeacherCategory } from '../models/TeacherCategory';
import { environment } from '../../environments/environment';

@Injectable()
export class TeacherCategoryService {
  public url = environment.apiUrl + 'api/teacherCategory';
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
  createValue(teacherCategory: TeacherCategory) {
    return this.http.post(this.url, teacherCategory);
  }
  // tslint:disable-next-line:typedef
  updateValue(teacherCategory: TeacherCategory) {
    return this.http.put(this.url, teacherCategory);
  }
  // tslint:disable-next-line:typedef
  deleteValue(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
