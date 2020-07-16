import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Department } from '../models/Department';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor() { }
}
