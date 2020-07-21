import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { TeachingPosition } from '../models/TeachingPosition';
import { environment } from '../../environments/environment';

@Injectable()
export class TeachingPositionService {
  public url = environment.apiUrl + 'api/teachingPositions';
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
  createValue(teachingPosition: TeachingPosition) {
    return this.http.post(this.url, teachingPosition);
  }
  // tslint:disable-next-line:typedef
  updateValue(teachingPosition: TeachingPosition) {
    return this.http.put(this.url, teachingPosition);
  }
  // tslint:disable-next-line:typedef
  deleteValue(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
