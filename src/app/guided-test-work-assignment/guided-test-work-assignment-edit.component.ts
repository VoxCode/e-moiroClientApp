import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {MDBModalRef} from 'angular-bootstrap-md';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './guided-test-work-assignment-edit.component.html',
  styleUrls: ['../styles/modal-form-style.scss']
})
export class GuidedTestWorkAssignmentEditComponent implements OnInit{

  public editableRow: { id: string, content: string, serialNumber: number, curriculumTopicTrainingProgramId: number };
  public saveButtonClicked: Subject<any> = new Subject<any>();

  public form: FormGroup = new FormGroup({
    id: new FormControl({value: '', disabled: true}),
    content: new FormControl('', Validators.required),
    serialNumber: new FormControl({value: '', disabled: true}),
    curriculumTopicTrainingProgramId: new FormControl({value: '', disabled: true})
  });

  constructor(public modalRef: MDBModalRef) { }

  ngOnInit(): void {
    this.form.controls.id.patchValue(this.editableRow.id);
    this.form.controls.content.patchValue(this.editableRow.content);
    this.form.controls.serialNumber.patchValue(this.editableRow.serialNumber);
    this.form.controls.curriculumTopicTrainingProgramId.patchValue(this.editableRow.curriculumTopicTrainingProgramId);
  }

  editRow(): void {
    this.editableRow = this.form.getRawValue();
    this.saveButtonClicked.next(this.editableRow);
    this.modalRef.hide();
  }

  get id(): AbstractControl { return this.form.get('id'); }
  get content(): AbstractControl { return this.form.get('content'); }
  get serialNumber(): AbstractControl { return this.form.get('serialNumber'); }
  get curriculumTopicTrainingProgramId(): AbstractControl { return this.form.get('curriculumTopicTrainingProgramId'); }
}
