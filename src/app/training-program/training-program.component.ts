import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {TrainingProgramService} from '../services/training-program.service';
import {TrainingProgram} from '../models/TrainingProgram';
import {MDBModalRef, MDBModalService, MdbTableDirective, MdbTablePaginationComponent} from 'angular-bootstrap-md';
import {StudentCategoryService} from '../services/student-category.service';
import {DepartmentService} from '../services/department.service';
import {CertificationTypeService} from '../services/certification-type.service';
import {Department} from '../models/Department';
import {StudentCategory} from '../models/StudentCategory';
import {CertificationType} from '../models/CertificationType';
import {TrainingProgramEditComponent} from './training-program-edit.component';
import {FormOfEducation} from '../models/FormOfEducation';
import {FormOfEducationService} from '../services/form-of-education.service';
import {AuthService} from '../services/security/auth.service';
import {Globals} from '../globals';
import {TeacherDepartment} from '../models/TeacherDepartment';

@Component({
  selector: 'app-training-program',
  templateUrl: './training-program.component.html',
  styleUrls: ['./training-program.component.scss'],
  providers: [
    TrainingProgramService,
    DepartmentService,
    StudentCategoryService,
    CertificationTypeService,
    FormOfEducationService
  ]
})

export class TrainingProgramComponent implements OnInit, AfterViewInit {
  value: TrainingProgram = new TrainingProgram();
  values: TrainingProgram[];
  departments: Department[];
  studentCategories: StudentCategory[];
  certificationTypes: CertificationType[];
  formOfEducations: FormOfEducation[];
  department: Department = new Department();
  studentCategory: StudentCategory = new StudentCategory();
  certificationType: CertificationType = new CertificationType();
  formOfEducation: FormOfEducation = new FormOfEducation();

  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;

  elements: any = [];
  headElements = ['Номер', 'id', 'Название', 'Количество часов', 'Дистанционное обучение', 'Кафедра',
    'Категория обучающихся', 'Тип аттестации', 'Форма получения образования', 'Команда'];
  searchText = '';
  previous: string;
  modalRef: MDBModalRef;

  constructor(
    public globals: Globals,
    private authService: AuthService,
    private valueService: TrainingProgramService,
    private departmentService: DepartmentService,
    private studentCategoryService: StudentCategoryService,
    private certificationTypeService: CertificationTypeService,
    private formOfEducationService: FormOfEducationService,
    private cdRef: ChangeDetectorRef,
    private modalService: MDBModalService) { }

  @HostListener('input') oninput = () => {
    this.mdbTablePagination.searchText = this.searchText;
  }

  ngOnInit(): void {
    this.loadValue();
    this.loadDepartment();
    this.loadStudentCategory();
    this.loadCertificationType();
    this.loadFormOfEducation();
  }

