import { Component, OnInit } from '@angular/core';
import {TrainingProgram} from '../models/TrainingProgram';
import {CurriculumTopic} from '../models/CurriculumTopic';
import {TrainingProgramService} from '../services/training-program.service';
import {CurriculumTopicService} from '../services/curriculum-topic.service';
import {ActivatedRoute} from '@angular/router';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {MainLiteratureService} from '../services/main-literature.service';
import {TrainingProgramMainLiterature} from '../models/TrainingProgramMainLiterature';
import {TrainingProgramMainLiteratureService} from '../services/training-program-main-literature.service';
import {MainLiterature} from '../models/MainLiterature';

@Component({
  selector: 'app-training-program-add-form3',
  templateUrl: './training-program-add-form3.component.html',
  styleUrls: ['./training-program-add-form3.component.scss'],
  providers: [
    TrainingProgramService,
    MainLiteratureService,
    TrainingProgramMainLiteratureService,
    CurriculumTopicService
  ]
})
export class TrainingProgramAddForm3Component implements OnInit {

  todo = [];
  done = [];
  id: number;
  trainingProgram: TrainingProgram;
  curriculumTopics: CurriculumTopic[];

  constructor(
    private trainingProgramService: TrainingProgramService,
    private mainLiteratureService: MainLiteratureService,
    private trainingProgramMainLiteratureService: TrainingProgramMainLiteratureService,
    private curriculumTopicService: CurriculumTopicService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.loadTrainingProgramMainLiterature();
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
          this.loadMainLiterature(tmp.id);
        });
      }
    });
  }

  // tslint:disable-next-line:typedef
  loadMainLiterature(curriculumTopicId: number) {
    const key = 1;
    this.mainLiteratureService.getMainLiterature(curriculumTopicId, +key)
      .subscribe((data: MainLiterature[]) => {
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
  loadTrainingProgramMainLiterature() {
    this.trainingProgramMainLiteratureService.getValue(this.id)
      .subscribe((data: TrainingProgramMainLiterature[]) => {
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
            object.seventh = data.id;
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

}
