import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {MDBModalRef} from 'angular-bootstrap-md';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './additional-literature-edit.component.html',
  styleUrls: ['../styles/modal-form-style.scss']
})
export class AdditionalLiteratureEditComponent implements OnInit{

  public editableRow: { id: string, first: string, third: boolean, last: string, accessDate: Date, accessDateEnabled: boolean, isCrate: boolean };
  public saveButtonClicked: Subject<any> = new Subject<any>();

  public form: FormGroup = new FormGroup({
    id: new FormControl({value: '', disabled: true}),
    first: new FormControl({value: '', disabled: true}),
    third: new FormControl(''),
    last: new FormControl('', Validators.required),
    accessDateEnabled: new FormControl({value: true}),
    accessDate: new FormControl({value: new Date().toISOString(), disabled: true}),
  });

  constructor(public modalRef: MDBModalRef) { }

  ngOnInit(): void {
    this.form.controls.id.patchValue(this.editableRow.id);
    this.form.controls.first.patchValue(this.editableRow.first);
    this.form.controls.third.patchValue(false);
    this.form.controls.last.patchValue(this.editableRow.last);
    this.form.controls.accessDate.patchValue(this.editableRow.accessDate);
    this.form.controls.accessDateEnabled.patchValue(this.editableRow.accessDateEnabled);

    if (this.editableRow.accessDateEnabled) {
      this.form.get('accessDate').enable();
    } else {
      this.form.get('accessDate').disable();
    }


    this.form.get('accessDateEnabled').valueChanges.subscribe(v => {
      if (v) {
        this.form.get('accessDate').enable();
      } else {
        this.form.get('accessDate').disable();
      }
    });
  }

  editRow(): void {
    this.editableRow = this.form.getRawValue();
    this.saveButtonClicked.next(this.editableRow);
    this.modalRef.hide();
  }

  get first(): AbstractControl { return this.form.get('first'); }
  get last(): AbstractControl { return this.form.get('last'); }
  get third(): AbstractControl { return this.form.get('third'); }
  get accessDate(): AbstractControl { return this.form.get('accessDate'); }
  get accessDateEnabled(): AbstractControl { return this.form.get('accessDateEnabled'); }
}
