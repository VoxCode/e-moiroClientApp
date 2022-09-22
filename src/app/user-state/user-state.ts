import {Teacher} from '../models/Teacher';
import {Department} from '../models/Department';
import {PermissionType} from './permissions';

export class UserState {
  teacherObj: Teacher = undefined;
  departments: Department[] = [];
  permissions: PermissionType[] = [];

  public UserState(){ // include wont work until you explicitly initialize array
    this.departments = [];
    this.permissions = [];
  }

}
