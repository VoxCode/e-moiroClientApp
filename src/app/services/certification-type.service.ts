import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { CertificationType } from '../models/CertificationType';
import { environment } from '../../environments/environment';

@Injectable()
export class CertificationTypeService {
  public url = environment.apiUrl + 'api/CertificationTypes';
  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  getValues() {
    return this.http.get(this.url);
  }
  // tslint:disable-next-line:typedef
  getValue(id: number) {
    return this.http.get(this.url + '/' + id);
  }
  // tslint:disable-next-line:typedef
  createValue(certificationType: CertificationType) {
    return this.http.post(this.url, certificationType);
  }
  // tslint:disable-next-line:typedef
  updateValue(certificationType: CertificationType) {
    return this.http.put(this.url, certificationType);
  }
  // tslint:disable-next-line:typedef
  deleteValue(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}