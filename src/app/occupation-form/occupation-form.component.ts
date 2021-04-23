import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import { OccupationFormService } from '../services/occupation-form.service';
import { OccupationForm } from '../models/OccupationForm';
import {MDBModalRef, MDBModalService, MdbTableDirective, MdbTablePaginationComponent} from 'angular-bootstrap-md';
import {OccupationFormEditComponent} from './occupation-form-edit.component';

@Component({
  selector: 'app-occupation-form',
  templateUrl: './occupation-form.component.html',
  styleUrls: ['./occupation-form.component.scss'],
  providers: [OccupationFormService]
})
export class OccupationFormComponent implements OnInit, AfterViewInit {

  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;

  elements: any = [];
  headElements = ['Номер', 'Название', 'Множественная форма', 'Команда'];
  searchText = '';
  previous: string;
  modalRef: MDBModalRef;

  constructor(
    private valueService: OccupationFormService,
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
      .subscribe((data: OccupationForm[]) => {
        data.sort((a, b) => a.id - b.id);
        data.forEach((obj, index) => {
          this.elements.push({
            id: (++index).toString(),
            first: obj.id,
            second: obj.fullName,
            last: obj.pluralName});
        });
        this.mdbTable.setDataSource(this.elements);
        this.mdbTablePagination.setMaxVisibleItemsNumberTo(8);
        this.elements = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
      });
  }

  crate(el: any): void {
    const occupationForm = new OccupationForm(0, el.second, el.last);
    this.valueService.createValue(occupationForm)
      .subscribe((occupationFormResponse: OccupationForm) => {
        const index = this.elements.length + 1;
        this.mdbTable.addRow({
          id: index.toString(),
          first: occupationFormResponse.id,
          second: occupationFormResponse.fullName,
          last: occupationFormResponse.pluralName
        });
        this.mdbTable.setDataSource(this.elements);
      });
  }

  save(el: any): void {
    const occupationForm = new OccupationForm(el.first, el.second, el.last);
    this.valueService.updateValue(occupationForm).subscribe();
  }

  delete(el: any): void {
    this.valueService.deleteValue(el.first)
      .subscribe(() => {
        this.removeRow(el);
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
    this.modalRef = this.modalService.show(OccupationFormEditComponent, this.modalOption(this.emptyEl()));
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      this.crate(newElement);
    });
  }

  editRow(el: any): void {
    const elementIndex = this.elements.findIndex((elem: any) => el === elem);
    this.modalRef = this.modalService.show(OccupationFormEditComponent, this.modalOption(el));
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      this.elements[elementIndex] = newElement;
      this.save(newElement);
    });
    this.mdbTable.setDataSource(this.elements);
  }

  emptyEl(): any {
    return {id: 0, first: '', second: '', last: ''};
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
