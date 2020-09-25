import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { AdditionalLiterature } from '../models/AdditionalLiterature';
import { environment } from '../../environments/environment';

@Injectable()
export class AdditionalLiteratureService {
  public url = environment.apiUrl + 'api/AdditionalLiteratures';
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
  createValue(additionalLiterature: AdditionalLiterature) {
    return this.http.post(this.url, additionalLiterature);
  }
  // tslint:disable-next-line:typedef
  updateValue(additionalLiterature: AdditionalLiterature) {
    return this.http.put(this.url, additionalLiterature);
  }
  // tslint:disable-next-line:typedef
  deleteValue(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
