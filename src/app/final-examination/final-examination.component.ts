import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {MDBModalRef, MDBModalService, MdbTableDirective, MdbTablePaginationComponent} from 'angular-bootstrap-md';
import {FinalExaminationService} from '../services/final-examination.service';
import {FinalExamination} from '../models/FinalExamination';
import {FinalExaminationEditComponent} from './final-examination-edit.component';
import {IsDeleteComponent} from '../is-delete/is-delete.component';
import {Globals} from '../globals';

@Component({
  selector: 'app-final-examination',
  templateUrl: './final-examination.component.html',
  styleUrls: ['./final-examination.component.scss'],
  providers: [FinalExaminationService]
})
export class FinalExaminationComponent implements OnInit, AfterViewInit {

  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;

  elements: any = [];
  headElements = ['Номер', 'Название', 'Тип аттестации', 'Команда'];
  searchText = '';
  previous: string;
  modalRef: MDBModalRef;

  constructor(
    private valueService: FinalExaminationService,
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
        .subscribe((data: FinalExamination[]) => {
          this.pushData(data);
        });
    }
    else {
      this.valueService.getAuthorValues(this.globals.name)
        .subscribe((data: FinalExamination[]) => {
          this.pushData(data);
        });
    }
  }

  pushData(data: FinalExamination[]): void {
    data.sort((a, b) => a.id - b.id);
    data.forEach((obj, index) => {
      this.elements.push({
        id: (++index).toString(),
        first: obj.id,
        second: obj.certificationTypeId,
        third: obj.certificationTypeName,
        last: obj.content,
        author: obj.authorIndex});
    });
    this.mdbTable.setDataSource(this.elements);
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(8);
    this.elements = this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();
  }

  crate(el: any): void {
    const finalExamination = new FinalExamination(0, el.last, el.second, el.third, this.globals.userId);
    this.valueService.createValue(finalExamination)
      .subscribe((finalExaminationResponse: FinalExamination) => {
        const index = this.elements.length + 1;
        this.mdbTable.addRow({
          id: index.toString(),
          first: finalExaminationResponse.id,
          second: finalExaminationResponse.certificationTypeId,
          third: finalExaminationResponse.certificationTypeName,
          last: finalExaminationResponse.content,
          author: finalExaminationResponse.authorIndex
        });
        this.mdbTable.setDataSource(this.elements);
      });
  }

  save(el: any): void {
    const finalExamination = new FinalExamination(el.first, el.last, el.second, el.third, el.author);
    this.valueService.updateValue(finalExamination).subscribe();
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
    this.modalRef = this.modalService.show(FinalExaminationEditComponent, this.modalOption(this.emptyEl()));
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      this.crate(newElement);
    });
  }

  editRow(el: any): void {
    const elementIndex = this.elements.findIndex((elem: any) => el === elem);
    this.modalRef = this.modalService.show(FinalExaminationEditComponent, this.modalOption(el));
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      this.elements[elementIndex] = newElement;
      newElement.author = el.author;
      this.save(newElement);
    });
    this.mdbTable.setDataSource(this.elements);
  }

  emptyEl(): any {
    return { id: 0, first: '', second: '', last: '' };
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
