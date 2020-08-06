import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { CurriculumTopicTeacherCategory } from '../models/СurriculumTopicTeacherCategory';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurriculumTopicTeacherCategoryService {
  public url = environment.apiUrl + 'api/curriculumTopicTeacherCategory';
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
  createValue(curriculumTopicTeacherCategory: CurriculumTopicTeacherCategory) {
    return this.http.post(this.url, curriculumTopicTeacherCategory);
  }
  // tslint:disable-next-line:typedef
  updateValue(curriculumTopicTeacherCategory: CurriculumTopicTeacherCategory) {
    return this.http.put(this.url, curriculumTopicTeacherCategory);
  }
  // tslint:disable-next-line:typedef
  deleteValue(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
