import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { СurriculumTopicRegulation } from '../models/СurriculumTopicRegulation';
import { environment } from '../../environments/environment';

@Injectable()
export class CurriculumTopicRegulationService {
  public url = environment.apiUrl + 'api/CurriculumTopicRegulations';
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
  createValue(curriculumTopicRegulation: СurriculumTopicRegulation) {
    return this.http.post(this.url, curriculumTopicRegulation);
  }
  // tslint:disable-next-line:typedef
  updateValue(curriculumTopicRegulation: СurriculumTopicRegulation) {
    return this.http.put(this.url, curriculumTopicRegulation);
  }
  // tslint:disable-next-line:typedef
  deleteValue(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
