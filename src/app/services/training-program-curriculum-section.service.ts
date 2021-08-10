import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { TrainingProgramCurriculumSection } from '../models/TrainingProgramCurriculumSection';
import { environment } from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable()
export class TrainingProgramCurriculumSectionService {
  public url = environment.apiUrl + 'api/TrainingProgramCurriculumSections';
  constructor(private http: HttpClient) { }

  getValues(): Observable<any> {
    return this.http.get(this.url);
  }
  getValue(id: number): Observable<any> {
    return this.http.get(this.url + '/' + id);
  }
  getFromTrainingProgram(trainingProgramId: number): Observable<any> {
    return this.http.get(this.url + '/FromTrainingProgram/' + trainingProgramId);
  }
  createValue(trainingProgramCurriculumSection: TrainingProgramCurriculumSection): Observable<any> {
    return this.http.post(this.url, trainingProgramCurriculumSection);
  }
  updateValue(trainingProgramCurriculumSection: TrainingProgramCurriculumSection): Observable<any> {
    return this.http.put(this.url, trainingProgramCurriculumSection);
  }
  deleteValue(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }
}
