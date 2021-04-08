import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class HtmlToDocxService {
  public url = environment.apiUrl + 'api/htmlToDocx';
  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  convert(data: string) {
    return this.http.post(this.url, data);
  }
}
