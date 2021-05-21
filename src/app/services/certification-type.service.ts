import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { CertificationType } from '../models/CertificationType';
import { environment } from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable()
export class CertificationTypeService {
  public url = environment.apiUrl + 'api/CertificationTypes';
  constructor(private http: HttpClient) { }

  getValues(): Observable<any> {
    return this.http.get(this.url);
  }

  getValue(id: number): Observable<any> {
    return this.http.get(this.url + '/' + id);
  }

  createValue(certificationType: CertificationType): Observable<any> {
    return this.http.post(this.url, certificationType);
  }

  updateValue(certificationType: CertificationType): Observable<any> {
    return this.http.put(this.url, certificationType);
  }

  deleteValue(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }
}
