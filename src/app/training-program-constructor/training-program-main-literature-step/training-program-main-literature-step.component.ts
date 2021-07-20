import { Component, OnInit } from '@angular/core';
import {TrainingProgram} from '../../models/TrainingProgram';
import {ActivatedRoute} from '@angular/router';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {MainLiteratureService} from '../../services/main-literature.service';
import {TrainingProgramMainLiterature} from '../../models/TrainingProgramMainLiterature';
import {TrainingProgramMainLiteratureService} from '../../services/training-program-main-literature.service';
import {MainLiterature} from '../../models/MainLiterature';
import {Globals} from '../../globals';
import {TrainingProgramAdditionalLiterature} from '../../models/TrainingProgramAdditionalLiterature';
import {MDBModalRef, MDBModalService} from 'angular-bootstrap-md';
import {MainLiteratureEditComponent} from '../../main-literature/main-literature-edit.component';
import {TrainingProgramConstructorService} from '../training-program-constructor.service';

@Component({
  selector: 'app-training-program-main-literature-step',
  templateUrl: './training-program-main-literature-step.component.html',
  styleUrls: ['./training-program-main-literature-step.component.scss'],
  providers: [
    MainLiteratureService,
    TrainingProgramMainLiteratureService
  ]
})
export class TrainingProgramMainLiteratureStepComponent implements OnInit {
  id: number;
  todo: any[] = [];
  done: any[] = [];
  trainingProgram: TrainingProgram;
  mainLiterature: MainLiterature = new MainLiterature();
  modalRef: MDBModalRef;

  constructor(
    public globals: Globals,
    public  trainingProgramConstructorService: TrainingProgramConstructorService,
    private mainLiteratureService: MainLiteratureService,
    private trainingProgramMainLiteratureService: TrainingProgramMainLiteratureService,
    private route: ActivatedRoute,
    private modalService: MDBModalService,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.loadTrainingProgram();
    this.loadMainLiterature();
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
        this.loadTrainingProgramMainLiterature();
      });
  }

  loadTrainingProgramMainLiterature(): void {
    this.trainingProgramMainLiteratureService.getValuesFromTrainingProgram(this.id)
      .subscribe((trainingProgramMainLiteratures: TrainingProgramMainLiterature[]) => {
        if (trainingProgramMainLiteratures.length !== 0) {
          trainingProgramMainLiteratures
            .sort((a, b) => a.serialNumber - b.serialNumber);
          trainingProgramMainLiteratures.forEach((obj) => {
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

  loadMainLiterature(): void {
    this.mainLiteratureService.getValues().subscribe((mainLiteratures: MainLiterature[]) => {
      if (mainLiteratures.length !== 0) {
        mainLiteratures.sort((a, b) => b.id - a.id);
        mainLiteratures.forEach((mainLiterature) => {
          this.todo.push({
            mainLiteratureId: mainLiterature.id,
            content: mainLiterature.content
          });
        });
      }
    });
  }

  crateMainLiteratureTemplate(content: string): void {
    const mainLiterature = new MainLiterature();
    mainLiterature.content = content;
    mainLiterature.authorIndex = this.globals.userId;
    this.mainLiteratureService.createValue(mainLiterature)
      .subscribe((mainLiteratureTemplateResponse: MainLiterature) => {
        console.log('Save was successful!');
        this.todo.push({
          additionalLiteratureId: mainLiteratureTemplateResponse.id,
          content: mainLiteratureTemplateResponse.content
        });
      });
  }

  crateTrainingProgramMainLiterature(trainingProgramMainLiterature: TrainingProgramMainLiterature): void {
    this.trainingProgramMainLiteratureService.createValue(trainingProgramMainLiterature)
      .subscribe((trainingProgramMainLiteratureResponse: TrainingProgramMainLiterature) => {
        this.done.push(this.newDoneElement(trainingProgramMainLiteratureResponse));
        console.log('Crate was successful!');
      });
  }

  updateTrainingProgramMainLiterature(item: any): void {
    const trainingProgramMainLiterature = new TrainingProgramMainLiterature(
      item.id,
      item.trainingProgramId,
      item.content,
      item.serialNumber
    );
    this.trainingProgramMainLiteratureService.updateValue(trainingProgramMainLiterature)
      .subscribe(() => {
        console.log('Update was successful!');
      });
  }

  deleteTrainingProgramMainLiterature(id: number, index: number): void {
    this.trainingProgramMainLiteratureService.deleteValue(id).subscribe(() => {
      this.done.splice(index, 1);
      console.log('Delete was successful ' + id);
    });
  }

  save(): void {
    const trainingProgramMainLiteratures: TrainingProgramMainLiterature[] = [];
    this.done.forEach((object, index) => {
      if (object.mainLiteratureId) {
        const trainingProgramMainLiterature = new TrainingProgramMainLiterature(
          0,
          this.id,
          object.content,
          ++index
        );
        this.trainingProgramMainLiteratureService.createValue(trainingProgramMainLiterature)
          .subscribe((trainingProgramMainLiteratureResponse: TrainingProgramMainLiterature) => {
            object.serialNumber = trainingProgramMainLiteratureResponse.serialNumber;
            object.id = trainingProgramMainLiteratureResponse.id;
            object.trainingProgramId = trainingProgramMainLiteratureResponse.trainingProgramId;
            object.content = trainingProgramMainLiteratureResponse.content;
            object.mainLiteratureId = undefined;
          });
      }
      else {
        const trainingProgramMainLiterature: TrainingProgramMainLiterature = new TrainingProgramMainLiterature();
        trainingProgramMainLiterature.id = +object.id;
        trainingProgramMainLiterature.trainingProgramId = +object.trainingProgramId;
        trainingProgramMainLiterature.content = object.content;
        trainingProgramMainLiterature.serialNumber = ++index;
        trainingProgramMainLiteratures.push(trainingProgramMainLiterature);
      }
    });
    this.trainingProgramMainLiteratureService.updateSerialNumbers(trainingProgramMainLiteratures).subscribe(() => {
      console.log('Successful!');
    });
  }

  trainingProgramMainLiteratureCrateForm(): void {
    this.modalRef = this.modalService.show(MainLiteratureEditComponent, this.modalOption(this.emptyEl()));
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      const trainingProgramAdditionalLiterature = new TrainingProgramAdditionalLiterature(
        0,
        this.id,
        newElement.last,
        this.done.length + 1
      );
      this.crateTrainingProgramMainLiterature(trainingProgramAdditionalLiterature);
      if (newElement.third) {
        this.crateMainLiteratureTemplate(newElement.last);
      }
    });
  }

  trainingProgramMainLiteratureEditForm(item: any): void {
    const el = this.emptyEl();
    el.last = item.content;
    this.modalRef = this.modalService.show(MainLiteratureEditComponent, this.modalOption(el));
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      item.content = newElement.last;
      this.updateTrainingProgramMainLiterature(item);
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

  newDoneElement(model: TrainingProgramMainLiterature): any {
    return {
      id: model.id,
      trainingProgramId: model.trainingProgramId,
      content: model.content,
      serialNumber: model.serialNumber
    };
  }
}
