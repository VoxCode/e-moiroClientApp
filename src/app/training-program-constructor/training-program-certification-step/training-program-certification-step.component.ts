import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {ActivatedRoute} from '@angular/router';
import {TrainingProgram} from '../../models/TrainingProgram';
import {TrainingProgramService} from '../../services/training-program.service';
import {FinalExaminationService} from '../../services/final-examination.service';
import {FinalExamination} from '../../models/FinalExamination';
import {TrainingProgramFinalExaminationService} from '../../services/training-program-final-examination.service';
import {TrainingProgramFinalExamination} from '../../models/TrainingProgramFinalExamination';
import {CurriculumTopicTrainingProgram} from '../../models/СurriculumTopicTrainingProgram';
import {CurriculumTopicTrainingProgramService} from '../../services/curriculum-topic-training-program.service';
import {CertificationTypeService} from '../../services/certification-type.service';
import {CertificationType} from '../../models/CertificationType';
import {Globals} from '../../globals';
import {MDBModalRef, MDBModalService} from 'angular-bootstrap-md';
import {MainLiteratureEditComponent} from '../../main-literature/main-literature-edit.component';
import {TrainingProgramAdditionalLiterature} from '../../models/TrainingProgramAdditionalLiterature';
import {TrainingProgramMainLiterature} from '../../models/TrainingProgramMainLiterature';

@Component({
  selector: 'app-training-program-certification-step',
  templateUrl: './training-program-certification-step.component.html',
  styleUrls: ['./training-program-certification-step.component.scss'],
  providers: [
    TrainingProgramService,
    FinalExaminationService,
    TrainingProgramFinalExaminationService,
    CurriculumTopicTrainingProgramService,
    CertificationTypeService
  ]
})
export class TrainingProgramCertificationStepComponent implements OnInit {
  id: number;
  todo = [];
  done = [];
  trainingProgram: TrainingProgram;
  curriculumTopicTrainingPrograms: CurriculumTopicTrainingProgram[];
  curriculumTopicTrainingProgram: CurriculumTopicTrainingProgram;
  finalExamination: FinalExamination = new FinalExamination();
  certificationType: CertificationType = new CertificationType();
  modalRef: MDBModalRef;

  constructor(
    public globals: Globals,
    private trainingProgramService: TrainingProgramService,
    private finalExaminationService: FinalExaminationService,
    private trainingProgramFinalExaminationService: TrainingProgramFinalExaminationService,
    private curriculumTopicTrainingProgramService: CurriculumTopicTrainingProgramService,
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
    this.trainingProgramService.getValue(this.id)
      .subscribe((data: TrainingProgram) => {
        if (data){
          this.trainingProgram = data;
          this.loadTrainingProgramFinalExamination();
        }
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
      .subscribe((data: CertificationType) => {
        if (data !== undefined){
          this.certificationType = data;
          // this.loadCurriculumTopicTrainingProgram();
        }
      });
  }

  loadCurriculumTopicTrainingProgram(): void {
    this.curriculumTopicTrainingProgramService.getValue(this.id).subscribe((data: CurriculumTopicTrainingProgram[]) => {
      if (data !== undefined && data !== null){
        this.curriculumTopicTrainingPrograms = data;
        this.loadFinalExamination();
      }
    });
  }

  loadFinalExamination(): void {
    // // tslint:disable-next-line:prefer-const
    // let curriculumTopicIdArray: number[] = [this.curriculumTopicTrainingPrograms.length];
    // this.curriculumTopicTrainingPrograms.forEach(i => {
    //   curriculumTopicIdArray.push(i.curriculumTopicId);
    // });
    // this.finalExaminationService.getFinalExamination(this.trainingProgram.certificationTypeId, curriculumTopicIdArray)
    //   .subscribe((data: FinalExamination[]) => {
    //     if (data !== undefined && data !== null){
    //       // tslint:disable-next-line:only-arrow-functions typedef
    //       data.sort(function(a, b) {
    //         return b.id - a.id;
    //       });
    //       data.forEach((tmp) => {
    //         const tmp2 = this.done.find(a => a.seventh === tmp.id);
    //         if (tmp2 === undefined){
    //           this.todo.push({
    //             first: tmp.id,
    //             third: tmp.content
    //           });
    //         }
    //       });
    //     }
    //   });
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

  // SAVE FULL
  save(): void {
    // let i = 0;
    // this.done.forEach((object, index) => {
    //   let trainingProgramFinalExamination: TrainingProgramFinalExamination = new TrainingProgramFinalExamination();
    //   i = index + 1;
    //   if (object.fourth !== undefined){
    //     trainingProgramFinalExamination.id = +object.fourth;
    //     trainingProgramFinalExamination.trainingProgramId = +object.fifth;
    //     trainingProgramFinalExamination.finalExaminationId = +object.seventh;
    //   }
    //   else {
    //     trainingProgramFinalExamination.finalExaminationId = +object.first;
    //     trainingProgramFinalExamination.trainingProgramId = +this.id;
    //   }
    //   trainingProgramFinalExamination.serialNumber = +i;
    //
    //   if (trainingProgramFinalExamination.id === undefined){
    //     this.trainingProgramFinalExaminationService.createValue(trainingProgramFinalExamination)
    //       .subscribe((data: TrainingProgramFinalExamination) => {
    //         object.fourth = data.id;
    //         console.log('Save was successful');
    //         trainingProgramFinalExamination = null;
    //       });
    //   }
    //   else {
    //     this.update(trainingProgramFinalExamination);
    //     trainingProgramFinalExamination = null;
    //   }
    // });
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