  ngAfterViewInit(): void {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(8);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  searchItems(): void {
    const prev = this.mdbTable.getDataSource();

    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.elements = this.mdbTable.getDataSource();
    }

    if (this.searchText) {
      this.elements = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.mdbTable.searchDataObservable(this.searchText).subscribe(() => {
      this.mdbTablePagination.calculateFirstItemIndex();
      this.mdbTablePagination.calculateLastItemIndex();
    });
  }

  loadValue(): void {
    this.valueService.getValues()
      .subscribe((data: TrainingProgram[]) => {
        this.values = data;
        this.values.sort((a, b) => a.id - b.id);
        if (this.globals.role !== 'admin') {
          this.loadDepartmentsForCurrentUser();
        }
        else {
          this.pushData();
        }
      });
  }

  pushData(): void {
    for (let i = 1; i <= this.values.length; i++) {
      this.elements.push({
        id: i.toString(),
        first: this.values[i - 1].id,
        second: this.values[i - 1].name,
        third: this.values[i - 1].numberOfHours,
        fourth: this.values[i - 1].isDistanceLearning,
        fifth: this.values[i - 1].isControlWork,
        sixth: this.values[i - 1].isTestWork,
        seventh: this.values[i - 1].controlWork,
        eight: this.values[i - 1].departmentId,
        ninth: this.values[i - 1].departmentName,
        tenth: this.values[i - 1].studentCategoryId,
        eleventh: this.values[i - 1].studentCategoryName,
        twelfth: this.values[i - 1].certificationTypeId,
        thirteenth: this.values[i - 1].formOfEducationId,
        fourteenth: this.values[i - 1].formOfEducationName,
        last: this.values[i - 1].certificationTypeName});
    }
    this.mdbTable.setDataSource(this.elements);
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(8);
    this.elements = this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();
  }

  loadDepartmentsForCurrentUser(): void {
    this.departmentService.getDepartmentsForCurrentUser(this.globals.name, 1)
      .subscribe((teacherDepartments: TeacherDepartment[]) => {
        let tmp: TrainingProgram[] = [];
        teacherDepartments.forEach((teacherDepartment) => {
          tmp = [...tmp, ...this.values.filter(a => a.departmentId === teacherDepartment.departmentId)];
        });
        this.values = tmp;
        this.pushData();
      });
  }

  crate(): void {
    this.value.departmentId = this.department.id;
    this.value.studentCategoryId = this.studentCategory.id;
    this.value.certificationTypeId = this.certificationType.id;
    this.value.formOfEducationId = this.formOfEducation.id;
    this.valueService.createValue(this.value)
      .subscribe((data: TrainingProgram) => {
        this.value = data;
        const index = this.elements.length + 1;
        this.value.departmentName = this.departments
          .find(p => p.id === +this.value.departmentId).name;
        this.value.studentCategoryName = this.studentCategories
          .find(p => p.id === +this.value.studentCategoryId).name;
        this.value.certificationTypeName = this.certificationTypes
          .find(p => p.id === +this.value.certificationTypeId).name;
        this.value.formOfEducationName = this.formOfEducations
          .find(p => p.id === +this.value.formOfEducationId).name;
        this.mdbTable.addRow({
          id: index.toString(),
          first: this.value.id,
          second: this.value.name,
          third: this.value.numberOfHours,
          fourth: this.value.isDistanceLearning,
          fifth: this.value.isControlWork,
          sixth: this.value.isTestWork,
          seventh: this.value.controlWork,
          eight: this.value.departmentId,
          ninth: this.value.departmentName,
          tenth: this.value.studentCategoryId,
          eleventh: this.value.studentCategoryName,
          twelfth: this.value.certificationTypeId,
          thirteenth: this.value.formOfEducationId,
          fourteenth: this.value.formOfEducationName,
          last: this.value.certificationTypeName
        });
        this.mdbTable.setDataSource(this.elements);
        this.cancel();
      });
  }

  save(el: any): void {
    this.cancel();
    this.valueService.getValue(el.first).subscribe((data: TrainingProgram) => {
      this.value.id = el.first;
      this.value.name = el.second;
      this.value.numberOfHours = el.third;
      this.value.isDistanceLearning = el.fourth;
      this.value.isControlWork = el.fifth;
      this.value.isTestWork = el.sixth;
      this.value.controlWork = el.seventh;
      this.value.departmentId = el.eight;
      this.value.studentCategoryId = el.tenth;
      this.value.certificationTypeId = el.twelfth;
      this.value.formOfEducationId = el.thirteenth;
      this.value.introduction = data.introduction;
      this.valueService.updateValue(this.value)
        .subscribe();
      this.cancel();
    });
  }

  editValue(p: TrainingProgram): void {
    this.value = p;
  }

  cancel(): void {
    this.value = new TrainingProgram();
  }

  delete(p: any): void {
    this.value.id = p.first;
    this.value.name = p.second;
    this.value.numberOfHours = p.third;
    this.value.isDistanceLearning = p.fourth;
    this.value.isControlWork = p.fifth;
    this.value.isTestWork = p.sixth;
    this.value.controlWork = p.seventh;
    this.value.departmentId = p.eight;
    this.value.studentCategoryId = p.tenth;
    this.value.certificationTypeId = p.twelfth;
    this.value.formOfEducationId = p.thirteenth;
    this.valueService.deleteValue(this.value.id).subscribe(() => {
        this.removeRow(p);
      });
  }

  add(): void {
    this.cancel();
  }

  removeRow(el: any): void {
    const elementIndex = this.elements.findIndex((elem: any) => el === elem);
    this.mdbTable.removeRow(elementIndex);
    this.mdbTable.getDataSource().forEach((value: any, index: any) => {
      value.id = (index + 1).toString();
    });
    this.mdbTable.setDataSource(this.elements);
    this.cancel();
  }

  editRow(el: any): void {
    const elementIndex = this.elements.findIndex((elem: any) => el === elem);
    const modalOptions = {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: true,
      class: 'modal-fluid',
      containerClass: '',
      animated: true,
      data: {
        editableRow: el
      }
    };
    this.modalRef = this.modalService.show(TrainingProgramEditComponent, modalOptions);
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      this.elements[elementIndex] = newElement;
      this.save(newElement);
    });
    this.mdbTable.setDataSource(this.elements);
  }

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
}
