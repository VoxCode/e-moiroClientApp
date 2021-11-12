import {AfterViewInit, ChangeDetectorRef, Component,  ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {MDBModalRef, MDBModalService, MdbTableDirective, MdbTablePaginationComponent} from 'angular-bootstrap-md';
import {CertificationTypeService} from '../services/certification-type.service';
import {CertificationType} from '../models/CertificationType';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {IsDeleteComponent} from '../is-delete/is-delete.component';
import {TrainingProgram} from '../models/TrainingProgram';
import {TrainingProgramService} from '../services/training-program.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@Component({

  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['../styles/modal-form-style.scss'],
  providers: [ TrainingProgramService],

})
export class GroupEditComponent implements OnInit {

  trainingPrograms: TrainingProgram[];
  public editableRow: {
    id: number,
    calendarYear: Date,
    classStartDate: Date,
    classEndDate: Date,
    trainingProgramId: number,
    trainingProgram: string,
    groupNumber: number };
  public saveButtonClicked: Subject<any> = new Subject<any>();

  public form: FormGroup = new FormGroup({
    id: new FormControl({value: '', disabled: true}),
    calendarYear: new FormControl('', Validators.required),
    classStartDate: new FormControl('', Validators.required),
    classEndDate: new FormControl('', Validators.required),
    trainingProgramId: new FormControl({value: '', disabled: true}),
    trainingProgram: new FormControl('', Validators.required),
    groupNumber: new FormControl('', Validators.required)
  });

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
  }

  editRow(): void {
    this.editableRow = this.form.getRawValue();
    this.editableRow.trainingProgram = this.trainingPrograms.find(p => p.id === +this.editableRow.trainingProgramId).name;
    this.saveButtonClicked.next(this.editableRow);
    this.modalRef.hide();
  }

  get trainingProgram(): AbstractControl { return this.form.get('trainingProgram'); }
  get groupNumber(): AbstractControl { return this.form.get('groupNumber'); }


  loadTrainingPrograms(): void {
    this.trainingProgramService.getValues()
      .subscribe((data: CertificationType[]) => {
        this.trainingPrograms = data;
      });
  }
}
