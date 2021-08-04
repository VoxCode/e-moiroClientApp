import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import { MainLiteratureService } from '../services/main-literature.service';
import { MainLiterature } from '../models/MainLiterature';
import {MDBModalRef, MDBModalService, MdbTableDirective, MdbTablePaginationComponent} from 'angular-bootstrap-md';
import {MainLiteratureEditComponent} from './main-literature-edit.component';
import {IsDeleteComponent} from '../is-delete/is-delete.component';
import {Globals} from '../globals';

@Component({
  selector: 'app-main-literature',
  templateUrl: './main-literature.component.html',
  styleUrls: ['./main-literature.component.scss'],
  providers: [MainLiteratureService]
})
export class MainLiteratureComponent implements OnInit, AfterViewInit {

  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;

  elements: any = [];
  headElements = ['Номер', 'Содержание', 'Команда'];
  searchText = '';
  previous: string;
  modalRef: MDBModalRef;

  constructor(
    private valueService: MainLiteratureService,
    private cdRef: ChangeDetectorRef,
    private modalService: MDBModalService,
    public globals: Globals) { }

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
    if (this.globals.role === 'admin') {
      this.valueService.getValues()
        .subscribe((data: MainLiterature[]) => {
          this.pushData(data);
        });
    }
    else {
      this.valueService.getAuthorValues(this.globals.name)
        .subscribe((data: MainLiterature[]) => {
          this.pushData(data);
        });
    }
  }

  pushData(data: MainLiterature[]): void {
    data.sort((a, b) => a.id - b.id);
    data.forEach((obj, index) => {
      this.elements.push({
        id: (++index).toString(),
        first: obj.id,
        last: obj.content,
        author: obj.authorIndex});
    });
    this.mdbTable.setDataSource(this.elements);
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(8);
    this.elements = this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();
  }

  crate(el: any): void {
    const mainLiterature = new MainLiterature(0, el.last, this.globals.name);
    this.valueService.createValue(mainLiterature)
      .subscribe((mainLiteratureResponse: MainLiterature) => {
        const index = this.elements.length + 1;
        this.mdbTable.addRow({
          id: index.toString(),
          first: mainLiteratureResponse.id,
          last: mainLiteratureResponse.content,
          author: mainLiteratureResponse.authorIndex
        });
        this.mdbTable.setDataSource(this.elements);
      });
  }

  save(el: any): void {
    const mainLiterature = new MainLiterature(el.first, el.last, el.author);
    this.valueService.updateValue(mainLiterature).subscribe();
  }

  delete(el: any): void {
    const editableRow = {heading: el.last};
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
    this.modalRef = this.modalService.show(MainLiteratureEditComponent, this.modalOption(this.emptyEl()));
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      this.crate(newElement);
    });
  }

  editRow(el: any): void {
    const elementIndex = this.elements.findIndex((elem: any) => el === elem);
    this.modalRef = this.modalService.show(MainLiteratureEditComponent, this.modalOption(el));
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      this.elements[elementIndex] = newElement;
      newElement.author = el.author;
      this.save(newElement);
    });
    this.mdbTable.setDataSource(this.elements);
  }

  emptyEl(): any {
    return {id: 0, first: '', last: ''};
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
