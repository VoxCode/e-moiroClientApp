import { Component, OnInit } from '@angular/core';
import {MDBModalRef} from 'angular-bootstrap-md';
import {TeacherDepartmentService} from '../../services/teacher-department.service';
import {TeacherDepartment} from '../../models/TeacherDepartment';
import {DepartmentService} from '../../services/department.service';
import {Department} from '../../models/Department';

@Component({
  selector: 'app-teacher-department-add-form',
  templateUrl: './teacher-department-add-form.component.html',
  styleUrls: ['./teacher-department-add-form.component.scss'],
  providers: [
    TeacherDepartmentService,
    DepartmentService
  ]
})
export class TeacherDepartmentAddFormComponent implements OnInit {
  public editableRow: {
    id: number
    handle: string
  };
  teacherDepartments: TeacherDepartment[] = [{}];
  departments: Department[] = [];
  constructor(
    public modalRef: MDBModalRef,
    private teacherDepartmentService: TeacherDepartmentService,
    private departmentService: DepartmentService) { }

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.departmentService.getValues()
      .subscribe((departments: Department[]) => {
        this.departments = departments;
        this.loadTeacherDepartments();
      });
  }

  loadTeacherDepartments(): void {
    this.teacherDepartmentService.getDepartmentsForCurrentTeacher(this.editableRow.id)
      .subscribe((teacherDepartments: TeacherDepartment[]) => {
        if (teacherDepartments.length !== 0) {
          this.teacherDepartments = teacherDepartments;
        }
      });
  }

  save(): void {
    this.modalRef.hide();
  }

  addTeacherDepartment(): void {
    this.teacherDepartments.push({});
  }

  changeDepartment(value: any, el: TeacherDepartment): void {
    const teacherDepartment = new TeacherDepartment();
    teacherDepartment.departmentId = +value;
    teacherDepartment.teacherId = +this.editableRow.id;
    if (el.id){
      teacherDepartment.id = el.id;
      this.updateCurriculumTopicDepartment(teacherDepartment);
    }
    else {
      this.postCurriculumTopicDepartment(teacherDepartment);
    }
  }

  removeDepartment(i: number, id: number): void {
    this.teacherDepartments.splice(i, 1);
    this.teacherDepartmentService.deleteValue(id).subscribe();
  }

  postCurriculumTopicDepartment(teacherDepartment: TeacherDepartment): void {
    this.teacherDepartmentService.createValue(teacherDepartment)
      .subscribe((teacherDepartmentResponse: TeacherDepartment) => {
        const tmpTeacherDepartment = this.teacherDepartments.find(a => !a.departmentId);
        const index = this.teacherDepartments.indexOf(tmpTeacherDepartment);
        this.teacherDepartments[index].id = teacherDepartmentResponse.id;
      });
  }

  updateCurriculumTopicDepartment(teacherDepartment: TeacherDepartment): void {
    this.teacherDepartmentService.updateValue(teacherDepartment)
      .subscribe();
  }
}
