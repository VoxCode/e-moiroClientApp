import {Component} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {MDBModalRef} from 'angular-bootstrap-md';
import {DepartmentService} from '../services/department.service';
import {StudentCategoryService} from '../services/student-category.service';
import {CertificationTypeService} from '../services/certification-type.service';
import {Department} from '../models/Department';
import {StudentCategory} from '../models/StudentCategory';
import {CertificationType} from '../models/CertificationType';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './training-program-edit.component.html',
  styleUrls: ['./training-program.component.scss'],
  providers: [
    DepartmentService,
    StudentCategoryService,
    CertificationTypeService
  ]
})
export class TrainingProgramEditComponent {
  departments: Department[];
  studentCategories: StudentCategory[];
  certificationTypes: CertificationType[];
  isDistanceLearning: any;
  public editableRow: {
    id: string,
    first: string,
    second: string,
    third: string,
    fourth: string,
    fifth: string,
    sixth: string,
    seventh: string,
    eight: string,
    ninth: string,
    tenth: string,
    eleventh: string,
    twelfth: string,
    last: string,
    handle: string };
  public saveButtonClicked: Subject<any> = new Subject<any>();

  public form: FormGroup = new FormGroup({
    id: new FormControl({value: '', disabled: true}),
    first: new FormControl({value: '', disabled: true}),
    second: new FormControl(''),
    third: new FormControl(''),
    fourth: new FormControl(''),
    fifth: new FormControl(''),
    sixth: new FormControl(''),
    seventh: new FormControl(''),
    eight: new FormControl(''),
    tenth: new FormControl(''),
    twelfth: new FormControl('')
  });

  constructor(public modalRef: MDBModalRef,
              private departmentService: DepartmentService,
              private studentCategoryService: StudentCategoryService,
              private certificationTypeService: CertificationTypeService,
              ) { }

  // tslint:disable-next-line:typedef use-lifecycle-interface
  ngOnInit() {
    this.loadDepartment();
    this.loadStudentCategory();
    this.loadCertificationType();
    this.isDistanceLearning = this.editableRow.fourth;
    console.log(this.isDistanceLearning);
    this.form.controls.id.patchValue(this.editableRow.id);
    this.form.controls.first.patchValue(this.editableRow.first);
    this.form.controls.second.patchValue(this.editableRow.second);
    this.form.controls.third.patchValue(this.editableRow.third);
    this.form.controls.fourth.patchValue(this.editableRow.fourth);
    this.form.controls.fifth.patchValue(this.editableRow.fifth);
    this.form.controls.sixth.patchValue(this.editableRow.sixth);
    this.form.controls.seventh.patchValue(this.editableRow.seventh);
    this.form.controls.eight.patchValue(this.editableRow.eight);
    this.form.controls.tenth.patchValue(this.editableRow.tenth);
    this.form.controls.twelfth.patchValue(this.editableRow.twelfth);
  }

  // tslint:disable-next-line:typedef
  editRow() {
    this.editableRow = this.form.getRawValue();
    this.editableRow.ninth = this.departments.find(p => p.id === +this.editableRow.eight).name;
    this.editableRow.eleventh = this.studentCategories.find(p => p.id === +this.editableRow.tenth).name;
    this.editableRow.last = this.certificationTypes.find(p => p.id === +this.editableRow.twelfth).name;
    this.saveButtonClicked.next(this.editableRow);
    this.modalRef.hide();
  }

  // tslint:disable-next-line:typedef
  get first() { return this.form.get('first'); }
  // tslint:disable-next-line:typedef
  get second() { return this.form.get('second'); }
  // tslint:disable-next-line:typedef
  get third() { return this.form.get('third'); }
  // tslint:disable-next-line:typedef
  get fourth() { return this.form.get('fourth'); }
  // tslint:disable-next-line:typedef
  get fifth() { return this.form.get('fifth'); }
  // tslint:disable-next-line:typedef
  get sixth() { return this.form.get('sixth'); }
  // tslint:disable-next-line:typedef
  get seventh() { return this.form.get('seventh'); }
  // tslint:disable-next-line:typedef
  get eight() { return this.form.get('eight'); }
  // tslint:disable-next-line:typedef
  get tenth() { return this.form.get('tenth'); }
  // tslint:disable-next-line:typedef
  get twelfth() { return this.form.get('twelfth'); }

  // tslint:disable-next-line:typedef
  loadDepartment() {
    this.departmentService.getValues()
      .subscribe((data: Department[]) => {
        this.departments = data;
      });
  }

  // tslint:disable-next-line:typedef
  loadStudentCategory() {
    this.studentCategoryService.getValues()
      .subscribe((data: StudentCategory[]) => {
        this.studentCategories = data;
      });
  }

  // tslint:disable-next-line:typedef
  loadCertificationType() {
    this.certificationTypeService.getValues()
      .subscribe((data: CertificationType[]) => {
        this.certificationTypes = data;
      });
  }

  // tslint:disable-next-line:typedef
  changeIsDistanceLearning(el: boolean) {
    if (el) {
      this.isDistanceLearning = true;
    }
    else {
      this.isDistanceLearning = false;
    }

  }
}
