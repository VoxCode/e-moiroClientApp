import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { CurriculumTopicFinalExamination } from '../models/CurriculumTopicFinalExamination';
import { environment } from '../../environments/environment';

@Injectable()
export class CurriculumTopicFinalExaminationService {
  public url = environment.apiUrl + 'api/CurriculumTopicFinalExaminations';
  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  getValues() {
    return this.http.get(this.url);
  }
  // tslint:disable-next-line:typedef
  getValue(id: number, certificationTypeIndex: number) {
    return this.http.get(this.url + '/' + certificationTypeIndex + '/' + id);
  }
  // tslint:disable-next-line:typedef
  createValue(curriculumTopicFinalExamination: CurriculumTopicFinalExamination) {
    return this.http.post(this.url, curriculumTopicFinalExamination);
  }
  // tslint:disable-next-line:typedef
  updateValue(curriculumTopicFinalExamination: CurriculumTopicFinalExamination) {
    return this.http.put(this.url, curriculumTopicFinalExamination);
  }
  // tslint:disable-next-line:typedef
  deleteValue(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
