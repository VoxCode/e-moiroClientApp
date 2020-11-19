import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { TrainingProgramAdditionalLiterature } from '../models/TrainingProgramAdditionalLiterature';
import { environment } from '../../environments/environment';

@Injectable()
export class TrainingProgramAdditionalLiteratureService {
  public url = environment.apiUrl + 'api/TrainingProgramAdditionalLiteratures';
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
  createValue(trainingProgramAdditionalLiterature: TrainingProgramAdditionalLiterature) {
    return this.http.post(this.url, trainingProgramAdditionalLiterature);
  }
  // tslint:disable-next-line:typedef
  updateValue(trainingProgramAdditionalLiterature: TrainingProgramAdditionalLiterature) {
    return this.http.put(this.url, trainingProgramAdditionalLiterature);
  }
  // tslint:disable-next-line:typedef
  deleteValue(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
