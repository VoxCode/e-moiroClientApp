import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { SectionNumber } from '../models/SectionNumber';
import { environment } from '../../environments/environment';

@Injectable()
export class SectionNumberService {
  public url = environment.apiUrl + 'api/sectionNumber';
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
  createValue(sectionNumber: SectionNumber) {
    return this.http.post(this.url, sectionNumber);
  }
  // tslint:disable-next-line:typedef
  updateValue(sectionNumber: SectionNumber) {
    return this.http.put(this.url, sectionNumber);
  }
  // tslint:disable-next-line:typedef
  deleteValue(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
