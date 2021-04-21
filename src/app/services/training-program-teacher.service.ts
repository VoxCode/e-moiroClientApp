import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { TrainingProgramTeacher } from '../models/TrainingProgramTeacher';
import { environment } from '../../environments/environment';

@Injectable()
export class TrainingProgramTeacherService {
  public url = environment.apiUrl + 'api/TrainingProgramTeachers';
  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  getValues() {
    return this.http.get(this.url);
  }
  // tslint:disable-next-line:typedef
  getTrainingProgramTeachers(id: number) {
    return this.http.get(this.url + '/' + id);
  }
  // tslint:disable-next-line:typedef
  createValue(trainingProgramTeacher: TrainingProgramTeacher) {
    return this.http.post(this.url, trainingProgramTeacher);
  }
  // tslint:disable-next-line:typedef
  updateValue(trainingProgramTeacher: TrainingProgramTeacher) {
    return this.http.put(this.url, trainingProgramTeacher);
  }
  // tslint:disable-next-line:typedef
  deleteValue(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
