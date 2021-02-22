import { Component, OnInit } from '@angular/core';
import {TrainingProgram} from '../models/TrainingProgram';
import {TrainingProgramService} from '../services/training-program.service';
import {ActivatedRoute} from '@angular/router';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {MainLiteratureService} from '../services/main-literature.service';
import {TrainingProgramMainLiterature} from '../models/TrainingProgramMainLiterature';
import {TrainingProgramMainLiteratureService} from '../services/training-program-main-literature.service';
import {MainLiterature} from '../models/MainLiterature';
import {CurriculumTopicMainLiterature} from '../models/СurriculumTopicMainLiterature';
import {CurriculumTopicMainLiteratureService} from '../services/curriculum-topic-main-literature.service';
import {CurriculumTopicTrainingProgramService} from '../services/curriculum-topic-training-program.service';
import {CurriculumTopicTrainingProgram} from '../models/СurriculumTopicTrainingProgram';
import {newArray} from '@angular/compiler/src/util';

@Component({
  selector: 'app-training-program-add-form3',
  templateUrl: './training-program-add-form3.component.html',
  styleUrls: ['./training-program-add-form3.component.scss'],
  providers: [
    TrainingProgramService,
    MainLiteratureService,
    TrainingProgramMainLiteratureService,
    CurriculumTopicMainLiteratureService,
    CurriculumTopicTrainingProgramService
  ]
})
export class TrainingProgramAddForm3Component implements OnInit {

  todo = [];
  done = [];
  id: number;
  trainingProgram: TrainingProgram;
  curriculumTopicTrainingPrograms: CurriculumTopicTrainingProgram[];
  curriculumTopicTrainingProgram: CurriculumTopicTrainingProgram;
  mainLiterature: MainLiterature = new MainLiterature();
  curriculumTopicMainLiterature: CurriculumTopicMainLiterature = new CurriculumTopicMainLiterature();

  constructor(
    private trainingProgramService: TrainingProgramService,
    private mainLiteratureService: MainLiteratureService,
    private trainingProgramMainLiteratureService: TrainingProgramMainLiteratureService,
    private curriculumTopicMainLiteratureService: CurriculumTopicMainLiteratureService,
    private curriculumTopicTrainingProgramService: CurriculumTopicTrainingProgramService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.loadTrainingProgramMainLiterature();

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
          this.loadCurriculumTopicTrainingProgram();
        }
      });
  }

  // tslint:disable-next-line:typedef
  loadCurriculumTopicTrainingProgram() {
    this.curriculumTopicTrainingProgramService.getValue(this.id).subscribe((data: CurriculumTopicTrainingProgram[]) => {
      if (data !== undefined && data !== null){
        this.curriculumTopicTrainingPrograms = data;
        this.loadMainLiterature();
      }
    });
  }

  // tslint:disable-next-line:typedef
  loadMainLiterature() {
    // tslint:disable-next-line:prefer-const
    let curriculumTopicIdArray: number[] = [this.curriculumTopicTrainingPrograms.length];
    this.curriculumTopicTrainingPrograms.forEach(i => {
      curriculumTopicIdArray.push(i.curriculumTopicId);
    });
    this.mainLiteratureService.getMainLiterature(curriculumTopicIdArray)
      .subscribe((data: MainLiterature[]) => {
        if (data !== undefined && data !== null){
          // tslint:disable-next-line:only-arrow-functions typedef
          data.sort(function(a, b) {
            return b.id - a.id;
          });
          data.forEach((tmp) => {
            const tmp2 = this.done.find(a => a.seventh === tmp.id);
            if (tmp2 === undefined) {
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
  loadTrainingProgramMainLiterature() {
    this.trainingProgramMainLiteratureService.getValue(this.id)
      .subscribe((data: TrainingProgramMainLiterature[]) => {
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
              seventh: tmp.mainLiteratureId,
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
      let trainingProgramMainLiterature: TrainingProgramMainLiterature = new TrainingProgramMainLiterature();
      i = index + 1;
      if (object.fourth !== undefined){
        trainingProgramMainLiterature.id = +object.fourth;
        trainingProgramMainLiterature.trainingProgramId = +object.fifth;
        trainingProgramMainLiterature.mainLiteratureId = +object.seventh;
      }
      else {
        trainingProgramMainLiterature.mainLiteratureId = +object.first;
        trainingProgramMainLiterature.trainingProgramId = +this.id;
      }
      trainingProgramMainLiterature.serialNumber = +i;

      if (trainingProgramMainLiterature.id === undefined){
        this.trainingProgramMainLiteratureService.createValue(trainingProgramMainLiterature)
          .subscribe((data: TrainingProgramMainLiterature) => {
            object.fourth = data.id;
            console.log('Save was successful');
            trainingProgramMainLiterature = null;
          });
      }
      else {
        this.update(trainingProgramMainLiterature);
        trainingProgramMainLiterature = null;
      }
    });
  }

  // UPDATE

  // tslint:disable-next-line:typedef
  update(tmp: TrainingProgramMainLiterature){
    this.trainingProgramMainLiteratureService.updateValue(tmp)
      .subscribe((data: TrainingProgramMainLiterature) => {
        console.log('Update was successful ' + data.serialNumber);
      });
  }

  // tslint:disable-next-line:typedef
  cancel() {
    this.mainLiterature = new MainLiterature();
    this.curriculumTopicTrainingProgram = new CurriculumTopicTrainingProgram();
    this.curriculumTopicMainLiterature = new CurriculumTopicMainLiterature();
  }

  // tslint:disable-next-line:typedef
  addMainLiterature() {
    this.crateMainLiterature();
  }

  // tslint:disable-next-line:typedef
  crateMainLiterature(){
    this.mainLiteratureService.createValue(this.mainLiterature)
      .subscribe((data: MainLiterature) => {
        if (data !== undefined){
          this.mainLiterature = data;
          console.log('Success');
          this.done.push({
            first: this.mainLiterature.id,
            third: this.mainLiterature.content
          });
          this.curriculumTopicMainLiterature.mainLiteratureId = this.mainLiterature.id;
          this.curriculumTopicMainLiterature.curriculumTopicId = this.curriculumTopicTrainingProgram.curriculumTopicId;
          this.crateCurriculumTopicMainLiterature();
        }
      });
  }

  // tslint:disable-next-line:typedef
  crateCurriculumTopicMainLiterature(){
    this.curriculumTopicMainLiteratureService.createValue(this.curriculumTopicMainLiterature)
      .subscribe((data: CurriculumTopicMainLiterature) => {
        if (data !== undefined){
          this.curriculumTopicMainLiterature = data;
          console.log('Success');
          this.save();
        }
        this.cancel();
      });
  }

  // tslint:disable-next-line:typedef
  deleteTrainingProgramMainLiterature(id: number, indx: number){
    this.done.splice(indx, 1);
    if (id !== undefined){
      this.trainingProgramMainLiteratureService.deleteValue(id).subscribe(() => {
        console.log('Delete was successful ' + id);
      });
    }
  }
}
