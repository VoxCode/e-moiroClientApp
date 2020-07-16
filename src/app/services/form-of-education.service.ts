import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { FormOfEducation } from '../models/FormOfEducation';
import { environment } from '../../environments/environment';

@Injectable()
export class FormOfEducationService {
  public url = environment.apiUrl + 'api/formOfEducation';
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
  createValue(formOfEducation: FormOfEducation) {
    return this.http.post(this.url, formOfEducation);
  }
  // tslint:disable-next-line:typedef
  updateValue(formOfEducation: FormOfEducation) {
    return this.http.put(this.url, formOfEducation);
  }
  // tslint:disable-next-line:typedef
  deleteValue(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
