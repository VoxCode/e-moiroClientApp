import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { CurriculumTopic } from '../models/CurriculumTopic';
import { environment } from '../../environments/environment';
import {CurriculumSection} from '../models/CurriculumSection';

@Injectable()
export class CurriculumTopicService {
  public url = environment.apiUrl + 'api/curriculumTopics';
  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  getValues() {
    return this.http.get(this.url);
  }
  // tslint:disable-next-line:typedef
  getValue(studentCategoryId: number, departmentId: number) {
    return this.http.get(this.url + '/' + studentCategoryId + '/' + departmentId);
  }
  // tslint:disable-next-line:typedef
  createValue(curriculumTopic: CurriculumTopic) {
    return this.http.post(this.url, curriculumTopic);
  }
  // tslint:disable-next-line:typedef
  updateValue(curriculumTopic: CurriculumTopic) {
    return this.http.put(this.url, curriculumTopic);
  }
  // tslint:disable-next-line:typedef
  deleteValue(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
