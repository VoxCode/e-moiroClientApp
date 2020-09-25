import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { CurriculumTopicDepartment } from '../models/СurriculumTopicDepartment';
import { environment } from '../../environments/environment';

@Injectable()
export class CurriculumTopicDepartmentService {
  public url = environment.apiUrl + 'api/CurriculumTopicDepartments';
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
  createValue(curriculumTopicDepartment: CurriculumTopicDepartment) {
    return this.http.post(this.url, curriculumTopicDepartment);
  }
  // tslint:disable-next-line:typedef
  updateValue(curriculumTopicDepartment: CurriculumTopicDepartment) {
    return this.http.put(this.url, curriculumTopicDepartment);
  }
  // tslint:disable-next-line:typedef
  deleteValue(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
