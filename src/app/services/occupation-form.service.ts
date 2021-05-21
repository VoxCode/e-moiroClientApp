import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { OccupationForm } from '../models/OccupationForm';
import { environment } from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable()
export class OccupationFormService {
  public url = environment.apiUrl + 'api/occupationForms';
  constructor(private http: HttpClient) { }

  getValues(): Observable<any> {
    return this.http.get(this.url);
  }

  getValue(id: number): Observable<any> {
    return this.http.get(this.url + '/' + id);
  }

  createValue(occupationForm: OccupationForm): Observable<any> {
    return this.http.post(this.url, occupationForm);
  }

  updateValue(occupationForm: OccupationForm): Observable<any> {
    return this.http.put(this.url, occupationForm);
  }

  deleteValue(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }
}
