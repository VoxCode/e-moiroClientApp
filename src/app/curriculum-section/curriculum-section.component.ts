import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import { CurriculumSectionService } from '../services/curriculum-section.service';
import { CurriculumSection } from '../models/CurriculumSection';
import {MDBModalRef, MDBModalService, MdbTableDirective, MdbTablePaginationComponent} from 'angular-bootstrap-md';
import {CurriculumSectionEditComponent} from './curriculum-section-edit.component';

@Component({
  selector: 'app-curriculum-section',
  templateUrl: './curriculum-section.component.html',
  styleUrls: ['./curriculum-section.component.scss'],
  providers: [CurriculumSectionService]
})
export class CurriculumSectionComponent implements OnInit, AfterViewInit {

  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;

  elements: any = [];
  headElements = ['Номер', 'Название', 'Команда'];
  searchText = '';
  previous: string;
  modalRef: MDBModalRef;

  constructor(
    private valueService: CurriculumSectionService,
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
      .subscribe((data: CurriculumSection[]) => {
        data.sort((a, b) => a.id - b.id);
        data.forEach((obj, index) => {
          this.elements.push({
            id: (++index).toString(),
            first: obj.id,
            last: obj.name});
        });
        this.mdbTable.setDataSource(this.elements);
        this.mdbTablePagination.setMaxVisibleItemsNumberTo(8);
        this.elements = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
      });
  }

  crate(el: any): void {
    const curriculumSection = new CurriculumSection(0, el.last);
    this.valueService.createValue(curriculumSection)
      .subscribe((curriculumSectionResponse: CurriculumSection) => {
        const index = this.elements.length + 1;
        this.mdbTable.addRow({
          id: index.toString(),
          first: curriculumSectionResponse.id,
          last: curriculumSectionResponse.name
        });
        this.mdbTable.setDataSource(this.elements);
      });
  }

  save(el: any): void {
    const curriculumSection = new CurriculumSection(el.first, el.last);
    this.valueService.updateValue(curriculumSection).subscribe();
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
    this.modalRef = this.modalService.show(CurriculumSectionEditComponent, this.modalOption(this.emptyEl()));
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      this.crate(newElement);
    });
  }

  editRow(el: any): void {
    const elementIndex = this.elements.findIndex((elem: any) => el === elem);
    this.modalRef = this.modalService.show(CurriculumSectionEditComponent, this.modalOption(el));
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      this.elements[elementIndex] = newElement;
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


