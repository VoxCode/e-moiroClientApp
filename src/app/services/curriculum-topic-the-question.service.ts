import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { CurriculumTopicTheQuestion } from '../models/СurriculumTopicTheQuestion';
import { environment } from '../../environments/environment';

@Injectable()
export class CurriculumTopicTheQuestionService {
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
  createValue(curriculumTopicTheQuestion: CurriculumTopicTheQuestion) {
    return this.http.post(this.url, curriculumTopicTheQuestion);
  }
  // tslint:disable-next-line:typedef
  updateValue(curriculumTopicTheQuestion: CurriculumTopicTheQuestion) {
    return this.http.put(this.url, curriculumTopicTheQuestion);
  }
  // tslint:disable-next-line:typedef
  deleteValue(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
