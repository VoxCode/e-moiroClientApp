import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Teacher } from '../models/Teacher';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor() { }
}
