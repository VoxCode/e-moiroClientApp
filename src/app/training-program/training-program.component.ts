import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {TrainingProgramService} from '../services/training-program.service';
import {TrainingProgram} from '../models/TrainingProgram';
import {MDBModalRef, MDBModalService, MdbTableDirective, MdbTablePaginationComponent} from 'angular-bootstrap-md';
import {TrainingProgramEditComponent} from './training-program-edit.component';
import {AuthService} from '../services/security/auth.service';
import {Globals} from '../globals';
import {IsDeleteComponent} from '../is-delete/is-delete.component';

@Component({
  selector: 'app-training-program',
  templateUrl: './training-program.component.html',
  styleUrls: ['./training-program.component.scss'],
  providers: [
    TrainingProgramService
  ]
})

export class TrainingProgramComponent implements OnInit, AfterViewInit {

  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;

  elements: any = [];
  headElements = ['Номер', 'Название', 'Часы', 'Дист.', 'Кафедра',
    'Категория слушателей', 'Тип аттестации', 'Форма образования', 'Дата создания', 'Команда'];
  searchText = '';
  previous: string;
  modalRef: MDBModalRef;

  constructor(
    public globals: Globals,
    private authService: AuthService,
    private valueService: TrainingProgramService,
    private cdRef: ChangeDetectorRef,
    private modalService: MDBModalService) { }

  @HostListener('input') oninput = () => {
    this.mdbTablePagination.searchText = this.searchText;
  }

  ngOnInit(): void {
    this.loadValues();
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

  loadValues(): void {
    if (this.globals.role !== 'admin') {
      this.loadTrainingProgramForCurrentUser();
    }
    else {
      this.loadTrainingProgramForAdmin();
    }
  }

  loadTrainingProgramForAdmin(): void {
    this.valueService.getValues()
      .subscribe((data: TrainingProgram[]) => {
        data.sort((a, b) => a.id - b.id);
        this.pushData(data);
      });
  }

  loadTrainingProgramForCurrentUser(): void {
    this.valueService.getValueForTeacher(this.globals.name)
      .subscribe((data: TrainingProgram[]) => {
        data.sort((a, b) => a.id - b.id);
        this.pushData(data);
      });
  }

  pushData(data: TrainingProgram[]): void {
    data.forEach((obj, index) => {
      this.elements.push({
        id: (++index).toString(),
        first: obj.id,
        second: obj.name,
        third: obj.numberOfHours,
        fourth: obj.isDistanceLearning,
        fifth: obj.isControlWork,
        sixth: obj.isTestWork,
        seventh: obj.departmentId,
        eight: obj.departmentName,
        ninth: obj.studentCategoryId,
        tenth: obj.studentCategoryName,
        eleventh: obj.certificationTypeId,
        twelfth: obj.certificationTypeName,
        thirteenth: obj.formOfEducationId,
        fourteenth: obj.formOfEducationName,
        fifteenth: obj.numberOfWeeks,
        sixteenth: obj.dateOfCreation});
    });
    this.mdbTable.setDataSource(this.elements);
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(8);
    this.elements = this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();
  }

  crate(el: any): void {
    const trainingProgram = new TrainingProgram(0, el.second, el.third, el.fifteenth, el.fourth, el.fifth,
      el.sixth, el.seventh, el.eight, el.ninth, el.tenth, el.eleventh, el.twelfth, el.thirteenth, el.fourteenth);
    const date = Date.now();
    trainingProgram.dateOfCreation = new Date(date + 10800000);
    this.valueService.createValue(trainingProgram)
      .subscribe((trainingProgramResponse: TrainingProgram) => {
        console.log(trainingProgramResponse);
        const index = this.elements.length + 1;
        this.mdbTable.addRow({
          id: index.toString(),
          first: trainingProgramResponse.id,
          second: trainingProgramResponse.name,
          third: trainingProgramResponse.numberOfHours,
          fourth: trainingProgramResponse.isDistanceLearning,
          fifth: trainingProgramResponse.isControlWork,
          sixth: trainingProgramResponse.isTestWork,
          seventh: trainingProgramResponse.departmentId,
          eight: trainingProgramResponse.departmentName,
          ninth: trainingProgramResponse.studentCategoryId,
          tenth: trainingProgramResponse.studentCategoryName,
          eleventh: trainingProgramResponse.certificationTypeId,
          twelfth: trainingProgramResponse.certificationTypeName,
          thirteenth: trainingProgramResponse.formOfEducationId,
          fourteenth: trainingProgramResponse.formOfEducationName,
          fifteenth: trainingProgramResponse.numberOfWeeks,
          sixteenth: new Date(date)
        });
        this.mdbTable.setDataSource(this.elements);
      });
  }

  save(el: any): void {
    const trainingProgram = new TrainingProgram(el.first, el.second, el.third, el.fifteenth, el.fourth, el.fifth,
      el.sixth, el.seventh, el.eight, el.ninth, el.tenth, el.eleventh, el.twelfth, el.thirteenth, el.fourteenth);
    trainingProgram.dateOfCreation = el.sixteenth;
    this.valueService.updateValue(trainingProgram).subscribe();
  }

  delete(el: any): void {
    const editableRow = {heading: el.second};
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
    this.mdbTable.getDataSource().forEach((value: any, index: any) => {
      value.id = (index + 1).toString();
    });
    this.mdbTable.setDataSource(this.elements);
  }

  addRow(): void {
    this.modalRef = this.modalService.show(TrainingProgramEditComponent, this.modalOption(this.emptyEl()));
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      this.crate(newElement);
    });
  }

  editRow(el: any): void {
    const elementIndex = this.elements.findIndex((elem: any) => el === elem);
    this.modalRef = this.modalService.show(TrainingProgramEditComponent, this.modalOption(el));
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      this.elements[elementIndex] = newElement;
      newElement.sixteenth = el.sixteenth;
      this.save(newElement);
    });
    this.mdbTable.setDataSource(this.elements);
  }

  emptyEl(): any {
    return { id: 0, first: '', second: '', third: '', fourth: false, fifth: false, sixth: false, seventh: '',
      eight: '', ninth: '', tenth: '', eleventh: '', twelfth: '', thirteenth: '', fourteenth: '', fifteenth: '' };
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
