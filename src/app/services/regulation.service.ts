import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Regulation } from '../models/Regulation';
import { environment } from '../../environments/environment';

@Injectable()
export class RegulationService {
  public url = environment.apiUrl + 'api/Regulations';
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
  createValue(regulation: Regulation) {
    return this.http.post(this.url, regulation);
  }
  // tslint:disable-next-line:typedef
  updateValue(regulation: Regulation) {
    return this.http.put(this.url, regulation);
  }
  // tslint:disable-next-line:typedef
  deleteValue(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
