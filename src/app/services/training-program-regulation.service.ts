import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { TrainingProgramRegulation } from '../models/TrainingProgramRegulation';
import { environment } from '../../environments/environment';

@Injectable()
export class TrainingProgramRegulationService {
  public url = environment.apiUrl + 'api/TrainingProgramRegulations';
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
  createValue(trainingProgramRegulation: TrainingProgramRegulation) {
    return this.http.post(this.url, trainingProgramRegulation);
  }
  // tslint:disable-next-line:typedef
  updateValue(trainingProgramRegulation: TrainingProgramRegulation) {
    return this.http.put(this.url, trainingProgramRegulation);
  }
  // tslint:disable-next-line:typedef
  deleteValue(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
