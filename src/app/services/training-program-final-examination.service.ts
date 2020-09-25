import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { TrainingProgramFinalExamination } from '../models/TrainingProgramFinalExamination';
import { environment } from '../../environments/environment';

@Injectable()
export class TrainingProgramFinalExaminationService {
  public url = environment.apiUrl + 'api/TrainingProgramFinalExaminations';
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
  createValue(trainingProgramFinalExamination: TrainingProgramFinalExamination) {
    return this.http.post(this.url, trainingProgramFinalExamination);
  }
  // tslint:disable-next-line:typedef
  updateValue(trainingProgramFinalExamination: TrainingProgramFinalExamination) {
    return this.http.put(this.url, trainingProgramFinalExamination);
  }
  // tslint:disable-next-line:typedef
  deleteValue(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
