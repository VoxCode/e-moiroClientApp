import { Component, OnInit } from '@angular/core';
import {MDBModalRef} from 'angular-bootstrap-md';
import {DepartmentService} from '../../services/department.service';
import {Department} from '../../models/Department';
import {TeacherService} from '../../services/teacher.service';

@Component({
  selector: 'app-teacher-department-add-form',
  templateUrl: './teacher-department-add-form.component.html',
  styleUrls: ['./teacher-department-add-form.component.scss'],
  providers: [
    DepartmentService,
    TeacherService
  ]
})
export class TeacherDepartmentAddFormComponent implements OnInit {
  public editableRow: {
    id: number
    handle: string
  };
  departments: Department[] = [];
  selectedDepartments: Department[] = [];
  constructor(
    public modalRef: MDBModalRef,
    private teacherService: TeacherService,
    private departmentService: DepartmentService) { }

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.departmentService.getValues()
      .subscribe((departments: Department[]) => {
        this.departments = departments;
        this.loadsSelectedDepartments();
      });
  }

  loadsSelectedDepartments(): void {
    this.teacherService.getTeacherDepartment(this.editableRow.id)
      .subscribe((departmentsResponse: Department[]) => {
        if (departmentsResponse.length !== 0) {
          this.selectedDepartments = departmentsResponse;
        }
      });
  }

  save(): void {
    this.changeDepartment();
    this.modalRef.hide();
  }

  changeDepartment(): void {
    this.teacherService.addTeacherDepartment(this.editableRow.id, this.selectedDepartments)
      .subscribe(() => { console.log('Success'); });
  }
}
