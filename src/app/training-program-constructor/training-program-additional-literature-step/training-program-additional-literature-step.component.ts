import { Component, OnInit } from '@angular/core';
import {TrainingProgram} from '../../models/TrainingProgram';
import {ActivatedRoute} from '@angular/router';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {AdditionalLiterature} from '../../models/AdditionalLiterature';
import {AdditionalLiteratureService} from '../../services/additional-literature.service';
import {TrainingProgramAdditionalLiteratureService} from '../../services/training-program-additional-literature.service';
import {TrainingProgramAdditionalLiterature} from '../../models/TrainingProgramAdditionalLiterature';
import {Globals} from '../../globals';
import {AdditionalLiteratureEditComponent} from '../../additional-literature/additional-literature-edit.component';
import {MDBModalRef, MDBModalService} from 'angular-bootstrap-md';
import {TrainingProgramConstructorService} from '../training-program-constructor.service';

@Component({
  selector: 'app-training-program-additional-literature-step',
  templateUrl: './training-program-additional-literature-step.component.html',
  styleUrls: ['./training-program-additional-literature-step.component.scss'],
  providers: [
    AdditionalLiteratureService,
    TrainingProgramAdditionalLiteratureService
  ]
})
export class TrainingProgramAdditionalLiteratureStepComponent implements OnInit {
  id: number;
  todo: any[] = [];
  done: any[] = [];
  trainingProgram: TrainingProgram;
  additionalLiterature: AdditionalLiterature = new AdditionalLiterature();
  modalRef: MDBModalRef;

  constructor(
    public globals: Globals,
    public  trainingProgramConstructorService: TrainingProgramConstructorService,
    private additionalLiteratureService: AdditionalLiteratureService,
    private trainingProgramAdditionalLiteratureService: TrainingProgramAdditionalLiteratureService,
    private route: ActivatedRoute,
    private modalService: MDBModalService,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.loadTrainingProgram();
    this.loadAdditionalLiterature();
  }

  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
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

  loadTrainingProgram(): void {
    this.trainingProgramConstructorService.TrainingProgram(this.id)
      .subscribe((trainingProgramResponse: TrainingProgram) => {
        this.trainingProgram = trainingProgramResponse;
        this.loadTrainingProgramAdditionalLiterature();
      });
  }

  loadTrainingProgramAdditionalLiterature(): void {
    this.trainingProgramAdditionalLiteratureService.getValuesFromTrainingProgram(this.id)
      .subscribe((trainingProgramAdditionalLiteratures: TrainingProgramAdditionalLiterature[]) => {
        if (trainingProgramAdditionalLiteratures.length !== 0) {
          trainingProgramAdditionalLiteratures.sort((a, b) => a.serialNumber - b.serialNumber);
          trainingProgramAdditionalLiteratures.forEach((obj) => {
            this.done.push({
              id: obj.id,
              trainingProgramId: obj.trainingProgramId,
              content: obj.content,
              serialNumber: obj.serialNumber
            });
          });
        }
      });
  }

  loadAdditionalLiterature(): void {
    this.additionalLiteratureService.getValues().subscribe((additionalLiteratures: AdditionalLiterature[]) => {
      if (additionalLiteratures.length !== 0) {
        additionalLiteratures.sort((a, b) => b.id - a.id);
        additionalLiteratures.forEach((additionalLiterature) => {
          this.todo.push({
            additionalLiteratureId: additionalLiterature.id,
            content: additionalLiterature.content
          });
        });
      }
    });
  }

  crateAdditionalLiteratureTemplate(content: string): void {
    const additionalLiterature = new AdditionalLiterature();
    additionalLiterature.content = content;
    additionalLiterature.authorIndex = this.globals.userId;
    this.additionalLiteratureService.createValue(additionalLiterature)
      .subscribe((additionalLiteratureTemplateResponse: AdditionalLiterature) => {
        console.log('Save was successful!');
        this.todo.push({
          additionalLiteratureId: additionalLiteratureTemplateResponse.id,
          content: additionalLiteratureTemplateResponse.content
        });
      });
  }

  crateTrainingProgramAdditionalLiterature(trainingProgramAdditionalLiterature: TrainingProgramAdditionalLiterature): void {
    this.trainingProgramAdditionalLiteratureService.createValue(trainingProgramAdditionalLiterature)
      .subscribe((trainingProgramAdditionalLiteratureResponse: TrainingProgramAdditionalLiterature) => {
        this.done.push(this.newDoneElement(trainingProgramAdditionalLiteratureResponse));
        console.log('Crate was successful!');
      });
  }

  updateTrainingProgramAdditionalLiterature(item: any): void {
    const trainingProgramAdditionalLiterature = new TrainingProgramAdditionalLiterature(
      item.id,
      item.trainingProgramId,
      item.content,
      item.serialNumber
    );
    this.trainingProgramAdditionalLiteratureService.updateValue(trainingProgramAdditionalLiterature)
      .subscribe(() => {
        console.log('Update was successful!');
      });
  }

  deleteTrainingProgramAdditionalLiterature(id: number, index: number): void {
    this.trainingProgramAdditionalLiteratureService.deleteValue(id).subscribe(() => {
      this.done.splice(index, 1);
      console.log('Delete was successful!');
    });
  }

  save(): void {
    const trainingProgramAdditionalLiteratures: TrainingProgramAdditionalLiterature[] = [];
    this.done.forEach((object, index) => {
      const trainingProgramAdditionalLiterature: TrainingProgramAdditionalLiterature = new TrainingProgramAdditionalLiterature();
      trainingProgramAdditionalLiterature.id = +object.id;
      trainingProgramAdditionalLiterature.trainingProgramId = +object.trainingProgramId;
      trainingProgramAdditionalLiterature.content = object.content;
      trainingProgramAdditionalLiterature.serialNumber = ++index;
      trainingProgramAdditionalLiteratures.push(trainingProgramAdditionalLiterature);
    });
    this.trainingProgramAdditionalLiteratureService.updateSerialNumbers(trainingProgramAdditionalLiteratures).subscribe(() => {
      console.log('Successful!');
    });
  }

  trainingProgramAdditionalLiteratureCrateForm(): void {
    this.modalRef = this.modalService.show(AdditionalLiteratureEditComponent, this.modalOption(this.emptyEl()));
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      const trainingProgramAdditionalLiterature = new TrainingProgramAdditionalLiterature(
        0,
        this.id,
        newElement.last,
        this.done.length + 1
      );
      this.crateTrainingProgramAdditionalLiterature(trainingProgramAdditionalLiterature);
      if (newElement.third) {
        this.crateAdditionalLiteratureTemplate(newElement.last);
      }
    });
  }

  trainingProgramAdditionalLiteratureEditForm(item: any): void {
    const el = this.emptyEl();
    el.last = item.content;
    this.modalRef = this.modalService.show(AdditionalLiteratureEditComponent, this.modalOption(el));
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      item.content = newElement.last;
      this.updateTrainingProgramAdditionalLiterature(item);
    });
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

  newDoneElement(model: TrainingProgramAdditionalLiterature): any {
    return {
      id: model.id,
      trainingProgramId: model.trainingProgramId,
      content: model.content,
      serialNumber: model.serialNumber
    };
  }
}
