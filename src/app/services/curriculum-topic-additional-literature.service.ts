import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { CurriculumTopicAdditionalLiterature } from '../models/СurriculumTopicAdditionalLiterature';
import { environment } from '../../environments/environment';

@Injectable()
export class CurriculumTopicAdditionalLiteratureService {
  public url = environment.apiUrl + 'api/curriculumTopicAdditionalLiterature';
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
  createValue(curriculumTopicAdditionalLiterature: CurriculumTopicAdditionalLiterature) {
    return this.http.post(this.url, curriculumTopicAdditionalLiterature);
  }
  // tslint:disable-next-line:typedef
  updateValue(curriculumTopicAdditionalLiterature: CurriculumTopicAdditionalLiterature) {
    return this.http.put(this.url, curriculumTopicAdditionalLiterature);
  }
  // tslint:disable-next-line:typedef
  deleteValue(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
