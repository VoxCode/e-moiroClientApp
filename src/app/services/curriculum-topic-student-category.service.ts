import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { CurriculumTopicStudentCategory } from '../models/CurriculumTopicStudentCategory';
import { environment } from '../../environments/environment';

@Injectable()
export class CurriculumTopicStudentCategoryService {
  public url = environment.apiUrl + 'api/CurriculumTopicStudentCategories';
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
  createValue(curriculumTopicStudentCategory: CurriculumTopicStudentCategory) {
    return this.http.post(this.url, curriculumTopicStudentCategory);
  }
  // tslint:disable-next-line:typedef
  updateValue(curriculumTopicStudentCategory: CurriculumTopicStudentCategory) {
    return this.http.put(this.url, curriculumTopicStudentCategory);
  }
  // tslint:disable-next-line:typedef
  deleteValue(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
