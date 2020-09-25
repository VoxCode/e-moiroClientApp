import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { FinalExamination } from '../models/FinalExamination';
import { environment } from '../../environments/environment';

@Injectable()
export class FinalExaminationService {
  public url = environment.apiUrl + 'api/FinalExaminations';
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
  createValue(finalExamination: FinalExamination) {
    return this.http.post(this.url, finalExamination);
  }
  // tslint:disable-next-line:typedef
  updateValue(finalExamination: FinalExamination) {
    return this.http.put(this.url, finalExamination);
  }
  // tslint:disable-next-line:typedef
  deleteValue(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
