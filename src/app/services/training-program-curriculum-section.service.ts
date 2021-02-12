import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { TrainingProgramCurriculumSection } from '../models/TrainingProgramCurriculumSection';
import { environment } from '../../environments/environment';

@Injectable()
export class TrainingProgramCurriculumSectionService {
  public url = environment.apiUrl + 'api/TrainingProgramCurriculumSections';
  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  getValues() {
    return this.http.get(this.url);
  }
  // tslint:disable-next-line:typedef
  getSelectValues(departmentId: number) {
    return this.http.get(this.url + '/' + departmentId + '/' + 1);
  }
  // tslint:disable-next-line:typedef
  getValue(id: number) {
    return this.http.get(this.url + '/' + id);
  }
  // tslint:disable-next-line:typedef
  createValue(trainingProgramCurriculumSection: TrainingProgramCurriculumSection) {
    return this.http.post(this.url, trainingProgramCurriculumSection);
  }
  // tslint:disable-next-line:typedef
  updateValue(trainingProgramCurriculumSection: TrainingProgramCurriculumSection) {
    return this.http.put(this.url, trainingProgramCurriculumSection);
  }
  // tslint:disable-next-line:typedef
  deleteValue(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
