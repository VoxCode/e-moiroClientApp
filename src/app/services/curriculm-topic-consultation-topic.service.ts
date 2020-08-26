import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { CurriculumTopicConsultationTopic } from '../models/СurriculumTopicConsultationTopic';
import { environment } from '../../environments/environment';

@Injectable()
export class CurriculmTopicConsultationTopicService {
  public url = environment.apiUrl + 'api/СurriculumTopicConsultationTopic';
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
  createValue(curriculumTopicConsultationTopic: CurriculumTopicConsultationTopic) {
    return this.http.post(this.url, curriculumTopicConsultationTopic);
  }
  // tslint:disable-next-line:typedef
  updateValue(curriculumTopicConsultationTopic: CurriculumTopicConsultationTopic) {
    return this.http.put(this.url, curriculumTopicConsultationTopic);
  }
  // tslint:disable-next-line:typedef
  deleteValue(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
