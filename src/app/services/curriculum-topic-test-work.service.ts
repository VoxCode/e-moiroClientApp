import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { CurriculumTopicTestWork } from '../models/CurriculumTopicTestWork';
import { environment } from '../../environments/environment';

@Injectable()
export class CurriculumTopicTestWorkService {
  public url = environment.apiUrl + 'api/СurriculumTopicTheQuestion';
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
  createValue(curriculumTopicTestWork: CurriculumTopicTestWork) {
    return this.http.post(this.url, curriculumTopicTestWork);
  }
  // tslint:disable-next-line:typedef
  updateValue(curriculumTopicTestWork: CurriculumTopicTestWork) {
    return this.http.put(this.url, curriculumTopicTestWork);
  }
  // tslint:disable-next-line:typedef
  deleteValue(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
