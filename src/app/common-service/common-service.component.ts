import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class CommonService {
  saveCurriculumSectionChild$ = new Subject<number>();

  constructor() { }
}
