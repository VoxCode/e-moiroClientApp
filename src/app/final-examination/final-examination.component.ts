import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {MDBModalRef, MDBModalService, MdbTableDirective, MdbTablePaginationComponent} from 'angular-bootstrap-md';
import {FinalExaminationService} from '../services/final-examination.service';
import {CertificationTypeService} from '../services/certification-type.service';
import {FinalExamination} from '../models/FinalExamination';
import {CertificationType} from '../models/CertificationType';
import {FinalExaminationEditComponent} from './final-examination-edit.component';

@Component({
  selector: 'app-final-examination',
  templateUrl: './final-examination.component.html',
  styleUrls: ['./final-examination.component.scss'],
  providers: [FinalExaminationService, CertificationTypeService]
})
export class FinalExaminationComponent implements OnInit, AfterViewInit {
  value: FinalExamination = new FinalExamination();
  values: FinalExamination[];
  certificationTypes: CertificationType[];
  certificationType: CertificationType = new CertificationType();

  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;

  elements: any = [];
  headElements = ['Номер', 'id', 'Тип аттестации', 'Название', 'Команда'];
  searchText = '';
  previous: string;
  modalRef: MDBModalRef;

  constructor(
    private valueService: FinalExaminationService,
    private certificationTypeService: CertificationTypeService,
    private cdRef: ChangeDetectorRef,
    private modalService: MDBModalService) { }

  // tslint:disable-next-line:typedef
  @HostListener('input') oninput() {
    this.mdbTablePagination.searchText = this.searchText;
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.loadValue();
    this.loadCertificationType();
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

  // tslint:disable-next-line:typedef
  loadValue() {
    this.valueService.getValues()
      .subscribe((data: FinalExamination[]) => {
        this.values = data;
        // tslint:disable-next-line:only-arrow-functions typedef
        this.values.sort(function(a, b) {
          return a.id - b.id;
        });
        for (let i = 1; i <= this.values.length; i++) {
          this.elements.push({
            id: i.toString(),
            first: this.values[i - 1].id,
            second: this.values[i - 1].certificationTypeId,
            third: this.values[i - 1].certificationTypeName,
            last: this.values[i - 1].content});
        }
        this.mdbTable.setDataSource(this.elements);
        this.mdbTablePagination.setMaxVisibleItemsNumberTo(8);
        this.elements = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
      });
  }

  // tslint:disable-next-line:typedef
  crate(){
    this.value.certificationTypeId = this.certificationType.id;
    this.valueService.createValue(this.value)
      .subscribe((data: FinalExamination) => {
        this.value = data;
        const index = this.elements.length + 1;
        this.value.certificationTypeName = this.certificationTypes.find(p => p.id === +this.value.certificationTypeId).name;
        this.mdbTable.addRow({
          id: index.toString(),
          first: this.value.id,
          second: this.value.certificationTypeId,
          third: this.value.certificationTypeName,
          last: this.value.content
        });
        this.mdbTable.setDataSource(this.elements);
        this.cancel();
      });
  }

  // tslint:disable-next-line:typedef
  save(el: any) {
    this.cancel();
    this.value.id = el.first;
    this.value.certificationTypeId = el.second;
    this.value.content = el.last;
    this.valueService.updateValue(this.value)
      .subscribe();
    this.cancel();
  }
  // tslint:disable-next-line:typedef
  editValue(p: FinalExamination) {
    this.value = p;
  }
  // tslint:disable-next-line:typedef
  cancel() {
    this.value = new FinalExamination();
  }
  // tslint:disable-next-line:typedef
  delete(p: any) {
    this.value.id = p.first;
    this.value.certificationTypeId = p.second;
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
    this.cancel();
  }

  // tslint:disable-next-line:typedef
  editRow(el: any) {
    const elementIndex = this.elements.findIndex((elem: any) => el === elem);
    const modalOptions = {
      data: {
        editableRow: el
      }
    };
    this.modalRef = this.modalService.show(FinalExaminationEditComponent, modalOptions);
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      this.elements[elementIndex] = newElement;
      this.save(newElement);
    });
    this.mdbTable.setDataSource(this.elements);
  }

  // tslint:disable-next-line:typedef
  loadCertificationType() {
    this.certificationTypeService.getValues()
      .subscribe((data: CertificationType[]) => {
        this.certificationTypes = data;
      });
  }
}
