import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {MDBModalRef} from 'angular-bootstrap-md';
import {RoleService} from '../../services/role.service';
import {Role} from '../../models/Role';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [RoleService]
})
export class UserEditComponent implements OnInit{
  public roles: Role[];

  public editableRow: { first: string, second: string, last: string, handle: string };
  public saveButtonClicked: Subject<any> = new Subject<any>();

  public form: FormGroup = new FormGroup({
    first: new FormControl({value: '', disabled: true}),
    second: new FormControl({value: '', disabled: true}),
    last: new FormControl('', Validators.required)
  });

  constructor(
    public modalRef: MDBModalRef,
    private roleService: RoleService) { }


  ngOnInit(): void {
    this.loadRole();
    this.form.controls.first.patchValue(this.editableRow.first);
    this.form.controls.second.patchValue(this.editableRow.second);
    this.form.controls.last.patchValue(this.editableRow.last);
  }

  // tslint:disable-next-line:typedef
  editRow() {
    this.editableRow = this.form.getRawValue();
    this.editableRow.last = this.roles.find(p => p.name === this.editableRow.last).name;
    this.saveButtonClicked.next(this.editableRow);
    this.modalRef.hide();
  }

  // tslint:disable-next-line:typedef
  get first() { return this.form.get('first'); }

  // tslint:disable-next-line:typedef
  get second() { return this.form.get('second'); }

  // tslint:disable-next-line:typedef
  get last() { return this.form.get('last'); }

  // tslint:disable-next-line:typedef
  loadRole() {
    this.roleService.getValues()
      .subscribe((data: Role[]) => {
        this.roles = data;
      });
  }
}
