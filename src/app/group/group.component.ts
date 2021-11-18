import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { GroupService } from '../services/group.service';
import { Group } from '../models/Group';
import {MDBModalRef, MDBModalService, MdbTableDirective, MdbTablePaginationComponent} from 'angular-bootstrap-md';
import {GroupEditComponent} from '../group/group-edit.component';
import {IsDeleteComponent} from '../is-delete/is-delete.component';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
  providers: [GroupService]
})
export class GroupComponent implements OnInit {

  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;

  value: Group = new Group();
  headerElements = ['Номер группы', 'Учебная программа', 'Календарный год', 'Дата начала', 'Дата конца', 'Команда'];
  elements: any = [];
  values: Group[];
  searchText = '';
  previous: string;
  modalRef: MDBModalRef;
  tableMode = true;

  constructor(
    private valueService: GroupService,
    private modalService: MDBModalService) { }

  ngOnInit(): void {
    this.loadValue();

  }
  loadValue(): void {
    this.valueService.getValues()
      .subscribe((data: Group[]) => {
        this.values = data;
        data.sort((a, b) => a.groupNumber - b.groupNumber);
        data.forEach((obj, index) => {
          this.elements.push({
            // rowNumber: (++index).toString(),
            id: obj.id,
            calendarYear: obj.calendarYear,
            classStartDate: obj.classStartDate,
            classEndDate: obj.classEndDate,
            trainingProgramId: obj.trainingProgramId,
            trainingProgram: obj.trainingProgramName,
            groupNumber: obj.groupNumber});
        });
        this.mdbTable.setDataSource(this.elements);
        this.mdbTablePagination.setMaxVisibleItemsNumberTo(8);
        this.elements = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
      });
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

  create(el: any): void {
    const group = new Group(
      0,
      el.groupNumber,
      el.calendarYear.toISOString(),
      el.classStartDate.toISOString(),
      el.classEndDate.toISOString(),
      el.trainingProgramId);
    this.valueService.createValue(group)
      .subscribe((groupResponse: Group) => {
        const index = this.elements.length + 1;
        this.mdbTable.addRow({
          id: groupResponse.id,
          calendarYear: groupResponse.calendarYear,
          classStartDate: groupResponse.classStartDate,
          classEndDate: groupResponse.classEndDate,
          trainingProgramId: groupResponse.trainingProgramId,
          trainingProgram: groupResponse.trainingProgramName,
          groupNumber: groupResponse.groupNumber});
        this.mdbTable.setDataSource(this.elements);
      });
  }

  addRow(): void {
    this.modalRef = this.modalService.show(GroupEditComponent, this.getWideModal(this.emptyEl()));
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      this.create(newElement);
    });
  }

  editRow(el: any): void {
    const elementIndex = this.elements.findIndex((elem: any) => el === elem);
    this.modalRef = this.modalService.show(GroupEditComponent, this.getWideModal(el));
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      this.elements[elementIndex] = newElement;
      this.save(newElement);
    });
    this.mdbTable.setDataSource(this.elements);
  }

  save(el: any): void {
    const group = new Group(
      0,
      el.groupNumber,
      el.calendarYear.toISOString(),
      el.classStartDate.toISOString(),
      el.classEndDate.toISOString(),
      el.trainingProgramId);
    this.valueService.updateValue(group).subscribe();
  }

  delete(el: any): void {
    const editableRow = {heading: `Группа: ${el.groupNumber}`};
    this.modalRef = this.modalService.show(IsDeleteComponent, this.getWideModal(editableRow));
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      if (newElement) {
        this.valueService.deleteValue(el.id)
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

  getWideModal(el: any): any {
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
  emptyEl(): any {
    return {
      id: 0,
      calendarYear: '',
      classStartDate: '',
      classEndDate: '',
      trainingProgramId: '',
      trainingProgram: '',
      groupNumber: ''
    };
  }
}
