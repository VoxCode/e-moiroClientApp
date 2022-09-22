import {Injectable} from '@angular/core';
import {PermissionType} from '../../user-state/permissions';
import {PermissionsFactory} from '../../user-state/permissions-factory';
import {Globals} from '../../globals';

@Injectable({
  providedIn: 'root'
})

export class PermissionManagerService {
  constructor(private globals: Globals,
              private permissionsFactory: PermissionsFactory) { }

  public isPermissionGranted(permission: PermissionType): boolean {
    for (const perm of this.globals.permissions) {
      if (perm === permission){
        return true;
      }
    }
    return false;
  }

  public isDepartmentRelatedPermissionGranted(): boolean{
    for (const perm of this.globals.permissions) {
      if (perm === PermissionType.DEPARTMENTRELATED){
        return true;
      }
    }
  }

  reloadUserState(): void{
    this.permissionsFactory.setInstance();
  }

}
