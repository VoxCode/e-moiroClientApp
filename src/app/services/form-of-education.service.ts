import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { FormOfEducation } from '../models/FormOfEducation';
import { environment } from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable()
export class FormOfEducationService {
  public url = environment.apiUrl + 'api/formOfEducations';
  constructor(private http: HttpClient) { }

  getValues(): Observable<any> {
    return this.http.get(this.url);
  }

  getValue(id: number): Observable<any> {
    return this.http.get(this.url + '/' + id);
  }

  createValue(formOfEducation: FormOfEducation): Observable<any> {
    return this.http.post(this.url, formOfEducation);
  }

  updateValue(formOfEducation: FormOfEducation): Observable<any> {
    return this.http.put(this.url, formOfEducation);
  }

  deleteValue(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }
}
