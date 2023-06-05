import {Injectable} from '@angular/core';
import {TrainingProgram} from '../models/TrainingProgram';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class TrainingProgramConstructorService {
  private trainingProgram: TrainingProgram;
  public forceUpdate = false;
  public url = environment.apiUrl + 'api/TrainingPrograms';
  constructor(
    private http: HttpClient) {
  }

  public TrainingProgram(trainingProgramId: number): Observable<TrainingProgram> {
    if (!this.trainingProgram || this.forceUpdate || +this.trainingProgram.id !== +trainingProgramId) {
      const response = this.http.get(this.url + '/' + trainingProgramId);
      response.subscribe((trainingProgramResponse: TrainingProgram) => {
        this.trainingProgram = trainingProgramResponse;
      });
      this.forceUpdate = false;
      return response;
    }
    else {
      const response = new BehaviorSubject<TrainingProgram>(this.trainingProgram);
      return response.asObservable();
    }
  }
}
