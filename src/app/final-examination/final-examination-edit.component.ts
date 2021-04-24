import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {MDBModalRef} from 'angular-bootstrap-md';
import {CertificationTypeService} from '../services/certification-type.service';
import {CertificationType} from '../models/CertificationType';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './final-examination-edit.component.html',
  styleUrls: ['../styles/modal-form-style.scss'],
  providers: [CertificationTypeService]
})
export class FinalExaminationEditComponent implements OnInit{
  certificationTypes: CertificationType[];
  public editableRow: { id: number, first: number, second: string, third: string, last: string, handle: string };
  public saveButtonClicked: Subject<any> = new Subject<any>();

  public form: FormGroup = new FormGroup({
    id: new FormControl({value: '', disabled: true}),
    first: new FormControl({value: '', disabled: true}),
    second: new FormControl('', Validators.required),
    last: new FormControl('', Validators.required)
  });

  constructor(public modalRef: MDBModalRef, private certificationTypeService: CertificationTypeService) { }

  ngOnInit(): void {
    this.loadSectionNumber();
    this.form.controls.id.patchValue(this.editableRow.id);
    this.form.controls.first.patchValue(this.editableRow.first);
    this.form.controls.second.patchValue(this.editableRow.second);
    this.form.controls.last.patchValue(this.editableRow.last);
  }

  editRow(): void {
    this.editableRow = this.form.getRawValue();
    this.editableRow.third = this.certificationTypes.find(p => p.id === +this.editableRow.second).name;
    this.saveButtonClicked.next(this.editableRow);
    this.modalRef.hide();
  }

  get first(): AbstractControl { return this.form.get('first'); }
  get second(): AbstractControl { return this.form.get('second'); }
  get last(): AbstractControl { return this.form.get('last'); }

  loadSectionNumber(): void {
    this.certificationTypeService.getValues()
      .subscribe((data: CertificationType[]) => {
        this.certificationTypes = data;
      });
  }
}
