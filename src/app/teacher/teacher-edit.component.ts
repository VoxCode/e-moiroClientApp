import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {MDBModalRef} from 'angular-bootstrap-md';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './teacher-edit.component.html',
  styleUrls: ['../styles/modal-form-style.scss']
})
export class TeacherEditComponent implements OnInit{
  public editableRow: {
    id: string,
    first: string,
    second: string,
    third: string,
    fourth: string,
    fifth: string,
    sixth: string,
    seventh: string,
    handle: string
  };

  public saveButtonClicked: Subject<any> = new Subject<any>();

  public form: FormGroup = new FormGroup({
    id: new FormControl({value: '', disabled: true}),
    first: new FormControl({value: '', disabled: true}),
    second: new FormControl('', Validators.required),
    third: new FormControl('', Validators.required),
    fourth: new FormControl('', Validators.required),
    fifth: new FormControl('', Validators.required),
    sixth: new FormControl(''),
    seventh: new FormControl('')
  });

  constructor(public modalRef: MDBModalRef) { }

  ngOnInit(): void {
    this.form.controls.id.patchValue(this.editableRow.id);
    this.form.controls.first.patchValue(this.editableRow.first);
    this.form.controls.second.patchValue(this.editableRow.second);
    this.form.controls.third.patchValue(this.editableRow.third);
    this.form.controls.fourth.patchValue(this.editableRow.fourth);
    this.form.controls.fifth.patchValue(this.editableRow.fifth);
    this.form.controls.sixth.patchValue(this.editableRow.sixth);
    this.form.controls.seventh.patchValue(this.editableRow.seventh);
  }

  editRow(): void {
    this.editableRow = this.form.getRawValue();
    this.saveButtonClicked.next(this.editableRow);
    this.modalRef.hide();
  }

  get first(): AbstractControl { return this.form.get('first'); }
  get second(): AbstractControl { return this.form.get('second'); }
  get third(): AbstractControl { return this.form.get('third'); }
  get fourth(): AbstractControl { return this.form.get('fourth'); }
  get fifth(): AbstractControl { return this.form.get('fifth'); }
  get sixth(): AbstractControl { return this.form.get('sixth'); }
  get seventh(): AbstractControl { return this.form.get('seventh'); }
}
