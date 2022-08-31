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

  isPermissionGranted(permission: PermissionType): boolean {
    const permissions = this.globals.permissions;
    for (const perm of permissions) {
      if (perm === permission){
        return true;
      }
    }
    return false;
  }

  reloadUserState(): void{
    this.permissionsFactory.setInstance();
  }

}
