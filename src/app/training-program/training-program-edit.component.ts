import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
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
  styleUrls: ['./training-program.component.scss'],
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
    thirteenth: string,
    fourteenth: string,
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
    twelfth: new FormControl(''),
    thirteenth: new FormControl('')
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
    this.form.controls.eight.patchValue(this.editableRow.eight);
    this.form.controls.tenth.patchValue(this.editableRow.tenth);
    this.form.controls.twelfth.patchValue(this.editableRow.twelfth);
    this.form.controls.thirteenth.patchValue(this.editableRow.thirteenth);
  }

  // tslint:disable-next-line:typedef
  editRow() {
    this.editableRow = this.form.getRawValue();
    this.editableRow.ninth = this.departments.find(p => p.id === +this.editableRow.eight).name;
    this.editableRow.eleventh = this.studentCategories.find(p => p.id === +this.editableRow.tenth).name;
    this.editableRow.last = this.certificationTypes.find(p => p.id === +this.editableRow.twelfth).name;
    this.editableRow.fourteenth = this.formOfEducations.find(p => p.id === +this.editableRow.thirteenth).name;
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
  get thirteenth() { return this.form.get('thirteenth'); }

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
  loadFormOfEducation() {
    this.formOfEducationService.getValues()
      .subscribe((data: FormOfEducation[]) => {
        this.formOfEducations = data;
      });
  }

  // tslint:disable-next-line:typedef
  changeIsDistanceLearning(el: boolean) {
    this.isDistanceLearning = el;
  }
}
