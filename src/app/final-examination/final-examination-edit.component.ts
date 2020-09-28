import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {MDBModalRef} from 'angular-bootstrap-md';
import {CertificationTypeService} from '../services/certification-type.service';
import {CertificationType} from '../models/CertificationType';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './final-examination-edit.component.html',
  providers: [CertificationTypeService]
})
export class FinalExaminationEditComponent {
  certificationTypes: CertificationType[];
  public editableRow: { id: string, first: string, second: string, third: string, last: string, handle: string };
  public saveButtonClicked: Subject<any> = new Subject<any>();

  public form: FormGroup = new FormGroup({
    id: new FormControl({value: '', disabled: true}),
    first: new FormControl({value: '', disabled: true}),
    second: new FormControl(''),
    last: new FormControl('', Validators.required)
  });

  constructor(public modalRef: MDBModalRef, private certificationTypeService: CertificationTypeService) { }

  // tslint:disable-next-line:typedef use-lifecycle-interface
  ngOnInit() {
    this.loadSectionNumber();
    this.form.controls.id.patchValue(this.editableRow.id);
    this.form.controls.first.patchValue(this.editableRow.first);
    this.form.controls.second.patchValue(this.editableRow.second);
    this.form.controls.last.patchValue(this.editableRow.last);
  }

  // tslint:disable-next-line:typedef
  editRow() {
    this.editableRow = this.form.getRawValue();
    this.editableRow.third = this.certificationTypes.find(p => p.id === +this.editableRow.second).name;
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
  loadSectionNumber() {
    this.certificationTypeService.getValues()
      .subscribe((data: CertificationType[]) => {
        this.certificationTypes = data;
      });
  }
}
