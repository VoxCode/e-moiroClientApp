import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { CurriculumSection } from '../models/CurriculumSection';
import { environment } from '../../environments/environment';

@Injectable()
export class CurriculumSectionService {
  public url = environment.apiUrl + 'api/curriculumSection';
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
  createValue(curriculumSection: CurriculumSection) {
    return this.http.post(this.url, curriculumSection);
  }
  // tslint:disable-next-line:typedef
  updateValue(curriculumSection: CurriculumSection) {
    return this.http.put(this.url, curriculumSection);
  }
  // tslint:disable-next-line:typedef
  deleteValue(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
