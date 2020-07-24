import {ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import { SectionNumberService } from '../services/section-number.service';
import { SectionNumber } from '../models/SectionNumber';
import {MdbTableDirective, MdbTablePaginationComponent} from 'angular-bootstrap-md';

@Component({
  selector: 'app-section-number',
  templateUrl: './section-number.component.html',
  styleUrls: ['./section-number.component.scss'],
  providers: [SectionNumberService]
})
export class SectionNumberComponent implements OnInit {
  value: SectionNumber = new SectionNumber();
  values: SectionNumber[];

  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;

  elements: any = [];
  headElements = ['id', 'Содержание', 'Команда'];
  searchText = '';
  previous: string;
  maxVisibleItems = 8;

  constructor(private valueService: SectionNumberService, private cdRef: ChangeDetectorRef) { }

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
      .subscribe((data: SectionNumber[]) => {
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
        .subscribe((data: SectionNumber) => this.values.push(data));
    } else {
      this.valueService.updateValue(this.value)
        .subscribe();
    }
    this.cancel();
  }
  // tslint:disable-next-line:typedef
  editValue(p: SectionNumber) {
    this.value = p;
  }
  // tslint:disable-next-line:typedef
  cancel() {
    this.value = new SectionNumber();
  }
  // tslint:disable-next-line:typedef
  delete(p: SectionNumber) {
    this.valueService.deleteValue(p.id)
      .subscribe();
  }
  // tslint:disable-next-line:typedef
  add() {
    this.cancel();
  }
}
