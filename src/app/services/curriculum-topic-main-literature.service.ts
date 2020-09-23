import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { CurriculumTopicMainLiterature } from '../models/СurriculumTopicMainLiterature';
import { environment } from '../../environments/environment';

@Injectable()
export class CurriculumTopicMainLiteratureService {
  public url = environment.apiUrl + 'api/CurriculumTopicDepartment';
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
  createValue(curriculumTopicMainLiterature: CurriculumTopicMainLiterature) {
    return this.http.post(this.url, curriculumTopicMainLiterature);
  }
  // tslint:disable-next-line:typedef
  updateValue(curriculumTopicMainLiterature: CurriculumTopicMainLiterature) {
    return this.http.put(this.url, curriculumTopicMainLiterature);
  }
  // tslint:disable-next-line:typedef
  deleteValue(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
