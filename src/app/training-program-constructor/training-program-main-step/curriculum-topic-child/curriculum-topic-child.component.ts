import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {CurriculumTopicTrainingProgram} from '../../../models/СurriculumTopicTrainingProgram';
import {TrainingProgram} from '../../../models/TrainingProgram';
import {TrainingProgramCurriculumSection} from '../../../models/TrainingProgramCurriculumSection';
import {OccupationForm} from '../../../models/OccupationForm';
import {CurriculumTopicTrainingProgramService} from '../../../services/curriculum-topic-training-program.service';
import {CurriculumTopicEditComponent} from '../../../curriculum-topic/curriculum-topic-edit.component';
import {MDBModalRef, MDBModalService} from 'angular-bootstrap-md';
import {CurriculumTopicTemplateComponent} from '../../../curriculum-topic/curriculum-topic-template.component';
import {CurriculumTopic} from '../../../models/CurriculumTopic';
import {Globals} from '../../../globals';
import {CurriculumTopicService} from '../../../services/curriculum-topic.service';
import {IsDeleteComponent} from '../../../is-delete/is-delete.component';

@Component({
  selector: 'app-curriculum-topic-child',
  templateUrl: './curriculum-topic-child.component.html',
  styleUrls: ['./curriculum-topic-child.component.scss'],
  providers: [
    CurriculumTopicTrainingProgramService
  ]
})
export class CurriculumTopicChildComponent implements OnInit {
  @Input() trainingProgram: TrainingProgram;
  @Input() trainingProgramCurriculumSection: TrainingProgramCurriculumSection;
  @Input() occupationForms: OccupationForm[];
  @Output() newTodoValue = new EventEmitter<CurriculumTopic>();
  done: any[] = [];
  modalRef: MDBModalRef;
  plurals = {
    result: {
      '=1': 'час',
      '=2': 'часа',
      '=3': 'часа',
      '=4': 'часа',
      other: 'часов'
    },
  };

  constructor(
    public globals: Globals,
    private modalService: MDBModalService,
    private curriculumTopicTrainingProgramService: CurriculumTopicTrainingProgramService,
    private curriculumTopicService: CurriculumTopicService) { }

