import {PermissionType} from './permissions';

export abstract class PermissionBase {
  public permissions: PermissionType[];
  constructor() {}
}
