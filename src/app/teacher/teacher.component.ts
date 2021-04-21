import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import { TeacherService } from '../services/teacher.service';
import { Teacher } from '../models/Teacher';
import {MDBModalRef, MDBModalService, MdbTableDirective, MdbTablePaginationComponent} from 'angular-bootstrap-md';
import {TeacherEditComponent} from './teacher-edit.component';
import {TeacherDepartmentAddFormComponent} from './teacher-department-add-form/teacher-department-add-form.component';
import {Globals} from '../globals';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss'],
  providers: [TeacherService]
})

export class TeacherComponent implements OnInit, AfterViewInit {
  value: Teacher = new Teacher();
  values: Teacher[];

  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;

  elements: any = [];
  headElements = ['Номер', 'id', 'Фамилия', 'Имя', 'Отчество',
    'Должность', 'Академическое звание', 'Кафедрал', 'Команда'];
  searchText = '';
  previous: string;
  modalRef: MDBModalRef;

  constructor(
    public globals: Globals,
    private valueService: TeacherService,
    private cdRef: ChangeDetectorRef,
    private modalService: MDBModalService) { }

  @HostListener('input') oninput = () => {
    this.mdbTablePagination.searchText = this.searchText;
  }

  ngOnInit(): void {
    this.loadValue();
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
      .subscribe((data: Teacher[]) => {
        this.values = data;
        this.values.sort((a, b) => a.id - b.id);
        this.values.forEach((value, index) => {
          this.elements.push({
            id: (index + 1).toString(),
            first: value.id,
            second: value.firstName,
            third: value.lastName,
            fourth: value.patronymicName,
            fifth: value.position,
            sixth: value.academicRank,
            seventh: value.isCathedral
          });
        });
        this.mdbTable.setDataSource(this.elements);
        this.mdbTablePagination.setMaxVisibleItemsNumberTo(8);
        this.elements = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
      });
  }

  crate(): void {
    this.valueService.createValue(this.value)
      .subscribe((data: Teacher) => {
        this.value = data;
        const index = this.elements.length + 1;
        this.mdbTable.addRow({
          id: index.toString(),
          first: this.value.id,
          second: this.value.firstName,
          third: this.value.lastName,
          fourth: this.value.patronymicName,
          fifth: this.value.position,
          sixth: this.value.academicRank,
          seventh: this.value.isCathedral
        });
        this.mdbTable.setDataSource(this.elements);
        this.cancel();
      });
  }

  save(el: any): void {
    this.value.id = el.first;
    this.value.firstName = el.second;
    this.value.lastName = el.third;
    this.value.patronymicName = el.fourth;
    this.value.position = el.fifth;
    this.value.academicRank = el.sixth;
    this.value.isCathedral = el.seventh;
    this.valueService.updateValue(this.value)
      .subscribe();
    this.cancel();
  }

  editValue(p: Teacher): void {
    this.value = p;
  }

  cancel(): void {
    this.value = new Teacher();
  }

  delete(el: any): void {
    this.value.id = el.first;
    this.value.firstName = el.second;
    this.value.lastName = el.third;
    this.value.patronymicName = el.fourth;
    this.value.position = el.fifth;
    this.value.academicRank = el.sixth;
    this.value.isCathedral = el.seventh;
    this.valueService.deleteValue(this.value.id)
      .subscribe(() => {
        this.removeRow(el);
      });
  }

  add(): void {
    this.cancel();
  }

  removeRow(el: any): void {
    const elementIndex = this.elements.findIndex((elem: any) => el === elem);
    this.mdbTable.removeRow(elementIndex);
    this.mdbTable.getDataSource().forEach((value, index) => {
      value.id = (index + 1).toString();
    });
    this.mdbTable.setDataSource(this.elements);
    this.cancel();
  }

  editRow(el: any): void {
    const elementIndex = this.elements.findIndex(elem => el === elem);
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
    this.modalRef = this.modalService.show(TeacherEditComponent, modalOptions);
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      this.elements[elementIndex] = newElement;
      this.save(newElement);
    });
    this.mdbTable.setDataSource(this.elements);
  }

  addTeacherDepartment(teacherId: number): void {
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
        editableRow: {id: teacherId}
      }
    };
    this.modalRef = this.modalService.show(TeacherDepartmentAddFormComponent, modalOptions);
  }
}
