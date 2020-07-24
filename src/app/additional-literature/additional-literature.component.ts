import {Component, OnInit, ElementRef, HostListener, AfterViewInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import { AdditionalLiteratureService } from '../services/additional-literature.service';
import { AdditionalLiterature } from '../models/AdditionalLiterature';
import {MdbTableDirective, MdbTablePaginationComponent} from 'angular-bootstrap-md';

@Component({
  selector: 'app-additional-literature',
  templateUrl: './additional-literature.component.html',
  styleUrls: ['./additional-literature.component.scss'],
  providers: [AdditionalLiteratureService]
})
export class AdditionalLiteratureComponent implements OnInit {
  value: AdditionalLiterature = new AdditionalLiterature();
  values: AdditionalLiterature[];

  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;

  elements: any = [];
  headElements = ['id', 'Содержание', 'Команда'];
  searchText = '';
  previous: string;
  maxVisibleItems = 8;

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
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.maxVisibleItems);
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
      this.values = this.mdbTable.searchLocalDataBy(this.searchText);
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
        this.mdbTable.setDataSource(this.values);
        this.values = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
        this.cdRef.detectChanges();
      });
  }
  // tslint:disable-next-line:typedef
  save() {
    if (this.value.id == null) {
      this.valueService.createValue(this.value)
        .subscribe((data: AdditionalLiterature) => this.values.push(data));
    } else {
      this.valueService.updateValue(this.value)
        .subscribe();
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
  }
  // tslint:disable-next-line:typedef
  delete(p: AdditionalLiterature) {
    this.valueService.deleteValue(p.id)
      .subscribe();
  }
  // tslint:disable-next-line:typedef
  add() {
    this.cancel();
  }
}
