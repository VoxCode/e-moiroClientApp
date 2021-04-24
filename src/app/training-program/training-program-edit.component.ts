import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {MDBModalRef} from 'angular-bootstrap-md';
import {DepartmentService} from '../services/department.service';
import {StudentCategoryService} from '../services/student-category.service';
import {CertificationTypeService} from '../services/certification-type.service';
import {Department} from '../models/Department';
import {StudentCategory} from '../models/StudentCategory';
import {CertificationType} from '../models/CertificationType';
import {FormOfEducation} from '../models/FormOfEducation';
import {FormOfEducationService} from '../services/form-of-education.service';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './training-program-edit.component.html',
  styleUrls: ['../styles/modal-form-style.scss'],
  providers: [
    DepartmentService,
    StudentCategoryService,
    CertificationTypeService,
    FormOfEducationService,
  ]
})
export class TrainingProgramEditComponent implements OnInit{
  departments: Department[];
  studentCategories: StudentCategory[];
  certificationTypes: CertificationType[];
  formOfEducations: FormOfEducation[];
  isDistanceLearning: any;
  public editableRow: {
    id: string,
    first: string,
    second: string,
    third: string,
    fourth: boolean,
    fifth: boolean,
    sixth: boolean,
    seventh: string,
    eight: string,
    ninth: string,
    tenth: string,
    eleventh: string,
    twelfth: string,
    thirteenth: string,
    fourteenth: string,
    handle: string };
  public saveButtonClicked: Subject<any> = new Subject<any>();

  public form: FormGroup = new FormGroup({
    id: new FormControl({value: '', disabled: true}),      // index
    first: new FormControl({value: '', disabled: true}),   // id
    second: new FormControl('', Validators.required),      // name
    third: new FormControl('', Validators.required),       // numberOfHours
    fourth: new FormControl(''),                           // isDistanceLearning
    fifth: new FormControl(''),                            // isControlWork
    sixth: new FormControl(''),                            // isTestWork
    seventh: new FormControl('', Validators.required),     // departmentId
    ninth: new FormControl('', Validators.required),       // studentCategoryId
    eleventh: new FormControl('', Validators.required),    // certificationTypeId
    thirteenth: new FormControl('', Validators.required)   // formOfEducationId
  });

  constructor(
    public modalRef: MDBModalRef,
    private departmentService: DepartmentService,
    private studentCategoryService: StudentCategoryService,
    private certificationTypeService: CertificationTypeService,
    private formOfEducationService: FormOfEducationService
  ) { }


  ngOnInit(): void {
    this.loadDepartment();
    this.loadStudentCategory();
    this.loadCertificationType();
    this.loadFormOfEducation();
    this.isDistanceLearning = this.editableRow.fourth;
    this.form.controls.id.patchValue(this.editableRow.id);
    this.form.controls.first.patchValue(this.editableRow.first);
    this.form.controls.second.patchValue(this.editableRow.second);
    this.form.controls.third.patchValue(this.editableRow.third);
    this.form.controls.fourth.patchValue(this.editableRow.fourth);
    this.form.controls.fifth.patchValue(this.editableRow.fifth);
    this.form.controls.sixth.patchValue(this.editableRow.sixth);
    this.form.controls.seventh.patchValue(this.editableRow.seventh);
    this.form.controls.ninth.patchValue(this.editableRow.ninth);
    this.form.controls.eleventh.patchValue(this.editableRow.eleventh);
    this.form.controls.thirteenth.patchValue(this.editableRow.thirteenth);
  }

  editRow(): void {
    this.editableRow = this.form.getRawValue();
    this.editableRow.eight = this.departments.find(p => p.id === +this.editableRow.seventh).name;
    this.editableRow.tenth = this.studentCategories.find(p => p.id === +this.editableRow.ninth).name;
    this.editableRow.twelfth = this.certificationTypes.find(p => p.id === +this.editableRow.eleventh).name;
    this.editableRow.fourteenth = this.formOfEducations.find(p => p.id === +this.editableRow.thirteenth).name;
    this.saveButtonClicked.next(this.editableRow);
    this.modalRef.hide();
  }

  get first(): AbstractControl { return this.form.get('first'); }
  get second(): AbstractControl  { return this.form.get('second'); }
  get third(): AbstractControl  { return this.form.get('third'); }
  get fourth(): AbstractControl  { return this.form.get('fourth'); }
  get fifth(): AbstractControl  { return this.form.get('fifth'); }
  get sixth(): AbstractControl  { return this.form.get('sixth'); }
  get seventh(): AbstractControl  { return this.form.get('seventh'); }
  get ninth(): AbstractControl  { return this.form.get('ninth'); }
  get eleventh(): AbstractControl  { return this.form.get('eleventh'); }
  get thirteenth(): AbstractControl  { return this.form.get('thirteenth'); }

  loadDepartment(): void {
    this.departmentService.getValues()
      .subscribe((data: Department[]) => {
        this.departments = data;
      });
  }

  loadStudentCategory(): void {
    this.studentCategoryService.getValues()
      .subscribe((data: StudentCategory[]) => {
        this.studentCategories = data;
      });
  }

  loadCertificationType(): void {
    this.certificationTypeService.getValues()
      .subscribe((data: CertificationType[]) => {
        this.certificationTypes = data;
      });
  }

  loadFormOfEducation(): void {
    this.formOfEducationService.getValues()
      .subscribe((data: FormOfEducation[]) => {
        this.formOfEducations = data;
      });
  }

  changeIsDistanceLearning(el: boolean): void {
    this.isDistanceLearning = el;
  }
}
