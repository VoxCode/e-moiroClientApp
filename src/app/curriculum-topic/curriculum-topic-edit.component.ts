import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {MDBModalRef} from 'angular-bootstrap-md';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './curriculum-topic-edit.component.html',
  styleUrls: ['../styles/modal-form-style.scss']
})

export class CurriculumTopicEditComponent implements OnInit{
  public editableRow: {
    id: string,
    first: string,
    second: string,
    third: boolean,
    last: string,
    isCrate: boolean };
  public saveButtonClicked: Subject<any> = new Subject<any>();

  public form: FormGroup = new FormGroup({
    id: new FormControl({value: '', disabled: true}),
    first: new FormControl({value: '', disabled: true}),
    second: new FormControl('', Validators.required),
    third: new FormControl(''),
    last: new FormControl('', Validators.required)
  });

  constructor(public modalRef: MDBModalRef) { }

  ngOnInit(): void {
    this.form.controls.id.patchValue(this.editableRow.id);
    this.form.controls.first.patchValue(this.editableRow.first);
    this.form.controls.second.patchValue(this.editableRow.second);
    this.form.controls.third.patchValue(false);
    this.form.controls.last.patchValue(this.editableRow.last);
  }

  editRow(): void {
    this.editableRow = this.form.getRawValue();
    this.saveButtonClicked.next(this.editableRow);
    this.modalRef.hide();
  }

  get first(): AbstractControl { return this.form.get('first'); }
  get second(): AbstractControl { return this.form.get('second'); }
  get third(): AbstractControl { return this.form.get('third'); }
  get last(): AbstractControl { return this.form.get('last'); }
}
