import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { StudentCategory } from '../models/StudentCategory';
import { environment } from '../../environments/environment';

@Injectable()
export class TeacherCategoryService {
  public url = environment.apiUrl + 'api/teacherCategories';
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
  createValue(teacherCategory: StudentCategory) {
    return this.http.post(this.url, teacherCategory);
  }
  // tslint:disable-next-line:typedef
  updateValue(teacherCategory: StudentCategory) {
    return this.http.put(this.url, teacherCategory);
  }
  // tslint:disable-next-line:typedef
  deleteValue(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
