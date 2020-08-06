import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { CurriculumTopicTeacher } from '../models/СurriculumTopicTeacher';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurriculumTopicTeacherService {
  public url = environment.apiUrl + 'api/curriculumTopicTeacher';
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
  createValue(curriculumTopicTeacher: CurriculumTopicTeacher) {
    return this.http.post(this.url, curriculumTopicTeacher);
  }
  // tslint:disable-next-line:typedef
  updateValue(curriculumTopicTeacher: CurriculumTopicTeacher) {
    return this.http.put(this.url, curriculumTopicTeacher);
  }
  // tslint:disable-next-line:typedef
  deleteValue(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
