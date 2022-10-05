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
import {IsDeleteComponent} from '../../is-delete/is-delete.component';

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
  heading = 'Рекомендуемая дополнительная литература';

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
              accessDate: obj.accessDate,
              accessDateEnabled: obj.accessDateEnabled,
              serialNumber: obj.serialNumber
            });
          });
        }
        this.loadAdditionalLiterature();
      });
  }

  loadAdditionalLiterature(): void {
    this.additionalLiteratureService.getValues().subscribe((additionalLiteratures: AdditionalLiterature[]) => {
      if (additionalLiteratures.length !== 0) {
        additionalLiteratures.sort((a, b) => b.id - a.id);
        additionalLiteratures.forEach((additionalLiterature) => {
          if (!this.done.find(e => e.content === additionalLiterature.content)) {
            this.todo.push({
              additionalLiteratureId: additionalLiterature.id,
              content: additionalLiterature.content,
              accessDate: additionalLiterature.accessDate,
              accessDateEnabled: additionalLiterature.accessDateEnabled,
            });
          }
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
          content: additionalLiteratureTemplateResponse.content,
          accessDate: additionalLiteratureTemplateResponse.accessDate,
          accessDateEnabled: additionalLiteratureTemplateResponse.accessDateEnabled,
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
      item.accessDate,
      item.accessDateEnabled,
      item.serialNumber
    );
    this.trainingProgramAdditionalLiteratureService.updateValue(trainingProgramAdditionalLiterature)
      .subscribe(() => {
        console.log('Update was successful!');
      });
  }

  deleteTrainingProgramAdditionalLiterature(item: any, index: number): void {
    const editableRow = {heading: item.content};
    this.modalRef = this.modalService.show(IsDeleteComponent, this.modalOption(editableRow));
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      if (newElement) {
        this.trainingProgramAdditionalLiteratureService.deleteValue(item.id).subscribe(() => {
          this.done.splice(index, 1);
          this.todo.push({
            additionalLiteratureId: item.id,
            content: item.content,
            accessDate: item.accessDate,
            accessDateEnabled: item.accessDateEnabled,
          });
          console.log('Delete was successful!');
        });
      }
    });
  }

  save(): void {
    const trainingProgramAdditionalLiteratures: TrainingProgramAdditionalLiterature[] = [];
    this.done.forEach((object, index) => {
      if (object.additionalLiteratureId) {
        const trainingProgramAdditionalLiterature = new TrainingProgramAdditionalLiterature(
          0,
          this.id,
          object.content,
          object.accessDate,
          object.accessDateEnabled,
          ++index
        );
        this.trainingProgramAdditionalLiteratureService.createValue(trainingProgramAdditionalLiterature)
          .subscribe((trainingProgramAdditionalLiteratureResponse: TrainingProgramAdditionalLiterature) => {
            object.serialNumber = trainingProgramAdditionalLiteratureResponse.serialNumber;
            object.id = trainingProgramAdditionalLiteratureResponse.id;
            object.trainingProgramId = trainingProgramAdditionalLiteratureResponse.trainingProgramId;
            object.content = trainingProgramAdditionalLiteratureResponse.content;
            object.accessDate = trainingProgramAdditionalLiteratureResponse.accessDate;
            object.accessDateEnabled = trainingProgramAdditionalLiteratureResponse.accessDateEnabled;
            object.additionalLiteratureId = undefined;
          });
      }
      else {
        const trainingProgramAdditionalLiterature = new TrainingProgramAdditionalLiterature();
        trainingProgramAdditionalLiterature.id = +object.id;
        trainingProgramAdditionalLiterature.trainingProgramId = +object.trainingProgramId;
        trainingProgramAdditionalLiterature.content = object.content;
        trainingProgramAdditionalLiterature.serialNumber = ++index;
        trainingProgramAdditionalLiterature.accessDate = object.accessDate;
        trainingProgramAdditionalLiterature.accessDateEnabled = object.accessDateEnabled;
        trainingProgramAdditionalLiteratures.push(trainingProgramAdditionalLiterature);
      }
      this.trainingProgramAdditionalLiteratureService.updateSerialNumbers(trainingProgramAdditionalLiteratures)
        .subscribe(() => {
          console.log('Successful!');
        });
    });
  }

  trainingProgramAdditionalLiteratureCrateForm(): void {
    this.modalRef = this.modalService.show(AdditionalLiteratureEditComponent, this.modalOption(this.emptyEl()));
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      const trainingProgramAdditionalLiterature = new TrainingProgramAdditionalLiterature(
        0,
        this.id,
        newElement.last,
        newElement.accessDate,
        newElement.accessDateEnabled,
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
    el.accessDate = item.accessDate;
    el.accessDateEnabled = item.accessDateEnabled;
    el.isCrate = false;
    this.modalRef = this.modalService.show(AdditionalLiteratureEditComponent, this.modalOption(el));
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      item.content = newElement.last;
      item.accessDate = newElement.accessDate;
      item.accessDateEnabled = newElement.accessDateEnabled;
      this.updateTrainingProgramAdditionalLiterature(item);
    });
  }

  emptyEl(): any {
    return {id: 0, first: '', last: '', accessDate: '', accessDateEnabled: false, isCrate: true};
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
      accessDate: model.accessDate,
      accessDateEnabled: model.accessDateEnabled,
      serialNumber: model.serialNumber
    };
  }
}