  ngOnInit(): void {
    this.loadCurriculumTopicTrainingPrograms();
  }

  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container && this.trainingProgramCurriculumSection.id) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.save();
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      this.save();
    }
  }

  loadCurriculumTopicTrainingPrograms(): void {
    this.curriculumTopicTrainingProgramService.getFromTrainingProgramCurriculumSection(this.trainingProgramCurriculumSection.id)
      .subscribe((curriculumTopicTrainingPrograms: CurriculumTopicTrainingProgram[]) => {
        if (!curriculumTopicTrainingPrograms || curriculumTopicTrainingPrograms.length === 0) { return; }
        curriculumTopicTrainingPrograms
          .sort((a, b) => a.serialNumber - b.serialNumber);
        curriculumTopicTrainingPrograms.forEach((curriculumTopicTrainingProgram) => {
          this.done.push(this.newDoneElement(curriculumTopicTrainingProgram));
        });
      });
  }

  crateCurriculumTopicTrainingProgram(curriculumTopicTrainingProgram: CurriculumTopicTrainingProgram): void {
    this.curriculumTopicTrainingProgramService.createValue(curriculumTopicTrainingProgram)
      .subscribe((curriculumTopicTrainingProgramResponse: CurriculumTopicTrainingProgram) => {
        this.done.push(this.newDoneElement(curriculumTopicTrainingProgramResponse));
      });
  }

  updateCurriculumTopicTrainingProgram(item: any): void {
    const curriculumTopicTrainingProgram = new CurriculumTopicTrainingProgram();
    curriculumTopicTrainingProgram.id = item.curriculumTopicTrainingProgramId;
    curriculumTopicTrainingProgram.isVariable = item.isVariable;
    curriculumTopicTrainingProgram.topicTitle = item.topicTitle;
    curriculumTopicTrainingProgram.annotation = item.annotation;
    curriculumTopicTrainingProgram.serialNumber = item.serialNumber;
    curriculumTopicTrainingProgram.trainingProgramCurriculumSectionId = item.trainingProgramCurriculumSectionId;
    curriculumTopicTrainingProgram.testWorkHours = item.testWorkHours;
    this.curriculumTopicTrainingProgramService.updateValue(curriculumTopicTrainingProgram).subscribe(() => {
        console.log('Update was successful');
      });
  }

  deleteCurriculumTopicTrainingProgram(item: any, index: number): void {
    const editableRow = {heading: item.topicTitle};
    this.modalRef = this.modalService.show(IsDeleteComponent, this.modalOption(editableRow));
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      if (newElement) {
        this.curriculumTopicTrainingProgramService.deleteValue(item.curriculumTopicTrainingProgramId).subscribe(() => {
          this.done.splice(index, 1);
          console.log('Delete was successful');
        });
      }
    });
  }

  save(): void {
    const curriculumTopicTrainingPrograms: CurriculumTopicTrainingProgram[] = [];
    this.done.forEach((object, index) => {
      if (object.curriculumTopicId) {
        const curriculumTopicTrainingProgram = new CurriculumTopicTrainingProgram(
          0,
          false,
          ++index,
          this.trainingProgramCurriculumSection.id,
          object.topicTitle,
          object.annotation);
        this.curriculumTopicTrainingProgramService.createValue(curriculumTopicTrainingProgram)
          .subscribe((curriculumTopicTrainingProgramResponse: CurriculumTopicTrainingProgram) => {
            object.serialNumber = curriculumTopicTrainingProgramResponse.serialNumber;
            object.curriculumTopicTrainingProgramId = curriculumTopicTrainingProgramResponse.id;
            object.testWorkHours = 0;
            object.curriculumTopicId = undefined;
            object.trainingProgramCurriculumSectionId = this.trainingProgramCurriculumSection.id;
          });
      }
      else {
        const curriculumTopicTrainingProgram = new CurriculumTopicTrainingProgram();
        curriculumTopicTrainingProgram.id = object.curriculumTopicTrainingProgramId;
        curriculumTopicTrainingProgram.isVariable = object.isVariable;
        curriculumTopicTrainingProgram.topicTitle = object.topicTitle;
        curriculumTopicTrainingProgram.annotation = object.annotation;
        curriculumTopicTrainingProgram.serialNumber = ++index;
        curriculumTopicTrainingProgram.trainingProgramCurriculumSectionId = this.trainingProgramCurriculumSection.id;
        curriculumTopicTrainingProgram.testWorkHours = object.testWorkHours;
        curriculumTopicTrainingPrograms.push(curriculumTopicTrainingProgram);
      }
    });
    this.curriculumTopicTrainingProgramService.updateSerialNumbers(curriculumTopicTrainingPrograms).subscribe(() => {
      console.log('Successful!');
    });
  }

  crateCurriculumTopicTemplate(curriculumTopicTemplate: CurriculumTopic): void {
    this.curriculumTopicService.createValue(curriculumTopicTemplate)
      .subscribe((curriculumTopicTemplateResponse: CurriculumTopic) => {
        console.log('Save was successful!');
        this.curriculumTopicService.createRelationships(this.trainingProgram, curriculumTopicTemplateResponse.id)
          .subscribe(() => {
            this.newTodoValue.emit(curriculumTopicTemplateResponse);
            console.log('Relationships created!');
          });
      });
  }

  curriculumTopicAddForm(): void {
    this.modalRef = this.modalService.show(CurriculumTopicEditComponent, this.modalOption(this.emptyEl()));
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      const curriculumTopicTrainingProgram = new CurriculumTopicTrainingProgram(
        0,
        false,
        this.done.length + 1,
        this.trainingProgramCurriculumSection.id,
        newElement.second,
        newElement.last);
      this.crateCurriculumTopicTrainingProgram(curriculumTopicTrainingProgram);
      if (newElement.third) {
        const element = {id: 0, first: '', second: newElement.second, last: newElement.last};
        this.modalRef = this.modalService.show(CurriculumTopicTemplateComponent, this.modalOption(element));
        this.modalRef.content.saveButtonClicked.subscribe((newTemplateElement: any) => {
          const curriculumTopicTemplate = new CurriculumTopic(
            0,
            newTemplateElement.second,
            newTemplateElement.last,
            this.globals.userId
          );
          this.crateCurriculumTopicTemplate(curriculumTopicTemplate);
        });
      }
    });
  }

  curriculumTopicEditForm(item: any): void {
    const el = this.emptyEl();
    el.second = item.topicTitle;
    el.last = item.annotation;
    this.modalRef = this.modalService.show(CurriculumTopicEditComponent, this.modalOption(el));
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      item.topicTitle = newElement.second;
      item.annotation = newElement.last;
      this.updateCurriculumTopicTrainingProgram(item);
    });
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

  newDoneElement(curriculumTopicTrainingProgram: CurriculumTopicTrainingProgram): any {
    return {
      topicTitle: curriculumTopicTrainingProgram.topicTitle,
      isVariable: curriculumTopicTrainingProgram.isVariable,
      curriculumTopicTrainingProgramId: curriculumTopicTrainingProgram.id,
      serialNumber: curriculumTopicTrainingProgram.serialNumber,
      annotation: curriculumTopicTrainingProgram.annotation,
      trainingProgramCurriculumSectionId: curriculumTopicTrainingProgram.trainingProgramCurriculumSectionId,
      testWorkHours: curriculumTopicTrainingProgram.testWorkHours
    };
  }
}
