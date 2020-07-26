import {Component, OnInit, ElementRef, HostListener, AfterViewInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import { AdditionalLiteratureService } from '../services/additional-literature.service';
import { AdditionalLiterature } from '../models/AdditionalLiterature';
import {MDBModalRef, MdbTableDirective, MdbTablePaginationComponent} from 'angular-bootstrap-md';

@Component({
  selector: 'app-additional-literature',
  templateUrl: './additional-literature.component.html',
  styleUrls: ['./additional-literature.component.scss'],
  providers: [AdditionalLiteratureService]
})
export class AdditionalLiteratureComponent implements OnInit, AfterViewInit {
  value: AdditionalLiterature = new AdditionalLiterature();
  values: AdditionalLiterature[];

  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;

  elements: any = [];
  headElements = ['Номер', 'id', 'Содержание', 'Команда'];
  searchText = '';
  previous: string;
  maxVisibleItems = 8;
  modalRef: MDBModalRef;

  constructor(private valueService: AdditionalLiteratureService, private cdRef: ChangeDetectorRef) { }

  // tslint:disable-next-line:typedef
  @HostListener('input') oninput() {
    this.mdbTablePagination.searchText = this.searchText;
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.loadValue();
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
      this.values = this.mdbTable.getDataSource();
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
      .subscribe((data: AdditionalLiterature[]) => {
        this.values = data;
        for (let i = 1; i <= this.values.length; i++) {
          this.elements.push({id: i.toString(), first: this.values[i - 1].id, last: this.values[i - 1].content});
        }
        this.mdbTable.setDataSource(this.elements);
        this.mdbTablePagination.setMaxVisibleItemsNumberTo(8);
        this.elements = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
      });
  }

  // tslint:disable-next-line:typedef
  save() {
    if (this.value.id == null) {
      this.valueService.createValue(this.value)
        .subscribe((data: AdditionalLiterature) => this.values.push(data));
      this.loadValue();
    } else {
      this.valueService.updateValue(this.value)
        .subscribe(data => {
          const elementIndex = this.elements.findIndex((elem: any) => this.value === elem);
          this.elements[elementIndex] = this.value;
          this.loadValue();
        } );

    }
    this.cancel();
  }
  // tslint:disable-next-line:typedef
  editValue(p: AdditionalLiterature) {
    this.value = p;
  }
  // tslint:disable-next-line:typedef
  cancel() {
    this.value = new AdditionalLiterature();
    this.loadValue();
  }
  // tslint:disable-next-line:typedef
  delete(p: any) {
    this.value.id = p.first;
    this.value.content = p.last;
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
  }
}


