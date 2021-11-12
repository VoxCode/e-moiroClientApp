import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { GroupService } from '../services/group.service';
import { Group } from '../models/Group';
import {MDBModalRef, MDBModalService, MdbTableDirective, MdbTablePaginationComponent} from 'angular-bootstrap-md';
import {GroupEditComponent} from '../group/group-edit.component';
import {Expert} from '../models/Expert';

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
        // this.previous = this.mdbTable.getDataSource();
      });
  }

  create(el: any): void {
    const group = new Group(
      0,
      el.groupNumber,
      el.calendarYear,
      el.classStartDate,
      el.classEndDate,
      el.trainingProgramId);
    this.valueService.createValue(group)
      .subscribe((groupResponse: Group) => {
        const index = this.elements.length + 1;
        this.mdbTable.addRow(el);
        this.mdbTable.setDataSource(this.elements);
      });
  }

  addRow(): void {
    console.log(this.values);
    this.modalRef = this.modalService.show(GroupEditComponent, this.getWideModal(this.emptyEl()));
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      this.create(newElement);
    });
  }

  editRow(el: any) {

  }

  delete(el: any) {

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
      trainingProgramId: 0,
      trainingProgram: '',
      groupNumber: ''
    };
  }
}
