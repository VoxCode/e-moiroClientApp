import { Component, OnInit } from '@angular/core';
import {MDBModalRef} from 'angular-bootstrap-md';
import {TeacherDepartmentService} from '../services/teacher-department.service';
import {TeacherDepartment} from '../models/TeacherDepartment';

@Component({
  selector: 'app-teacher-department-add-form',
  templateUrl: './teacher-department-add-form.component.html',
  styleUrls: ['./teacher-department-add-form.component.scss'],
  providers: [
    TeacherDepartmentService
  ]
})
export class TeacherDepartmentAddFormComponent implements OnInit {
  public editableRow: {
    id: number
    handle: string
  };
  teacherDepartments: TeacherDepartment[] = [];
  constructor(
    public modalRef: MDBModalRef,
    private teacherDepartmentService: TeacherDepartmentService) { }

  ngOnInit(): void {
    this.loadTeacherDepartments();
    console.log(this.editableRow.id);
  }

  loadTeacherDepartments(): void {
    this.teacherDepartmentService.getDepartmentsForCurrentTeacher(this.editableRow.id)
      .subscribe((teacherDepartments: TeacherDepartment[]) => {
        this.teacherDepartments = teacherDepartments;
      });
  }

  save(): void {
    this.modalRef.hide();
  }
}
