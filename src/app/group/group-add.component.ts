import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { GroupService } from '../services/group.service';
import { Group } from '../models/Group';
import {FormOfEducation} from '../models/FormOfEducation';
import {FormOfEducationService} from '../services/form-of-education.service';
import {Department} from '../models/Department';
import {DepartmentService} from '../services/department.service';
import {StudentCategory} from '../models/StudentCategory';
import {TeacherCategoryService} from '../services/student-category.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-group',
  templateUrl: './group-add.component.html',
  styleUrls: ['./group-add.component.scss'],
  providers: [
    GroupService,
    DepartmentService,
    TeacherCategoryService,
    FormOfEducationService ]
})
export class GroupAddComponent implements OnInit {
  value: Group = new Group();
  values: Group[];
  department: Department;
  departments: Department[];
  teacherCategory: StudentCategory;
  teacherCategories: StudentCategory[];
  formOfEducation: FormOfEducation;
  formOfEducations: FormOfEducation[];

  public form: FormGroup = new FormGroup({
    id: new FormControl({value: '', disabled: true}),
    first: new FormControl({value: '', disabled: true}),
    second: new FormControl('', Validators.required),
    third: new FormControl('', Validators.required),
    fourth: new FormControl('', Validators.required),
    fifth: new FormControl('0', Validators.min(1)),
    sixth: new FormControl('', Validators.required),
    seventh: new FormControl('', Validators.required),
    eight: new FormControl('', Validators.required),
    ninth: new FormControl('0', Validators.min(1)),
    tenth: new FormControl('0', Validators.min(1))
  });

  constructor(
    public router: Router,
    private valueService: GroupService,
    private departmentService: DepartmentService,
    private teacherCategoryService: TeacherCategoryService,
    private formOfEducationService: FormOfEducationService) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.loadFormOfEducation();
    this.loadDepartment();
    this.loadTeacherCategory();
  }

  // tslint:disable-next-line:typedef
  loadFormOfEducation() {
    this.formOfEducationService.getValues()
      .subscribe((data: FormOfEducation[]) => {
        this.formOfEducations = data;
      });
  }

  // tslint:disable-next-line:typedef
  loadDepartment() {
    this.departmentService.getValues()
      .subscribe((data: Department[]) => {
        this.departments = data;
      });
  }

  // tslint:disable-next-line:typedef
  loadTeacherCategory() {
    this.teacherCategoryService.getValues()
      .subscribe((data: StudentCategory[]) => {
        this.teacherCategories = data;
      });
  }

  // tslint:disable-next-line:typedef
  saveValue() {
    this.value.groupNumber = +this.form.get('second').value;
    this.value.calendarYear = this.form.get('third').value;
    this.value.theTopicOfContinuingEducation = this.form.get('fourth').value;
    this.value.formOfEducationId = +this.form.get('fifth').value;
    this.value.classStartDate = this.form.get('sixth').value;
    this.value.classEndDate = this.form.get('seventh').value;
    this.value.numberOfHours = +this.form.get('eight').value;
    this.value.teacherCategoryId = +this.form.get('ninth').value;
    this.value.departmentId = +this.form.get('tenth').value;

    this.valueService.createValue(this.value)
      .subscribe((data: Group) => {
        if (data !== undefined) {
        console.log('Success');
        this.router.navigate(['/group']);
        }
      });
  }
}
