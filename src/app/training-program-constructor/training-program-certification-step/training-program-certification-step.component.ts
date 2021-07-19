import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {ActivatedRoute} from '@angular/router';
import {TrainingProgram} from '../../models/TrainingProgram';
import {FinalExaminationService} from '../../services/final-examination.service';
import {FinalExamination} from '../../models/FinalExamination';
import {TrainingProgramFinalExaminationService} from '../../services/training-program-final-examination.service';
import {TrainingProgramFinalExamination} from '../../models/TrainingProgramFinalExamination';
import {CertificationTypeService} from '../../services/certification-type.service';
import {CertificationType} from '../../models/CertificationType';
import {Globals} from '../../globals';
import {MDBModalRef, MDBModalService} from 'angular-bootstrap-md';
import {MainLiteratureEditComponent} from '../../main-literature/main-literature-edit.component';
import {TrainingProgramAdditionalLiterature} from '../../models/TrainingProgramAdditionalLiterature';
import {TrainingProgramConstructorService} from '../training-program-constructor.service';

@Component({
  selector: 'app-training-program-certification-step',
  templateUrl: './training-program-certification-step.component.html',
  styleUrls: ['./training-program-certification-step.component.scss'],
  providers: [
    FinalExaminationService,
    TrainingProgramFinalExaminationService,
    CertificationTypeService
  ]
})
export class TrainingProgramCertificationStepComponent implements OnInit {
  id: number;
  todo = [];
  done = [];
  trainingProgram: TrainingProgram;
  finalExamination: FinalExamination = new FinalExamination();
  certificationType: CertificationType = new CertificationType();
  modalRef: MDBModalRef;

  constructor(
    public globals: Globals,
    public  trainingProgramConstructorService: TrainingProgramConstructorService,
    private finalExaminationService: FinalExaminationService,
    private trainingProgramFinalExaminationService: TrainingProgramFinalExaminationService,
    private certificationTypeService: CertificationTypeService,
    private route: ActivatedRoute,
    private modalService: MDBModalService,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.loadTrainingProgram();
    this.loadCertificationType();
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
        this.loadTrainingProgramFinalExamination();
      });
  }

  loadTrainingProgramFinalExamination(): void {
    this.trainingProgramFinalExaminationService.getValuesFromTrainingProgram(this.id)
      .subscribe((trainingProgramFinalExaminations: TrainingProgramFinalExamination[]) => {
        if (trainingProgramFinalExaminations.length !== 0){
          trainingProgramFinalExaminations.sort((a, b) => a.serialNumber - b.serialNumber);
          trainingProgramFinalExaminations.forEach((obj) => {
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

  loadCertificationType(): void {
    this.certificationTypeService.getValue(this.trainingProgram.certificationTypeId)
      .subscribe((certificationType: CertificationType) => {
        if (certificationType){
          this.certificationType = certificationType;
          this.loadFinalExamination();
        }
      });
  }

  loadFinalExamination(): void {
    this.finalExaminationService.getValue(this.certificationType.id).subscribe((finalExaminations: FinalExamination[]) => {
      if (finalExaminations.length !== 0) {
        finalExaminations.sort((a, b) => b.id - a.id);
        finalExaminations.forEach((finalExamination) => {
          this.todo.push({
            finalExaminationId: finalExamination.id,
            content: finalExamination.content
          });
        });
      }
    });
  }

  crateTrainingProgramFinalExamination(trainingProgramFinalExamination: TrainingProgramFinalExamination): void {
    this.trainingProgramFinalExaminationService.createValue(trainingProgramFinalExamination)
      .subscribe((trainingProgramFinalExaminationResponse: TrainingProgramFinalExamination) => {
        this.done.push(this.newDoneElement(trainingProgramFinalExaminationResponse));
        console.log('Crate was successful!');
      });
  }

  updateTrainingProgramFinalExamination(item: any): void {
    const trainingProgramFinalExamination = new TrainingProgramFinalExamination(
      item.id,
      item.trainingProgramId,
      item.content,
      item.serialNumber
    );
    this.trainingProgramFinalExaminationService.updateValue(trainingProgramFinalExamination)
      .subscribe(() => {
        console.log('Update was successful!');
      });
  }

  deleteTrainingProgramFinalExamination(id: number, index: number): void {
    this.trainingProgramFinalExaminationService.deleteValue(id).subscribe(() => {
      this.done.splice(index, 1);
      console.log('Delete was successful!');
    });
  }

  save(): void {
    const trainingProgramFinalExaminations: TrainingProgramFinalExamination[] = [];
    this.done.forEach((object, index) => {
      const trainingProgramFinalExamination: TrainingProgramFinalExamination = new TrainingProgramFinalExamination();
      trainingProgramFinalExamination.id = +object.id;
      trainingProgramFinalExamination.trainingProgramId = +object.trainingProgramId;
      trainingProgramFinalExamination.content = object.content;
      trainingProgramFinalExamination.serialNumber = ++index;
      trainingProgramFinalExaminations.push(trainingProgramFinalExamination);
    });
    this.trainingProgramFinalExaminationService.updateSerialNumbers(trainingProgramFinalExaminations).subscribe(() => {
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
      this.crateTrainingProgramFinalExamination(trainingProgramAdditionalLiterature);
    });
  }

  trainingProgramMainLiteratureEditForm(item: any): void {
    const el = this.emptyEl();
    el.last = item.content;
    this.modalRef = this.modalService.show(MainLiteratureEditComponent, this.modalOption(el));
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      item.content = newElement.last;
      this.updateTrainingProgramFinalExamination(item);
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

  newDoneElement(model: TrainingProgramFinalExamination): any {
    return {
      id: model.id,
      trainingProgramId: model.trainingProgramId,
      content: model.content,
      serialNumber: model.serialNumber
    };
  }
}
