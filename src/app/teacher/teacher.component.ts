import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import { TeacherService } from '../services/teacher.service';
import { Teacher } from '../models/Teacher';
import {MDBModalRef, MDBModalService, MdbTableDirective, MdbTablePaginationComponent} from 'angular-bootstrap-md';
import {TeacherEditComponent} from './teacher-edit.component';
import {TeacherDepartmentAddFormComponent} from './teacher-department-add-form/teacher-department-add-form.component';
import {Globals} from '../globals';
import {IsDeleteComponent} from '../is-delete/is-delete.component';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss'],
  providers: [TeacherService]
})

export class TeacherComponent implements OnInit, AfterViewInit {

  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;

  elements: any = [];
  headElements = ['Номер', 'Фамилия', 'Имя', 'Отчество',
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
        data.sort((a, b) => a.id - b.id);
        data.forEach((value, index) => {
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

  crate(el: any): void {
    const teacher = new Teacher(0, el.second, el.third, el.fourth, el.fifth, el.sixth, el.seventh);
    this.valueService.createValue(teacher)
      .subscribe((teacherResponse: Teacher) => {
        const index = this.elements.length + 1;
        this.mdbTable.addRow({
          id: index.toString(),
          first: teacherResponse.id,
          second: teacherResponse.firstName,
          third: teacherResponse.lastName,
          fourth: teacherResponse.patronymicName,
          fifth: teacherResponse.position,
          sixth: teacherResponse.academicRank,
          seventh: teacherResponse.isCathedral
        });
        this.mdbTable.setDataSource(this.elements);
      });
  }

  save(el: any): void {
    const teacher = new Teacher(
      el.first,
      el.second,
      el.third,
      el.fourth,
      el.fifth,
      el.sixth,
      el.seventh);
    this.valueService.updateValue(teacher).subscribe();
  }

  delete(el: any): void {
    const editableRow = {heading: el.third + ' ' + el.second + ' ' + el.fourth};
    this.modalRef = this.modalService.show(IsDeleteComponent, this.modalOption(editableRow));
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      if (newElement) {
        this.valueService.deleteValue(el.first)
          .subscribe(() => {
            this.removeRow(el);
          });
      }
    });
  }

  removeRow(el: any): void {
    const elementIndex = this.elements.findIndex((elem: any) => el === elem);
    this.mdbTable.removeRow(elementIndex);
    this.mdbTable.getDataSource().forEach((value, index) => {
      value.id = (index + 1).toString();
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

  addRow(): void {
    this.modalRef = this.modalService.show(TeacherEditComponent, this.modalOption(this.emptyEl()));
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      this.crate(newElement);
    });
  }

  editRow(el: any): void {
    const elementIndex = this.elements.findIndex((elem: any) => el === elem);
    this.modalRef = this.modalService.show(TeacherEditComponent, this.modalOption(el));
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      this.elements[elementIndex] = newElement;
      this.save(newElement);
    });
    this.mdbTable.setDataSource(this.elements);
  }

  emptyEl(): any {
    return {
      id: 0,
      first: '',
      second: '',
      third: '',
      fourth: '',
      fifth: '',
      sixth: '',
      seventh: false};
  }

  modalOption(el: any): any {
    return {
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
  }
}
