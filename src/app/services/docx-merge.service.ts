import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable()
export class DocxMergeService {
  public url = environment.apiUrl + 'api/docxMerge';
  constructor(private http: HttpClient) { }

  merge(data: any[]): Observable<any> {
    const formData: FormData = new FormData();
    data.forEach(tmp => {
      formData.append('files', tmp);
    });
    return this.http.post(this.url, formData);
  }
}
