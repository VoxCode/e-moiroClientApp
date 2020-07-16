import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { ConsultationTopic } from '../models/ConsultationTopic';
import { environment } from '../../environments/environment';

@Injectable()
export class ConsultationTopicService {
  public url = environment.apiUrl + 'api/consultationTopic';
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
  createValue(consultationTopic: ConsultationTopic) {
    return this.http.post(this.url, consultationTopic);
  }
  // tslint:disable-next-line:typedef
  updateValue(consultationTopic: ConsultationTopic) {
    return this.http.put(this.url, consultationTopic);
  }
  // tslint:disable-next-line:typedef
  deleteValue(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
