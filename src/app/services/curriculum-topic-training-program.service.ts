import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { CurriculumTopicTrainingProgram } from '../models/СurriculumTopicTrainingProgram';
import { environment } from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable()
export class CurriculumTopicTrainingProgramService {
  public url = environment.apiUrl + 'api/CurriculumTopicTrainingPrograms';
  constructor(private http: HttpClient) { }

  getValues(): Observable<any> {
    return this.http.get(this.url);
  }
  getValue(id: number): Observable<any> {
    return this.http.get(this.url + '/' + id);
  }
  getFromTrainingProgramCurriculumSection(trainingProgramCurriculumSectionId: number): Observable<any> {
    return this.http.get(this.url + '/TrainingProgramCurriculumSection/' + trainingProgramCurriculumSectionId);
  }
  createValue(curriculumTopicTrainingProgram: CurriculumTopicTrainingProgram): Observable<any> {
    return this.http.post(this.url, curriculumTopicTrainingProgram);
  }
  updateValue(curriculumTopicTrainingProgram: CurriculumTopicTrainingProgram): Observable<any> {
    return this.http.put(this.url, curriculumTopicTrainingProgram);
  }
  deleteValue(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }
}
