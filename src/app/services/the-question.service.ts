import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { TheQuestion } from '../models/TheQuestion';
import { environment } from '../../environments/environment';

@Injectable()
export class TheQuestionService {
  public url = environment.apiUrl + 'api/theQuestions';
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
  createValue(theQuestion: TheQuestion) {
    return this.http.post(this.url, theQuestion);
  }
  // tslint:disable-next-line:typedef
  updateValue(theQuestion: TheQuestion) {
    return this.http.put(this.url, theQuestion);
  }
  // tslint:disable-next-line:typedef
  deleteValue(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
