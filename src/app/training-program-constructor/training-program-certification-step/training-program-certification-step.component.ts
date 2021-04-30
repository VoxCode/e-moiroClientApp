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
  todo = [];
  done = [];
  id: number;
  trainingProgram: TrainingProgram;
  curriculumTopicTrainingPrograms: CurriculumTopicTrainingProgram[];
  curriculumTopicTrainingProgram: CurriculumTopicTrainingProgram;
  finalExamination: FinalExamination = new FinalExamination();
  certificationType: CertificationType = new CertificationType();

  constructor(
    public globals: Globals,
    private trainingProgramService: TrainingProgramService,
    private finalExaminationService: FinalExaminationService,
    private trainingProgramFinalExaminationService: TrainingProgramFinalExaminationService,
    private curriculumTopicTrainingProgramService: CurriculumTopicTrainingProgramService,
    private certificationTypeService: CertificationTypeService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.loadTrainingProgramFinalExamination();
  }

  // tslint:disable-next-line:typedef
  drop(event: CdkDragDrop<string[]>) {
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

  // tslint:disable-next-line:typedef
  noReturnPredicate() {
    return false;
  }

  // LOAD

  // tslint:disable-next-line:typedef
  loadTrainingProgram() {
    this.trainingProgramService.getValue(this.id)
      .subscribe((data: TrainingProgram) => {
        if (data !== undefined){
          this.trainingProgram = data;
          this.loadCertificationType();
        }
      });
  }

  // tslint:disable-next-line:typedef
  loadCertificationType() {
    this.certificationTypeService.getValue(this.trainingProgram.certificationTypeId)
      .subscribe((data: CertificationType) => {
        if (data !== undefined){
          this.certificationType = data;
          this.loadCurriculumTopicTrainingProgram();
        }
      });
  }

  // tslint:disable-next-line:typedef
  loadCurriculumTopicTrainingProgram() {
    this.curriculumTopicTrainingProgramService.getValue(this.id).subscribe((data: CurriculumTopicTrainingProgram[]) => {
      if (data !== undefined && data !== null){
        this.curriculumTopicTrainingPrograms = data;
        this.loadFinalExamination();
      }
    });
  }

  // tslint:disable-next-line:typedef
  loadFinalExamination() {
    // tslint:disable-next-line:prefer-const
    let curriculumTopicIdArray: number[] = [this.curriculumTopicTrainingPrograms.length];
    this.curriculumTopicTrainingPrograms.forEach(i => {
      curriculumTopicIdArray.push(i.curriculumTopicId);
    });
    this.finalExaminationService.getFinalExamination(this.trainingProgram.certificationTypeId, curriculumTopicIdArray)
      .subscribe((data: FinalExamination[]) => {
        if (data !== undefined && data !== null){
          // tslint:disable-next-line:only-arrow-functions typedef
          data.sort(function(a, b) {
            return b.id - a.id;
          });
          data.forEach((tmp) => {
            const tmp2 = this.done.find(a => a.seventh === tmp.id);
            if (tmp2 === undefined){
              this.todo.push({
                first: tmp.id,
                third: tmp.content
              });
            }
          });
        }
      });
  }

  // tslint:disable-next-line:typedef
  loadTrainingProgramFinalExamination() {
    this.trainingProgramFinalExaminationService.getValue(this.id)
      .subscribe((data: TrainingProgramFinalExamination[]) => {
        this.loadTrainingProgram();
        if (data !== undefined && data !== null){
          // tslint:disable-next-line:only-arrow-functions typedef
          data.sort(function(a, b) {
            return a.serialNumber - b.serialNumber;
          });
          data.forEach((tmp) => {
            this.done.push({
              fourth: tmp.id,
              fifth: tmp.trainingProgramId,
              third: tmp.content,
              seventh: tmp.finalExaminationId,
              eight: tmp.serialNumber
            });
          });
        }
      });
  }

  // SAVE FULL

  // tslint:disable-next-line:typedef
  save() {
    let i = 0;
    this.done.forEach((object, index) => {
      let trainingProgramFinalExamination: TrainingProgramFinalExamination = new TrainingProgramFinalExamination();
      i = index + 1;
      if (object.fourth !== undefined){
        trainingProgramFinalExamination.id = +object.fourth;
        trainingProgramFinalExamination.trainingProgramId = +object.fifth;
        trainingProgramFinalExamination.finalExaminationId = +object.seventh;
      }
      else {
        trainingProgramFinalExamination.finalExaminationId = +object.first;
        trainingProgramFinalExamination.trainingProgramId = +this.id;
      }
      trainingProgramFinalExamination.serialNumber = +i;

      if (trainingProgramFinalExamination.id === undefined){
        this.trainingProgramFinalExaminationService.createValue(trainingProgramFinalExamination)
          .subscribe((data: TrainingProgramFinalExamination) => {
            object.fourth = data.id;
            console.log('Save was successful');
            trainingProgramFinalExamination = null;
          });
      }
      else {
        this.update(trainingProgramFinalExamination);
        trainingProgramFinalExamination = null;
      }
    });
  }

  // UPDATE

  // tslint:disable-next-line:typedef
  update(tmp: TrainingProgramFinalExamination){
    this.trainingProgramFinalExaminationService.updateValue(tmp)
      .subscribe((data: TrainingProgramFinalExamination) => {
        console.log('Update was successful ' + data.serialNumber);
      });
  }

  // tslint:disable-next-line:typedef
  cancel() {
    // this.finalExamination = new FinalExamination();
    // this.curriculumTopicFinalExamination = new CurriculumTopicFinalExamination();
    // this.curriculumTopicTrainingProgram = new CurriculumTopicTrainingProgram();
  }

  // tslint:disable-next-line:typedef
  addFinalExamination() {
    this.crateFinalExamination();
  }

  // tslint:disable-next-line:typedef
  crateFinalExamination(){
    // this.finalExamination.certificationTypeId = this.trainingProgram.certificationTypeId;
    // this.finalExaminationService.createValue(this.finalExamination)
    //   .subscribe((data: FinalExamination) => {
    //     if (data !== undefined){
    //       this.finalExamination = data;
    //       console.log('Success');
    //       this.done.push({
    //         first: this.finalExamination.id,
    //         third: this.finalExamination.content
    //       });
    //       this.curriculumTopicFinalExamination.finalExaminationId = this.finalExamination.id;
    //       this.curriculumTopicFinalExamination.curriculumTopicId = this.curriculumTopicTrainingProgram.curriculumTopicId;
    //       this.crateCurriculumTopicFinalExamination();
    //     }
    //   });
  }

  // tslint:disable-next-line:typedef
  crateCurriculumTopicFinalExamination(){
    // this.curriculumTopicFinalExaminationService.createValue(this.curriculumTopicFinalExamination)
    //   .subscribe((data: CurriculumTopicFinalExamination) => {
    //     if (data !== undefined){
    //       this.curriculumTopicFinalExamination = data;
    //       console.log('Success');
    //       this.save();
    //     }
    //     this.cancel();
    //   });
  }

  // tslint:disable-next-line:typedef
  deleteTrainingProgramFinalExamination(id: number, indx: number){
    this.done.splice(indx, 1);
    if (id !== undefined){
      this.trainingProgramFinalExaminationService.deleteValue(id).subscribe(() => {
        console.log('Delete was successful ' + id);
      });
    }
  }
}
