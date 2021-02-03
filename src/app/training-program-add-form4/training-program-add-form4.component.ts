import { Component, OnInit } from '@angular/core';
import {TrainingProgram} from '../models/TrainingProgram';
import {TrainingProgramService} from '../services/training-program.service';
import {ActivatedRoute} from '@angular/router';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {AdditionalLiterature} from '../models/AdditionalLiterature';
import {AdditionalLiteratureService} from '../services/additional-literature.service';
import {TrainingProgramAdditionalLiteratureService} from '../services/training-program-additional-literature.service';
import {TrainingProgramAdditionalLiterature} from '../models/TrainingProgramAdditionalLiterature';
import {CurriculumTopicAdditionalLiteratureService} from '../services/curriculum-topic-additional-literature.service';
import {CurriculumTopicAdditionalLiterature} from '../models/СurriculumTopicAdditionalLiterature';
import {CurriculumTopicTrainingProgram} from '../models/СurriculumTopicTrainingProgram';
import {CurriculumTopicTrainingProgramService} from '../services/curriculum-topic-training-program.service';

@Component({
  selector: 'app-training-program-add-form4',
  templateUrl: './training-program-add-form4.component.html',
  styleUrls: ['./training-program-add-form4.component.scss'],
  providers: [
    TrainingProgramService,
    AdditionalLiteratureService,
    TrainingProgramAdditionalLiteratureService,
    CurriculumTopicAdditionalLiteratureService,
    CurriculumTopicTrainingProgramService
  ]
})
export class TrainingProgramAddForm4Component implements OnInit {

  todo = [];
  done = [];
  id: number;
  trainingProgram: TrainingProgram;
  curriculumTopicTrainingPrograms: CurriculumTopicTrainingProgram[];
  curriculumTopicTrainingProgram: CurriculumTopicTrainingProgram;
  additionalLiterature: AdditionalLiterature = new AdditionalLiterature();
  curriculumTopicAdditionalLiterature: CurriculumTopicAdditionalLiterature = new CurriculumTopicAdditionalLiterature();

  constructor(
    private trainingProgramService: TrainingProgramService,
    private additionalLiteratureService: AdditionalLiteratureService,
    private trainingProgramAdditionalLiteratureService: TrainingProgramAdditionalLiteratureService,
    private curriculumTopicAdditionalLiteratureService: CurriculumTopicAdditionalLiteratureService,
    private curriculumTopicTrainingProgramService: CurriculumTopicTrainingProgramService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.loadTrainingProgramAdditionalLiterature();

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
    this.curriculumTopicTrainingProgramService.getValue(this.id).subscribe((data: CurriculumTopicTrainingProgram[]) => {
      if (data !== undefined && data !== null){
        this.curriculumTopicTrainingPrograms = data;
        this.loadAdditionalLiterature();
      }
    });
  }

  // tslint:disable-next-line:typedef
  loadAdditionalLiterature() {
    // tslint:disable-next-line:prefer-const
    let curriculumTopicIdArray: number[] = [this.curriculumTopicTrainingPrograms.length];
    console.log(curriculumTopicIdArray);
    this.curriculumTopicTrainingPrograms.forEach(i => {
      curriculumTopicIdArray.push(i.curriculumTopicId);
    });
    this.additionalLiteratureService.getAdditionalLiterature(curriculumTopicIdArray)
      .subscribe((data: AdditionalLiterature[]) => {
        if (data !== undefined && data !== null){
          data.forEach((tmp) => {
            this.todo.push({
              first: tmp.id,
              third: tmp.content
            });
          });
        }
      });
  }

  // tslint:disable-next-line:typedef
  loadTrainingProgramAdditionalLiterature() {
    this.trainingProgramAdditionalLiteratureService.getValue(this.id)
      .subscribe((data: TrainingProgramAdditionalLiterature[]) => {
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
              seventh: tmp.additionalLiteratureId,
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
      let trainingProgramAdditionalLiterature: TrainingProgramAdditionalLiterature = new TrainingProgramAdditionalLiterature();
      i = index + 1;
      if (object.fourth !== undefined){
        trainingProgramAdditionalLiterature.id = +object.fourth;
        trainingProgramAdditionalLiterature.trainingProgramId = +object.fifth;
        trainingProgramAdditionalLiterature.additionalLiteratureId = +object.seventh;
      }
      else {
        trainingProgramAdditionalLiterature.additionalLiteratureId = +object.first;
        trainingProgramAdditionalLiterature.trainingProgramId = +this.id;
      }
      trainingProgramAdditionalLiterature.serialNumber = +i;

      if (trainingProgramAdditionalLiterature.id === undefined){
        this.trainingProgramAdditionalLiteratureService.createValue(trainingProgramAdditionalLiterature)
          .subscribe((data: TrainingProgramAdditionalLiterature) => {
            object.seventh = data.id;
            console.log('Save was successful');
            trainingProgramAdditionalLiterature = null;
          });
      }
      else {
        this.update(trainingProgramAdditionalLiterature);
        trainingProgramAdditionalLiterature = null;
      }
    });
  }

  // UPDATE

  // tslint:disable-next-line:typedef
  update(tmp: TrainingProgramAdditionalLiterature){
    this.trainingProgramAdditionalLiteratureService.updateValue(tmp)
      .subscribe((data: TrainingProgramAdditionalLiterature) => {
        console.log('Update was successful ' + data.serialNumber);
      });
  }

  // tslint:disable-next-line:typedef
  cancel() {
    this.additionalLiterature = new AdditionalLiterature();
  }

  // tslint:disable-next-line:typedef
  addAdditionalLiterature() {
    this.crateAdditionalLiterature();
  }

  // tslint:disable-next-line:typedef
  crateAdditionalLiterature(){
    this.additionalLiteratureService.createValue(this.additionalLiterature)
      .subscribe((data: AdditionalLiterature) => {
        if (data !== undefined){
          this.additionalLiterature = data;
          console.log('Success');
          this.done.push({
            first: this.additionalLiterature.id,
            third: this.additionalLiterature.content
          });
          this.curriculumTopicAdditionalLiterature.additionalLiteratureId = this.additionalLiterature.id;
          this.curriculumTopicAdditionalLiterature.curriculumTopicId = this.curriculumTopicTrainingProgram.curriculumTopicId;
          this.crateCurriculumTopicAdditionalLiterature();
        }
      });
  }

  // tslint:disable-next-line:typedef
  crateCurriculumTopicAdditionalLiterature(){
    this.curriculumTopicAdditionalLiteratureService.createValue(this.curriculumTopicAdditionalLiterature)
      .subscribe((data: CurriculumTopicAdditionalLiterature) => {
        if (data !== undefined){
          this.curriculumTopicAdditionalLiterature = data;
          console.log('Success');
        }
        this.cancel();
      });
  }

  // tslint:disable-next-line:typedef
  deleteTrainingProgramAdditionalLiterature(data: any, indx: number){
    this.done.splice(indx, 1);
    if (data !== 'undefined'){
      this.trainingProgramAdditionalLiteratureService.deleteValue(+data).subscribe(() => {
        console.log('Delete was successful ' + data);
      });
    }
  }
}
