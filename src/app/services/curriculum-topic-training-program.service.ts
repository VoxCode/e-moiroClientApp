import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { CurriculumTopicTrainingProgram } from '../models/СurriculumTopicTrainingProgram';
import { environment } from '../../environments/environment';

@Injectable()
export class CurriculumTopicTrainingProgramService {
  public url = environment.apiUrl + 'api/CurriculumTopicTrainingPrograms';
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
  createValue(curriculumTopicTrainingProgram: CurriculumTopicTrainingProgram) {
    return this.http.post(this.url, curriculumTopicTrainingProgram);
  }
  // tslint:disable-next-line:typedef
  updateValue(curriculumTopicTrainingProgram: CurriculumTopicTrainingProgram) {
    return this.http.put(this.url, curriculumTopicTrainingProgram);
  }
  // tslint:disable-next-line:typedef
  deleteValue(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
