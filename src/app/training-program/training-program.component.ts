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


@Component({
  selector: 'app-training-program',
  templateUrl: './training-program.component.html',
  styleUrls: ['./training-program.component.scss'],
  providers: [
    TrainingProgramService,
    DepartmentService,
    StudentCategoryService,
    CertificationTypeService
  ]
})
export class TrainingProgramComponent implements OnInit, AfterViewInit {
  value: TrainingProgram = new TrainingProgram();
  values: TrainingProgram[];
  departments: Department[];
  studentCategories: StudentCategory[];
  certificationTypes: CertificationType[];
  department: Department = new Department();
  studentCategory: StudentCategory = new StudentCategory();
  certificationType: CertificationType = new CertificationType();

  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;

  elements: any = [];
  headElements = ['Номер', 'id', 'Название', 'Кафедра', 'Категория обучающихся', 'Кафедра', 'Тип аттестации',
    'Дистанционное обучение', 'Самостоятельная работа', 'Контрольная работа', 'Содержание контрольной работы', 'Команда'];
  searchText = '';
  previous: string;
  modalRef: MDBModalRef;

  constructor(
    private valueService: TrainingProgramService,
    private departmentService: DepartmentService,
    private studentCategoryService: StudentCategoryService,
    private certificationTypeService: CertificationTypeService,
    private cdRef: ChangeDetectorRef,
    private modalService: MDBModalService) { }

  // tslint:disable-next-line:typedef
  @HostListener('input') oninput() {
    this.mdbTablePagination.searchText = this.searchText;
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.loadValue();
    this.loadDepartment();
    this.loadStudentCategory();
    this.loadCertificationType();
  }

  // tslint:disable-next-line:typedef use-lifecycle-interface
  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(8);

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  // tslint:disable-next-line:typedef
  searchItems() {
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

  // tslint:disable-next-line:typedef
  loadValue() {
    this.valueService.getValues()
      .subscribe((data: TrainingProgram[]) => {
        this.values = data;
        // tslint:disable-next-line:only-arrow-functions typedef
        this.values.sort(function(a, b) {
          return a.id - b.id;
        });
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
            last: this.values[i - 1].certificationTypeName});
        }
        this.mdbTable.setDataSource(this.elements);
        this.mdbTablePagination.setMaxVisibleItemsNumberTo(8);
        this.elements = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
      });
  }

  // tslint:disable-next-line:typedef
  crate(){
    this.value.departmentId = this.department.id;
    this.value.studentCategoryId = this.studentCategory.id;
    this.value.certificationTypeId = this.certificationType.id;
    this.valueService.createValue(this.value)
      .subscribe((data: TrainingProgram) => {
        this.value = data;
        const index = this.elements.length + 1;
        this.value.departmentName = this.departments.find(p => p.id === +this.value.departmentId).name;
        this.value.studentCategoryName = this.studentCategories.find(p => p.id === +this.value.studentCategoryId).name;
        this.value.certificationTypeName = this.certificationTypes.find(p => p.id === +this.value.certificationTypeId).name;
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
          last: this.value.certificationTypeName
        });
        this.mdbTable.setDataSource(this.elements);
        this.cancel();
      });
  }

  // tslint:disable-next-line:typedef
  save(el: any) {
    this.cancel();
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
    this.valueService.updateValue(this.value)
      .subscribe();
    this.cancel();
  }
  // tslint:disable-next-line:typedef
  editValue(p: TrainingProgram) {
    this.value = p;
  }
  // tslint:disable-next-line:typedef
  cancel() {
    this.value = new TrainingProgram();
  }
  // tslint:disable-next-line:typedef
  delete(p: any) {
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
    this.valueService.deleteValue(this.value.id)
      .subscribe(data => {
        this.removeRow(p);
      });
  }
  // tslint:disable-next-line:typedef
  add() {
    this.cancel();
  }

  // tslint:disable-next-line:typedef
  removeRow(el: any) {
    const elementIndex = this.elements.findIndex((elem: any) => el === elem);
    this.mdbTable.removeRow(elementIndex);
    // tslint:disable-next-line:no-shadowed-variable
    this.mdbTable.getDataSource().forEach((el: any, index: any) => {
      el.id = (index + 1).toString();
    });
    this.mdbTable.setDataSource(this.elements);
    this.cancel();
  }

  // tslint:disable-next-line:typedef
  editRow(el: any) {
    const elementIndex = this.elements.findIndex((elem: any) => el === elem);
    const modalOptions = {
      data: {
        editableRow: el
      }
    };
    // this.modalRef = this.modalService.show(TeacherEditComponent, modalOptions);
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      this.elements[elementIndex] = newElement;
      this.save(newElement);
    });
    this.mdbTable.setDataSource(this.elements);
  }

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
}
