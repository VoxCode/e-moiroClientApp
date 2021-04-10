import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class WordToSfdtService {
  public url = environment.apiUrl + 'api/WordToSDFT';
  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  convert(docx: Blob) {
    const formData: FormData = new FormData();
    formData.append('files', docx);
    return this.http.post(this.url, formData);
  }
}
