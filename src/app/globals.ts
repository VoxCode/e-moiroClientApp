import { Injectable } from '@angular/core';
import {UserState} from './user-state/user-state';

@Injectable()
export class Globals extends UserState{
  role = 'viewer';
  name = 'guest';
  userId = 'empty';
}
