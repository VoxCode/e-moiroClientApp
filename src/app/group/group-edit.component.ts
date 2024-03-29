import {AfterViewInit, ChangeDetectorRef, Component,  ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {MDBModalRef, MDBModalService, MdbTableDirective, MdbTablePaginationComponent} from 'angular-bootstrap-md';
import {CertificationTypeService} from '../services/certification-type.service';
import {CertificationType} from '../models/CertificationType';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {IsDeleteComponent} from '../is-delete/is-delete.component';
import {TrainingProgram} from '../models/TrainingProgram';
import {TrainingProgramService} from '../services/training-program.service';
import {from} from 'rxjs/dist/types';


@Component({

  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['../styles/modal-form-style.scss', './group-edit.component.scss'],
  providers: [ TrainingProgramService],

})
export class GroupEditComponent implements OnInit {

  trainingPrograms: TrainingProgram[];
  public editableRow: {
    id: number,
    calendarYear: Date,
    classStartDate: Date,
    classEndDate: Date,
    trainingProgramId: string,
    trainingProgram: string,
    groupNumber: number };
  public saveButtonClicked: Subject<any> = new Subject<any>();

  public form: FormGroup = new FormGroup({
    id: new FormControl({value: '', disabled: true}),
    calendarYear: new FormControl({value: '', disabled: true}),
    classStartDate: new FormControl('', Validators.required),
    classEndDate: new FormControl('', Validators.required),
    trainingProgramId: new FormControl('', Validators.required),
    trainingProgram: new FormControl({value: '', disabled: true}),
    groupNumber: new FormControl('', Validators.required)
  }, { validators: [this.calendarYearValidator.bind(this)]});

  constructor(public modalRef: MDBModalRef, private trainingProgramService: TrainingProgramService) { }

  ngOnInit(): void {
    this.loadTrainingPrograms();
    this.form.controls.id.patchValue(this.editableRow.id);
    this.form.controls.groupNumber.patchValue(this.editableRow.groupNumber);
    this.form.controls.trainingProgram.patchValue(this.editableRow.trainingProgram);
    this.form.controls.calendarYear.patchValue(this.editableRow.calendarYear);
    this.form.controls.classStartDate.patchValue(this.editableRow.classStartDate);
    this.form.controls.classEndDate.patchValue(this.editableRow.classEndDate);
    this.form.controls.trainingProgramId.patchValue(this.editableRow.trainingProgramId);
    console.log(this.form);
  }

  editRow(): void {
    this.editableRow = this.form.getRawValue();
    this.editableRow.calendarYear = this.editableRow.classStartDate;
    this.editableRow.trainingProgram = this.trainingPrograms.find(p => p.id === +this.editableRow.trainingProgramId).name;
    this.saveButtonClicked.next(this.editableRow);
    this.modalRef.hide();
  }

  get trainingProgramId(): AbstractControl { return this.form.get('trainingProgramId'); }
  get groupNumber(): AbstractControl { return this.form.get('groupNumber'); }


  loadTrainingPrograms(): void {
    this.trainingProgramService.getValues()
      .subscribe((data: TrainingProgram[]) => {
        this.trainingPrograms = data;
      });
  }

  private calendarYearValidator(fg: FormGroup): ValidationErrors | null {
    const start = fg.controls.classStartDate.value;
    const end = fg.controls.classEndDate.value;
    console.log('qwe');
    console.log(start);
    console.log(end);
    if ((start == null || start == '') || (end == null || end == '')) {
      return null;
    }
    if (new Date(fg.controls.classStartDate.value).getFullYear() !== new Date(fg.controls.classEndDate.value).getFullYear()) {
      return {calendarYearValidator: true};
    }
    return null;
  }
}
