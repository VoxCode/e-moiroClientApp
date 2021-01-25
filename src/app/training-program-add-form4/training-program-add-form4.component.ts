import { Component, OnInit } from '@angular/core';
import {TrainingProgram} from '../models/TrainingProgram';
import {CurriculumTopic} from '../models/CurriculumTopic';
import {TrainingProgramService} from '../services/training-program.service';
import {CurriculumTopicService} from '../services/curriculum-topic.service';
import {ActivatedRoute} from '@angular/router';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {AdditionalLiterature} from '../models/AdditionalLiterature';
import {AdditionalLiteratureService} from '../services/additional-literature.service';
import {TrainingProgramAdditionalLiteratureService} from '../services/training-program-additional-literature.service';
import {TrainingProgramAdditionalLiterature} from '../models/TrainingProgramAdditionalLiterature';

@Component({
  selector: 'app-training-program-add-form4',
  templateUrl: './training-program-add-form4.component.html',
  styleUrls: ['./training-program-add-form4.component.scss'],
  providers: [
    TrainingProgramService,
    AdditionalLiteratureService,
    TrainingProgramAdditionalLiteratureService,
    CurriculumTopicService
  ]
})
export class TrainingProgramAddForm4Component implements OnInit {

  todo = [];
  done = [];
  id: number;
  trainingProgram: TrainingProgram;
  curriculumTopics: CurriculumTopic[];

  constructor(
    private trainingProgramService: TrainingProgramService,
    private additionalLiteratureService: AdditionalLiteratureService,
    private trainingProgramAdditionalLiteratureService: TrainingProgramAdditionalLiteratureService,
    private curriculumTopicService: CurriculumTopicService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.loadTrainingProgramAdditionalLiterature();
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
          this.loadAdditionalLiterature(tmp.id);
        });
      }
    });
  }

  // tslint:disable-next-line:typedef
  loadAdditionalLiterature(curriculumTopicId: number) {
    const key = 1;
    this.additionalLiteratureService.getAdditionalLiterature(curriculumTopicId, key)
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

}
