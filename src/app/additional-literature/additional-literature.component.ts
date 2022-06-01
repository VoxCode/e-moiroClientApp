import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {AdditionalLiteratureService} from '../services/additional-literature.service';
import {AdditionalLiterature} from '../models/AdditionalLiterature';
import {MDBModalRef, MDBModalService, MdbTableDirective, MdbTablePaginationComponent} from 'angular-bootstrap-md';
import {AdditionalLiteratureEditComponent} from './additional-literature-edit.component';
import {IsDeleteComponent} from '../is-delete/is-delete.component';
import {Globals} from '../globals';

@Component({
  selector: 'app-additional-literature',
  templateUrl: './additional-literature.component.html',
  styleUrls: ['./additional-literature.component.scss'],
  providers: [AdditionalLiteratureService]
})
export class AdditionalLiteratureComponent implements OnInit, AfterViewInit {

  @ViewChild(MdbTableDirective, {static: true}) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, {static: true}) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', {static: true}) row: ElementRef;

  elements: any = [];
  headElements = ['Номер', 'Содержание', 'Команда'];
  searchText = '';
  previous: string;
  modalRef: MDBModalRef;

  constructor(
    private valueService: AdditionalLiteratureService,
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
        .subscribe((data: AdditionalLiterature[]) => {
          this.pushData(data);
        });
    }
    else {
      this.valueService.getAuthorValues(this.globals.name)
        .subscribe((data: AdditionalLiterature[]) => {
          this.pushData(data);
        });
    }
  }

  pushData(data: AdditionalLiterature[]): void {
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
    const additionalLiterature = new AdditionalLiterature(0, el.last, this.globals.userId);
    this.valueService.createValue(additionalLiterature)
      .subscribe((additionalLiteratureResponse: AdditionalLiterature) => {
        const index = this.elements.length + 1;
        this.mdbTable.addRow({
          id: index.toString(),
          first: additionalLiteratureResponse.id,
          last: additionalLiteratureResponse.content,
          author: additionalLiteratureResponse.authorIndex
        });
        this.mdbTable.setDataSource(this.elements);
      });
  }

  save(el: any): void {
    const additionalLiterature = new AdditionalLiterature(el.first, el.last, el.author);
    this.valueService.updateValue(additionalLiterature).subscribe();
  }

  delete(el: any): void {
    const editableRow = {heading: el.last};
    this.modalRef = this.modalService.show(IsDeleteComponent, this.modalOption(editableRow));
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      if (newElement) {
        this.valueService.deleteValue(el.first).subscribe(() => {
          this.removeRow(el);
        });
      }
    });
  }

  removeRow(el: any): void {
    const elementIndex = this.elements.findIndex((elem) => el === elem);
    this.mdbTable.removeRow(elementIndex);
    this.mdbTable.getDataSource().forEach((value, index) => {
      value.id = (++index).toString();
    });
    this.mdbTable.setDataSource(this.elements);
  }

  addRow(): void {
    this.modalRef = this.modalService.show(AdditionalLiteratureEditComponent, this.modalOption(this.emptyEl()));
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      this.crate(newElement);
    });
  }

  editRow(el: any): void {
    const elementIndex = this.elements.findIndex((elem: any) => el === elem);
    this.modalRef = this.modalService.show(AdditionalLiteratureEditComponent, this.modalOption(el));
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
