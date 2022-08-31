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


  public setInstance(): void {
    this.globals.permissions = [];
    this.checkDepartments();
    switch (this.globals.role) {
      case 'admin':
        this.pushCRUD();
        break;
      case 'editor':
        this.pushCRUD();
        break;

      case 'creator':
        this.pushCRUD();
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

  checkDepartments(): void {
    console.log(this.globals);
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
                console.log(this.globals);
              }
            });
        }
      });
  }

  checkTeacher(): void {

  }


  private pushCRUD(): void {
    this.globals.permissions.push(PermissionType.CREATE);
    this.globals.permissions.push(PermissionType.DELETE);
    this.globals.permissions.push(PermissionType.READ);
    this.globals.permissions.push(PermissionType.UPDATE);
  }

  private pushDepartmentRelated(): void{
    this.globals.permissions.push(PermissionType.DEPARTMENTRELATED);
  }

  private pushTeacherRelated(): void{
    this.globals.permissions.push(PermissionType.TEACHERRELATED);
  }

  private onlyRead(): void {
    this.globals.permissions.push(PermissionType.READ);
  }

  private verifiedCreator(): void {
    this.globals.permissions.push(PermissionType.CREATE);
    this.globals.permissions.push(PermissionType.DELETE);
    this.globals.permissions.push(PermissionType.READ);
    this.globals.permissions.push(PermissionType.UPDATE);
  }

  private nonVerifiedCreator(): void {
    this.globals.permissions.push(PermissionType.DELETE);
    this.globals.permissions.push(PermissionType.READ);
    this.globals.permissions.push(PermissionType.UPDATE);
  }
}
