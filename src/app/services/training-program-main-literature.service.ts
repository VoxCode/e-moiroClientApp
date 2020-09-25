import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { TrainingProgramMainLiterature } from '../models/TrainingProgramMainLiterature';
import { environment } from '../../environments/environment';

@Injectable()
export class TrainingProgramMainLiteratureService {
  public url = environment.apiUrl + 'api/TrainingProgramMainLiteratures';
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
  createValue(trainingProgramMainLiterature: TrainingProgramMainLiterature) {
    return this.http.post(this.url, trainingProgramMainLiterature);
  }
  // tslint:disable-next-line:typedef
  updateValue(trainingProgramMainLiterature: TrainingProgramMainLiterature) {
    return this.http.put(this.url, trainingProgramMainLiterature);
  }
  // tslint:disable-next-line:typedef
  deleteValue(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
