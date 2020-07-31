import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import { CurriculumTopicService } from '../services/curriculum-topic.service';
import { CurriculumTopic } from '../models/CurriculumTopic';
import {MDBModalRef, MDBModalService, MdbTableDirective, MdbTablePaginationComponent} from 'angular-bootstrap-md';
import {CurriculumTopicEditComponent} from './curriculum-topic-edit.component';

@Component({
  selector: 'app-curriculum-topic',
  templateUrl: './curriculum-topic.component.html',
  styleUrls: ['./curriculum-topic.component.scss'],
  providers: [CurriculumTopicService]
})
export class CurriculumTopicComponent implements OnInit, AfterViewInit {
  value: CurriculumTopic = new CurriculumTopic();
  values: CurriculumTopic[];
  // teachingPositions: TeachingPosition[];
  // teachingPosition: TeachingPosition = new TeachingPosition();


  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;

  elements: any = [];
  headElements = ['Номер', 'id', 'Должность', 'Кафедрал', 'Имя', 'Команда'];
  searchText = '';
  previous: string;
  modalRef: MDBModalRef;

  constructor(
    private valueService: CurriculumTopicService,
    // private teachingPositionService: TeachingPositionService,
    private cdRef: ChangeDetectorRef,
    private modalService: MDBModalService) { }

  // tslint:disable-next-line:typedef
  @HostListener('input') oninput() {
    this.mdbTablePagination.searchText = this.searchText;
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.loadValue();
    // this.loadTeachingPosition();
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
      .subscribe((data: CurriculumTopic[]) => {
        this.values = data;
        // tslint:disable-next-line:only-arrow-functions typedef
        this.values.sort(function(a, b) {
          return a.id - b.id;
        });
        for (let i = 1; i <= this.values.length; i++) {
          this.elements.push({
            id: i.toString(),
            first: this.values[i - 1].id,
            second: this.values[i - 1].topicTitle,
            third: this.values[i - 1].annotation,
            fourth: this.values[i - 1].classHours,
            fifth: this.values[i - 1].curriculumSectionId,
            sixth: this.values[i - 1].occupationFormId,
            last: this.values[i - 1].isDistanceLearning});
        }
        this.mdbTable.setDataSource(this.elements);
        this.mdbTablePagination.setMaxVisibleItemsNumberTo(8);
        this.elements = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
      });
  }

  // tslint:disable-next-line:typedef
  crate(){
    // this.value.teachingPositionId = this.teachingPosition.id;
    this.valueService.createValue(this.value)
      .subscribe((data: CurriculumTopic) => {
        this.value = data;
        const index = this.elements.length + 1;
        // this.value.teachingPositionName = this.teachingPositions.find(p => p.id === +this.value.teachingPositionId).name;
        this.mdbTable.addRow({
          id: index.toString(),
          first: this.value.id,
          second: this.value.topicTitle,
          third: this.value.annotation,
          fourth: this.value.classHours,
          fifth: this.value.curriculumSectionId,
          sixth: this.value.occupationFormId,
          last: this.value.isDistanceLearning
        });
        this.mdbTable.setDataSource(this.elements);
        this.cancel();
      });
  }

  // tslint:disable-next-line:typedef
  save(el: any) {
    this.cancel();
    this.value.id = el.first;
    // this.value.teachingPositionId = el.second;
    // this.value.isCathedral = el.third;
    // this.value.name = el.last;
    this.valueService.updateValue(this.value)
      .subscribe();
    this.cancel();
  }
  // tslint:disable-next-line:typedef
  editValue(p: CurriculumTopic) {
    this.value = p;
  }
  // tslint:disable-next-line:typedef
  cancel() {
    this.value = new CurriculumTopic();
  }
  // tslint:disable-next-line:typedef
  delete(p: any) {
    this.value.id = p.first;
    // this.value.teachingPositionId = p.second;
    // this.value.isCathedral = p.third;
    // this.value.name = p.last;
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
    this.modalRef = this.modalService.show(CurriculumTopicEditComponent, modalOptions);
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      this.elements[elementIndex] = newElement;
      this.save(newElement);
    });
    this.mdbTable.setDataSource(this.elements);
  }
}
