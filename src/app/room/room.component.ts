import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MDBModalRef, MDBModalService, MdbTableDirective, MdbTablePaginationComponent} from 'angular-bootstrap-md';
import {Globals} from '../globals';
import {IsDeleteComponent} from '../is-delete/is-delete.component';
import {ClassRoom} from '../models/schedule-models/ClassRoom';
import {RoomEditComponent} from './room-edit/room-edit.component';
import {ClassRoomService} from '../services/schedule-services/class-room.service';


@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss',],
  providers: [ClassRoomService]
})
export class RoomComponent implements OnInit {


  @ViewChild(MdbTableDirective, {static: true}) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, {static: true}) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', {static: true}) row: ElementRef;

  value: ClassRoom = new ClassRoom();
  headerElements = ['Номер', 'Аудитория', 'Команда'];
  elements: any = [];
  values: ClassRoom[];
  searchText = '';
  previous: string;
  modalRef: MDBModalRef;
  tableMode = true;

  constructor(
    public globals: Globals,
    private valueService: ClassRoomService,
    private modalService: MDBModalService) {
  }

  ngOnInit(): void {
    this.loadValue();
  }

  loadValue(): void {
    this.valueService.getValues()
      .subscribe((data: ClassRoom[]) => {
        this.values = data;
        data.sort((a, b) => (a.name < b.name ? -1 : 1)); //
        data.forEach((obj, index) => {
          this.elements.push({
            rowNumber: (++index).toString(),
            id: obj.id,
            name: obj.name
          });
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
    const classRoom = new ClassRoom(
      0,
      el.name);
    this.valueService.createValue(classRoom)
      .subscribe((roomResponse: ClassRoom) => {
        const index = this.elements.length + 1;
        this.mdbTable.addRow({
          rowNumber: index,
          // id: roomResponse.id,
          name: roomResponse.name
        });
        this.mdbTable.setDataSource(this.elements);
      });
  }

  addRow(): void {
    this.modalRef = this.modalService.show(RoomEditComponent, this.getWideModal(this.emptyEl()));
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      this.create(newElement);
    });
  }

  editRow(el: any): void {
    console.log(el);
    const elementIndex = this.elements.findIndex((elem: any) => el === elem);
    this.modalRef = this.modalService.show(RoomEditComponent, this.getWideModal(el));
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      console.log(newElement);
      this.elements[elementIndex] = newElement;
      this.save(newElement);
    });
    this.mdbTable.setDataSource(this.elements);
  }

  save(el: any): void {
    const room = new ClassRoom(
      el.id,
      el.name
    );
    this.valueService.updateValue(room).subscribe();
  }

  delete(el: any): void {
    const editableRow = {heading: `Аудитория: ${el.id}`};
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
      name: ''
    };
  }
}
