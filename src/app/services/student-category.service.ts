import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { StudentCategory } from '../models/StudentCategory';
import { environment } from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable()
export class StudentCategoryService {
  public url = environment.apiUrl + 'api/StudentCategories';
  constructor(private http: HttpClient) { }

  getValues(): Observable<any> {
    return this.http.get(this.url);
  }

  getValue(id: number): Observable<any> {
    return this.http.get(this.url + '/' + id);
  }

  createValue(studentCategory: StudentCategory): Observable<any> {
    return this.http.post(this.url, studentCategory);
  }

  updateValue(studentCategory: StudentCategory): Observable<any> {
    return this.http.put(this.url, studentCategory);
  }

  deleteValue(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }
}
