import {Component, Input, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {CurriculumTopicTrainingProgram} from '../../../models/СurriculumTopicTrainingProgram';
import {TrainingProgram} from '../../../models/TrainingProgram';
import {TrainingProgramCurriculumSection} from '../../../models/TrainingProgramCurriculumSection';
import {OccupationForm} from '../../../models/OccupationForm';
import {CurriculumTopicTrainingProgramService} from '../../../services/curriculum-topic-training-program.service';
import {CurriculumTopicEditComponent} from '../../../curriculum-topic/curriculum-topic-edit.component';
import {MDBModalRef, MDBModalService} from 'angular-bootstrap-md';
import {TrainingProgramAdditionalLiterature} from "../../../models/TrainingProgramAdditionalLiterature";

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
  done: any[] = [];
  modalRef: MDBModalRef;

  constructor(
    private modalService: MDBModalService,
    private curriculumTopicTrainingProgramService: CurriculumTopicTrainingProgramService) { }

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
    curriculumTopicTrainingProgram.classHours = item.classHours;
    curriculumTopicTrainingProgram.topicTitle = item.topicTitle;
    curriculumTopicTrainingProgram.annotation = item.annotation;
    curriculumTopicTrainingProgram.serialNumber = item.serialNumber;
    curriculumTopicTrainingProgram.trainingProgramCurriculumSectionId = item.trainingProgramCurriculumSectionId;
    this.curriculumTopicTrainingProgramService.updateValue(curriculumTopicTrainingProgram).subscribe(() => {
        console.log('Update was successful');
      });
  }

  deleteCurriculumTopicTrainingProgram(id: any, index: number): void {
    this.curriculumTopicTrainingProgramService.deleteValue(id).subscribe(() => {
      this.done.splice(index, 1);
      console.log('Delete was successful');
    });
  }

  save(): void {
    const curriculumTopicTrainingPrograms: CurriculumTopicTrainingProgram[] = [];
    this.done.forEach((object, index) => {
      const curriculumTopicTrainingProgram: CurriculumTopicTrainingProgram = new CurriculumTopicTrainingProgram();
      curriculumTopicTrainingProgram.id = object.curriculumTopicTrainingProgramId;
      curriculumTopicTrainingProgram.isVariable = object.isVariable;
      curriculumTopicTrainingProgram.classHours = object.classHours;
      curriculumTopicTrainingProgram.topicTitle = object.topicTitle;
      curriculumTopicTrainingProgram.annotation = object.annotation;
      curriculumTopicTrainingProgram.serialNumber = ++index;
      curriculumTopicTrainingProgram.trainingProgramCurriculumSectionId = object.trainingProgramCurriculumSectionId;
      curriculumTopicTrainingPrograms.push(curriculumTopicTrainingProgram);
    });
    this.curriculumTopicTrainingProgramService.updateSerialNumbers(curriculumTopicTrainingPrograms).subscribe(() => {
      console.log('Successful!');
    });
  }


  crateCurriculumTopicTemplate(): void {

  }



  curriculumTopicAddForm(): void {
    this.modalRef = this.modalService.show(CurriculumTopicEditComponent, this.modalOption(this.emptyEl()));
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      const curriculumTopicTrainingProgram = new CurriculumTopicTrainingProgram(
        0,
        false,
        0,
        this.done.length + 1,
        this.trainingProgramCurriculumSection.id,
        newElement.second,
        newElement.last);
      this.crateCurriculumTopicTrainingProgram(curriculumTopicTrainingProgram);
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
      classHours: curriculumTopicTrainingProgram.classHours,
      curriculumTopicTrainingProgramId: curriculumTopicTrainingProgram.id,
      serialNumber: curriculumTopicTrainingProgram.serialNumber,
      annotation: curriculumTopicTrainingProgram.annotation,
      trainingProgramCurriculumSectionId: curriculumTopicTrainingProgram.trainingProgramCurriculumSectionId
    };
  }
}
