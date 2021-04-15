import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { OccupationForm } from '../models/OccupationForm';
import { environment } from '../../environments/environment';

@Injectable()
export class OccupationFormMaxVariableTopicHoursService {
  public url = environment.apiUrl + '/api/occupationFormMaxVariableTopicHours';
  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  getValues() {
    return this.http.get(this.url);
  }
  // tslint:disable-next-line:typedef
  getValue(trainingProgramId: number) {
    return this.http.get(this.url + '/' + trainingProgramId);
  }
  // tslint:disable-next-line:typedef
  createValue(occupationForm: OccupationForm) {
    return this.http.post(this.url, occupationForm);
  }
  // tslint:disable-next-line:typedef
  updateValue(occupationForm: OccupationForm) {
    return this.http.put(this.url, occupationForm);
  }
  // tslint:disable-next-line:typedef
  deleteValue(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
