import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { TrainingProgram } from '../models/TrainingProgram';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrainingProgramService {

  constructor() { }
}
