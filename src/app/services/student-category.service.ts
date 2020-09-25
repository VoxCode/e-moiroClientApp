import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { StudentCategory } from '../models/StudentCategory';
import { environment } from '../../environments/environment';

@Injectable()
export class StudentCategoryService {
  public url = environment.apiUrl + 'api/StudentCategories';
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
  createValue(studentCategory: StudentCategory) {
    return this.http.post(this.url, studentCategory);
  }
  // tslint:disable-next-line:typedef
  updateValue(studentCategory: StudentCategory) {
    return this.http.put(this.url, studentCategory);
  }
  // tslint:disable-next-line:typedef
  deleteValue(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
