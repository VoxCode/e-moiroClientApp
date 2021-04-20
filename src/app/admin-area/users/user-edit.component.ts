import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {MDBModalRef} from 'angular-bootstrap-md';
import {RoleService} from '../../services/role.service';
import {Role} from '../../models/Role';
import {TeacherService} from '../../services/teacher.service';
import {Teacher} from '../../models/Teacher';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [
    RoleService,
    TeacherService,
    UserService
  ]
})

export class UserEditComponent implements OnInit{
  public roles: Role[];
  public teachers: Teacher[] = [];
  public teacherSelect: Teacher;

  public editableRow: {
    id: number,
    first: string,
    second: string,
    third: string,
    fourth: number,
    last: string,
    handle: string
  };

  public saveButtonClicked: Subject<any> = new Subject<any>();

  public form: FormGroup = new FormGroup({
    id: new FormControl({value: '', disabled: true}),
    first: new FormControl({value: '', disabled: true}),
    second: new FormControl({value: '', disabled: true}),
    third: new FormControl({value: '', disabled: true}),
    fourth: new FormControl({value: '', disabled: true}),
    last: new FormControl('', Validators.required)
  });

  constructor(
    public modalRef: MDBModalRef,
    private roleService: RoleService,
    private teacherService: TeacherService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.loadRole();
    this.form.controls.id.patchValue(this.editableRow.id);
    this.form.controls.first.patchValue(this.editableRow.first);
    this.form.controls.second.patchValue(this.editableRow.second);
    this.form.controls.third.patchValue(this.editableRow.third);
    this.form.controls.fourth.patchValue(this.editableRow.fourth);
    this.form.controls.last.patchValue(this.editableRow.last);
  }

  editRow(): void {
    this.editableRow = this.form.getRawValue();
    this.editableRow.last = this.roles.find(p => p.name === this.editableRow.last).name;
    if (this.teacherSelect.id) {
      this.editableRow.fourth = this.teacherSelect.id;
    }
    this.saveButtonClicked.next(this.editableRow);
    this.modalRef.hide();
  }

  get id(): AbstractControl { return this.form.get('id'); }
  get first(): AbstractControl { return this.form.get('first'); }
  get second(): AbstractControl { return this.form.get('second'); }
  get third(): AbstractControl { return this.form.get('third'); }
  get fourth(): AbstractControl { return this.form.get('fourth'); }
  get last(): AbstractControl { return this.form.get('last'); }

  loadRole(): void {
    this.roleService.getValues()
      .subscribe((roles: Role[]) => {
        this.roles = roles;
        this.loadTeachers();
      });
  }

  loadTeachers(): void {
    this.teacherService.getValues()
      .subscribe((teachers: Teacher[]) => {
        teachers.forEach((teacher: Teacher) => {
          teacher.fullNameForm = teacher.lastName + ' ' + teacher.firstName + ' ' +
            teacher.patronymicName + ' (' + teacher.academicRank + ')';
          this.teachers.push(teacher);
        });
        if (this.editableRow.fourth) {
          this.teacherSelect = this.teachers.find(a => a.id === this.editableRow.fourth);
        }
      });
  }

  updateUser(): void {
    if (this.teacherSelect.id) {
      this.editableRow.fourth = this.teacherSelect.id;
      this.userService.updateValue(this.editableRow.third, this.teacherSelect.id).subscribe(() => {
        console.log('Update was success');
      });
    }
  }
}
