import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { TrainingProgram } from '../models/TrainingProgram';
import { environment } from '../../environments/environment';

@Injectable()
export class TrainingProgramService {
  public url = environment.apiUrl + 'api/trainingProgram';
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
  createValue(trainingProgram: TrainingProgram) {
    return this.http.post(this.url, trainingProgram);
  }
  // tslint:disable-next-line:typedef
  updateValue(trainingProgram: TrainingProgram) {
    return this.http.put(this.url, trainingProgram);
  }
  // tslint:disable-next-line:typedef
  deleteValue(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
