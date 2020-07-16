import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { TheQuestion } from '../models/TheQuestion';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TheQuestionService {

  constructor() { }
}
