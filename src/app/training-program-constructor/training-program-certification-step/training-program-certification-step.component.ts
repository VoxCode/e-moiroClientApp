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
import {TrainingProgramConstructorService} from '../training-program-constructor.service';
import {FinalExaminationEditComponent} from '../../final-examination/final-examination-edit.component';
import {IsDeleteComponent} from '../../is-delete/is-delete.component';

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
        this.loadCertificationType();
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

  crateFinalExaminationTemplate(content: string): void {
    const finalExamination = new FinalExamination();
    finalExamination.content = content;
    finalExamination.certificationTypeId = this.certificationType.id;
    finalExamination.authorIndex = this.globals.userId;
    this.finalExaminationService.createValue(finalExamination)
      .subscribe((finalExaminationTemplateResponse: FinalExamination) => {
        console.log('Save was successful!');
        this.todo.push({
          finalExaminationId: finalExaminationTemplateResponse.id,
          content: finalExaminationTemplateResponse.content
        });
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

  deleteTrainingProgramFinalExamination(item: any, index: number): void {
    const editableRow = {heading: item.content};
    this.modalRef = this.modalService.show(IsDeleteComponent, this.modalOption(editableRow));
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      if (newElement) {
        this.trainingProgramFinalExaminationService.deleteValue(item.id).subscribe(() => {
          this.done.splice(index, 1);
          console.log('Delete was successful!');
        });
      }
    });
  }

  save(): void {
    const trainingProgramFinalExaminations: TrainingProgramFinalExamination[] = [];
    this.done.forEach((object, index) => {
      if (object.finalExaminationId) {
        const trainingProgramFinalExamination = new TrainingProgramFinalExamination(
          0,
          this.id,
          object.content,
          ++index
        );
        this.trainingProgramFinalExaminationService.createValue(trainingProgramFinalExamination)
          .subscribe((trainingProgramFinalExaminationResponse: TrainingProgramFinalExamination) => {
            object.serialNumber = trainingProgramFinalExaminationResponse.serialNumber;
            object.id = trainingProgramFinalExaminationResponse.id;
            object.trainingProgramId = trainingProgramFinalExaminationResponse.trainingProgramId;
            object.content = trainingProgramFinalExaminationResponse.content;
            object.finalExaminationId = undefined;
          });
      }
      else {
        const trainingProgramFinalExamination: TrainingProgramFinalExamination = new TrainingProgramFinalExamination();
        trainingProgramFinalExamination.id = +object.id;
        trainingProgramFinalExamination.trainingProgramId = +object.trainingProgramId;
        trainingProgramFinalExamination.content = object.content;
        trainingProgramFinalExamination.serialNumber = ++index;
        trainingProgramFinalExaminations.push(trainingProgramFinalExamination);
      }
    });
    this.trainingProgramFinalExaminationService.updateSerialNumbers(trainingProgramFinalExaminations).subscribe(() => {
      console.log('Successful!');
    });
  }

  trainingProgramFinalExaminationCrateForm(): void {
    this.modalRef = this.modalService.show(FinalExaminationEditComponent, this.modalOption(this.emptyEl()));
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      const trainingProgramFinalExamination = new TrainingProgramFinalExamination(
        0,
        this.id,
        newElement.last,
        this.done.length + 1
      );
      this.crateTrainingProgramFinalExamination(trainingProgramFinalExamination);
      if (newElement.fourth) {
        this.crateFinalExaminationTemplate(newElement.last);
      }
    });
  }

  trainingProgramFinalExaminationEditForm(item: any): void {
    const el = this.emptyEl();
    el.last = item.content;
    this.modalRef = this.modalService.show(FinalExaminationEditComponent, this.modalOption(el));
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
