import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { TrainingProgramTestWork } from '../models/TrainingProgramTestWork';
import { environment } from '../../environments/environment';

@Injectable()
export class TrainingProgramTestWorkService {
  public url = environment.apiUrl + 'api/TrainingProgramTestWorks';
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
  createValue(trainingProgramTestWork: TrainingProgramTestWork) {
    return this.http.post(this.url, trainingProgramTestWork);
  }
  // tslint:disable-next-line:typedef
  updateValue(trainingProgramTestWork: TrainingProgramTestWork) {
    return this.http.put(this.url, trainingProgramTestWork);
  }
  // tslint:disable-next-line:typedef
  deleteValue(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}