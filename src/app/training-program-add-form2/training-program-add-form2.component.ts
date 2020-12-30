import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {ActivatedRoute} from '@angular/router';
import {TrainingProgram} from '../models/TrainingProgram';
import {TrainingProgramService} from '../services/training-program.service';
import {CurriculumTopicService} from '../services/curriculum-topic.service';
import {CurriculumTopic} from '../models/CurriculumTopic';
import {FinalExaminationService} from '../services/final-examination.service';
import {FinalExamination} from '../models/FinalExamination';
import {TrainingProgramFinalExaminationService} from '../services/training-program-final-examination.service';
import {TrainingProgramFinalExamination} from '../models/TrainingProgramFinalExamination';

@Component({
  selector: 'app-training-program-add-form2',
  templateUrl: './training-program-add-form2.component.html',
  styleUrls: ['./training-program-add-form2.component.scss'],
  providers: [
    TrainingProgramService,
    FinalExaminationService,
    TrainingProgramFinalExaminationService,
    CurriculumTopicService
  ]
})
export class TrainingProgramAddForm2Component implements OnInit {
  todo = [];
  done = [];
  id: number;
  trainingProgram: TrainingProgram;
  curriculumTopics: CurriculumTopic[];

  constructor(
    private trainingProgramService: TrainingProgramService,
    private finalExaminationService: FinalExaminationService,
    private trainingProgramFinalExaminationService: TrainingProgramFinalExaminationService,
    private curriculumTopicService: CurriculumTopicService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.loadTrainingProgramFinalExamination();
    this.loadTrainingProgram();
  }

  // tslint:disable-next-line:typedef
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  // LOAD

  // tslint:disable-next-line:typedef
  loadTrainingProgram() {
    this.trainingProgramService.getValue(this.id)
      .subscribe((data: TrainingProgram) => {
        if (data !== undefined){
          this.trainingProgram = data;
          this.loadCurriculumTopicTrainingProgram();
        }
      });
  }

  // tslint:disable-next-line:typedef
  loadCurriculumTopicTrainingProgram() {
    this.curriculumTopicService.getCurriculumTopics(this.id).subscribe((data: CurriculumTopic[]) => {
      if (data !== undefined && data !== null){
        this.curriculumTopics = data;
        this.curriculumTopics.forEach((tmp) => {
          this.loadFinalExamination(tmp.id);
        });
      }
    });
  }

  // tslint:disable-next-line:typedef
  loadFinalExamination(curriculumTopicId: number) {
    this.finalExaminationService.getFinalExaminations(curriculumTopicId, this.trainingProgram.certificationTypeId)
      .subscribe((data: FinalExamination[]) => {
        if (data !== undefined && data !== null){
          data.forEach((tmp) => {
            this.todo.push({
              first: tmp.id,
              second: tmp.certificationTypeId,
              third: tmp.content
            });
          });
        }
      });
  }

  // tslint:disable-next-line:typedef
  loadTrainingProgramFinalExamination() {
    this.trainingProgramFinalExaminationService.getValue(this.id)
      .subscribe((data: TrainingProgramFinalExamination[]) => {
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
            object.seventh = data.id;
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
}
