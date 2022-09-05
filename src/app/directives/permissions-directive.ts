import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import {PermissionManagerService} from '../services/security/permissions-manager.service';
import {PermissionType} from '../user-state/permissions';
@Directive({
  selector: '[getPermission]'
})
export class PermissionsDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private permissionManagerS: PermissionManagerService
  ) { }
  @Input() set getPermission(permission: PermissionType){
    this.isGranted(permission);
  }
  private isGranted(permission: PermissionType): void {
    if (this.permissionManagerS.isPermissionGranted(permission)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
