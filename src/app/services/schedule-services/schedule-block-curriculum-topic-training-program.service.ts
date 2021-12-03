import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {ScheduleBlockCurriculumTopicTrainingProgram} from '../../models/schedule-models/ScheduleBlockCurriculumTopicTrainingProgram';
import { environment } from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable()
export class ScheduleBlockCurriculumTopicTrainingProgramService {
  public url = environment.apiUrl + 'api/ScheduleBlockCurriculumTopicTrainingPrograms';
  constructor(private http: HttpClient) { }

  getValues(): Observable<any> {
    return this.http.get(this.url);
  }

  getValue(id: number): Observable<any> {
    return this.http.get(this.url + '/' + id);
  }

  getValuesFromScheduleBlock(scheduleBlockId: number): Observable<any> { // change dat shit
    return this.http.get(this.url + '/FromScheduleBlock/' + scheduleBlockId);
  }

  updateSerialNumbers(scheduleBlockCurriculumTopicTrainingPrograms: ScheduleBlockCurriculumTopicTrainingProgram[]): Observable<any> {
    return this.http.put(this.url + '/SerialNumbers', scheduleBlockCurriculumTopicTrainingPrograms);
  }

  createValue(scheduleBlockCurriculumTopicTrainingProgram: ScheduleBlockCurriculumTopicTrainingProgram): Observable<any> {
    return this.http.post(this.url, scheduleBlockCurriculumTopicTrainingProgram);
  }

  updateValue(scheduleBlockCurriculumTopicTrainingProgram: ScheduleBlockCurriculumTopicTrainingProgram): Observable<any> {
    return this.http.put(this.url, scheduleBlockCurriculumTopicTrainingProgram);
  }

  deleteValue(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }
}
