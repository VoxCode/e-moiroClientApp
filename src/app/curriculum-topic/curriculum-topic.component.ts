import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import { CurriculumTopicService } from '../services/curriculum-topic.service';
import { CurriculumTopic } from '../models/CurriculumTopic';
import {MDBModalRef, MDBModalService, MdbTableDirective, MdbTablePaginationComponent} from 'angular-bootstrap-md';
import {CurriculumTopicEditComponent} from './curriculum-topic-edit.component';
import {IsDeleteComponent} from '../is-delete/is-delete.component';
import {Globals} from '../globals';

@Component({
  selector: 'app-curriculum-topic',
  templateUrl: './curriculum-topic.component.html',
  styleUrls: ['./curriculum-topic.component.scss'],
  providers: [CurriculumTopicService]
})

export class CurriculumTopicComponent implements OnInit, AfterViewInit {

  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;

  elements: any = [];
  headElements = ['Номер', 'Тема', 'Аннотация', 'Команда'];
  searchText = '';
  previous: string;
  modalRef: MDBModalRef;

  constructor(
    private valueService: CurriculumTopicService,
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
        .subscribe((data: CurriculumTopic[]) => {
          this.pushData(data);
        });
    }
    else {
      this.valueService.getAuthorValues(this.globals.name)
        .subscribe((data: CurriculumTopic[]) => {
          this.pushData(data);
        });
    }
  }

  pushData(data: CurriculumTopic[]): void {
    data.sort((a, b) => a.id - b.id);
    data.forEach((obj, index) => {
      this.elements.push({
        id: (++index).toString(),
        first: obj.id,
        second: obj.topicTitle,
        last: obj.annotation,
        author: obj.authorIndex});
    });
    this.mdbTable.setDataSource(this.elements);
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(8);
    this.elements = this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();
  }

  crate(el: any): void {
    const curriculumTopic = new CurriculumTopic(0, el.second, el.last, this.globals.name);
    this.valueService.createValue(curriculumTopic)
      .subscribe((curriculumTopicResponse: CurriculumTopic) => {
        const index = this.elements.length + 1;
        this.mdbTable.addRow({
          id: index.toString(),
          first: curriculumTopicResponse.id,
          second: curriculumTopicResponse.topicTitle,
          last: curriculumTopicResponse.annotation,
          author: curriculumTopicResponse.authorIndex
        });
        this.mdbTable.setDataSource(this.elements);
      });
  }

  save(el: any): void {
    const curriculumTopic = new CurriculumTopic(el.first, el.second, el.last, el.author);
    this.valueService.updateValue(curriculumTopic).subscribe();
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
    this.modalRef = this.modalService.show(CurriculumTopicEditComponent, this.modalOption(this.emptyEl()));
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      this.crate(newElement);
    });
  }

  editRow(el: any): void {
    const elementIndex = this.elements.findIndex((elem: any) => el === elem);
    this.modalRef = this.modalService.show(CurriculumTopicEditComponent, this.modalOption(el));
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
