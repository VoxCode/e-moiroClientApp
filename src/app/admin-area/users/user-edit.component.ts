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
  public teachers: Teacher[];
  public teacherSelect: Teacher;

  public editableRow: { first: string, second: string, last: string, handle: string };
  public saveButtonClicked: Subject<any> = new Subject<any>();

  public form: FormGroup = new FormGroup({
    first: new FormControl({value: '', disabled: true}),
    second: new FormControl({value: '', disabled: true}),
    last: new FormControl('', Validators.required)
  });

  constructor(
    public modalRef: MDBModalRef,
    private roleService: RoleService,
    private teacherService: TeacherService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.loadRole();
    this.form.controls.first.patchValue(this.editableRow.first);
    this.form.controls.second.patchValue(this.editableRow.second);
    this.form.controls.last.patchValue(this.editableRow.last);
  }

  editRow(): void {
    this.editableRow = this.form.getRawValue();
    this.editableRow.last = this.roles.find(p => p.name === this.editableRow.last).name;
    this.saveButtonClicked.next(this.editableRow);
    this.modalRef.hide();
  }

  get first(): AbstractControl { return this.form.get('first'); }
  get second(): AbstractControl { return this.form.get('second'); }
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
        this.teachers = teachers;
      });
  }

  updateUser(): void {
    // this.userService.updateValue().subscribe();
  }
}
