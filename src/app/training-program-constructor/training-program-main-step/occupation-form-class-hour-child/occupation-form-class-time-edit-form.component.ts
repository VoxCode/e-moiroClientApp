import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {MDBModalRef} from 'angular-bootstrap-md';
import {OccupationFormService} from '../../../services/occupation-form.service';
import {OccupationForm} from '../../../models/OccupationForm';

@Component({
  selector: 'app-occupation-form-class-time--edit-form',
  templateUrl: './occupation-form-class-time-edit-form.component.html',
  styleUrls: ['../../../styles/modal-form-style.scss'],
  providers: [OccupationFormService]
})
export class OccupationFormClassTimeEditFormComponent implements OnInit{

  public editableRow: {occupationFormId: string, classHours: number, fullName: string};
  public saveButtonClicked: Subject<any> = new Subject<any>();
  occupationForms: OccupationForm[];

  public form: FormGroup = new FormGroup({
    occupationFormId: new FormControl('', Validators.required),
    classHours: new FormControl('', [
      Validators.required, Validators.maxLength(1), Validators.min(0), Validators.max(9)])
  });

  constructor(
    public modalRef: MDBModalRef,
    private occupationFormService: OccupationFormService) { }

  ngOnInit(): void {
    this.loadOccupationForms();
    this.form.controls.occupationFormId.patchValue(this.editableRow.occupationFormId);
    this.form.controls.classHours.patchValue(this.editableRow.classHours);
  }

  editRow(): void {
    this.editableRow = this.form.getRawValue();
    this.editableRow.fullName = this.occupationForms.find(a => a.id === +this.editableRow.occupationFormId).fullName;
    this.saveButtonClicked.next(this.editableRow);
    this.modalRef.hide();
  }

  get occupationFormId(): AbstractControl { return this.form.get('occupationFormId'); }
  get classHours(): AbstractControl { return this.form.get('classHours'); }
  get fullName(): AbstractControl { return this.form.get('fullName'); }

  loadOccupationForms(): void {
    this.occupationFormService.getValues()
      .subscribe((data: OccupationForm[]) => {
        this.occupationForms = data;
      });
  }
}
