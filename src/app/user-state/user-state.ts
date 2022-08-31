import {Teacher} from '../models/Teacher';
import {Department} from '../models/Department';
import {PermissionType} from './permissions';

export class UserState {
  teacherObj: Teacher = undefined;
  departments: Department[] = [];
  permissions: PermissionType[] = [];

}
