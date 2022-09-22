import {Globals} from '../globals';
import {PermissionType} from './permissions';
import {HttpClient} from '@angular/common/http';
import {TeacherService} from '../services/teacher.service';
import {Teacher} from '../models/Teacher';
import {Injectable} from '@angular/core';
import {Department} from '../models/Department';

@Injectable()
export class PermissionsFactory {
  constructor(
    private globals: Globals,
    private http: HttpClient,
    private teacherService: TeacherService) {
  }

  tempPermList: PermissionType[] = [];

  public setInstance(): void {
    this.getFromLocalStorage();
    switch (this.globals.role) {
      case 'admin':
        this.pushCRUD();
        this.checkDepartments();
        break;
      case 'editor':
        this.pushCRUD();
        this.checkDepartments();
        break;

      case 'creator':
        this.pushCRUD();
        this.checkDepartments();
        break;

      case 'dean':
        this.pushCRUD();
        break;

      case 'viewer':
        this.onlyRead();
        break;

      default:
        this.onlyRead();
        break;
    }
  }

  private getFromLocalStorage(): void{
    this.globals.permissions = JSON.parse(localStorage.getItem('permissions'));
  }

  private writeToLocalStorage(): void{
    localStorage.setItem('permissions', JSON.stringify(this.tempPermList));
    this.globals.permissions = this.tempPermList;
  }

  checkDepartments(): void {
    this.teacherService.GetValueByUserId(this.globals.userId)
      .subscribe((teacher: Teacher) => {
        if (teacher) {
          this.globals.teacherObj = teacher;
          this.pushTeacherRelated();
          this.teacherService.getTeacherDepartment(teacher.id)
            .subscribe((departments: Department[]) => {
              if (departments.length > 0) {
                this.globals.departments = departments;
                this.pushDepartmentRelated();
              }
              this.writeToLocalStorage();
            });
        }
        this.writeToLocalStorage();
      });
  }

  checkTeacher(): void {

  }

  private tryPush(permission: PermissionType): void{
    if (!this.tempPermList.includes(permission)){
      //this.globals.permissions.push(permission);
      this.tempPermList.push(permission);
    }
  }

  private pushCRUD(): void {
    this.tryPush(PermissionType.CREATE);
    this.tryPush(PermissionType.DELETE);
    this.tryPush(PermissionType.READ);
    this.tryPush(PermissionType.UPDATE);
  }

  private pushDepartmentRelated(): void{
    this.tryPush(PermissionType.DEPARTMENTRELATED);
  }

  private pushTeacherRelated(): void{
    this.tryPush(PermissionType.TEACHERRELATED);
  }

  private onlyRead(): void {
    this.tryPush(PermissionType.READ);
  }
}
