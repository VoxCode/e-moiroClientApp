import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import { TeacherService } from '../services/teacher.service';
import { Teacher } from '../models/Teacher';
import {TeachingPosition} from '../models/TeachingPosition';
import {TeachingPositionService} from '../services/teaching-position.service';
import {MDBModalRef, MDBModalService, MdbTableDirective, MdbTablePaginationComponent} from 'angular-bootstrap-md';
import {TeacherEditComponent} from './teacher-edit.component';


@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss'],
  providers: [TeacherService, TeachingPositionService]
})
export class TeacherComponent implements OnInit, AfterViewInit {
  value: Teacher = new Teacher();
  values: Teacher[];
  teachingPositions: TeachingPosition[];
  teachingPosition: TeachingPosition = new TeachingPosition();

  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;

  elements: any = [];
  headElements = ['Номер', 'id', 'Должность', 'Кафедрал', 'Имя', 'Команда'];
  searchText = '';
  previous: string;
  modalRef: MDBModalRef;

  constructor(
    private valueService: TeacherService,
    private teachingPositionService: TeachingPositionService,
    private cdRef: ChangeDetectorRef,
    private modalService: MDBModalService) { }

  // tslint:disable-next-line:typedef
  @HostListener('input') oninput() {
    this.mdbTablePagination.searchText = this.searchText;
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.loadValue();
    this.loadTeachingPosition();
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
      .subscribe((data: Teacher[]) => {
        this.values = data;
        // tslint:disable-next-line:only-arrow-functions
        this.values.sort(function(a, b) {
          return a.id - b.id;
        });
        for (let i = 1; i <= this.values.length; i++) {
          this.elements.push({
            id: i.toString(),
            first: this.values[i - 1].id,
            second: this.values[i - 1].teachingPositionId,
            third: this.values[i - 1].isCathedral,
            fourth: this.values[i - 1].teachingPositionName,
            last: this.values[i - 1].name});
        }
        this.mdbTable.setDataSource(this.elements);
        this.mdbTablePagination.setMaxVisibleItemsNumberTo(8);
        this.elements = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
      });
  }

  // tslint:disable-next-line:typedef
  crate(){
    this.value.teachingPositionId = this.teachingPosition.id;
    this.valueService.createValue(this.value)
      .subscribe((data: Teacher) => {
        this.value = data;
        const index = this.elements.length + 1;
        this.value.teachingPositionName = this.teachingPositions.find(p => p.id === +this.value.teachingPositionId).name;
        this.mdbTable.addRow({
          id: index.toString(),
          first: this.value.id,
          second: this.value.teachingPositionId,
          third: this.value.isCathedral,
          fourth: this.value.teachingPositionName,
          last: this.value.name
        });
        this.mdbTable.setDataSource(this.elements);
        this.cancel();
      });
  }

  // tslint:disable-next-line:typedef
  save(el: any) {
    this.cancel();
    this.value.id = el.first;
    this.value.teachingPositionId = el.second;
    this.value.isCathedral = el.third;
    this.value.name = el.last;
    this.valueService.updateValue(this.value)
      .subscribe();
    this.cancel();
  }
  // tslint:disable-next-line:typedef
  editValue(p: Teacher) {
    this.value = p;
  }
  // tslint:disable-next-line:typedef
  cancel() {
    this.value = new Teacher();
  }
  // tslint:disable-next-line:typedef
  delete(p: any) {
    this.value.id = p.first;
    this.value.teachingPositionId = p.second;
    this.value.isCathedral = p.third;
    this.value.name = p.last;
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
    this.modalRef = this.modalService.show(TeacherEditComponent, modalOptions);
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      this.elements[elementIndex] = newElement;
      this.save(newElement);
    });
    this.mdbTable.setDataSource(this.elements);
  }

  // tslint:disable-next-line:typedef
  loadTeachingPosition() {
    this.teachingPositionService.getValues()
      .subscribe((data: TeachingPosition[]) => {
        this.teachingPositions = data;
      });
  }
}


