import { Component, OnInit } from '@angular/core';
import {TrainingProgram} from '../models/TrainingProgram';
import {TrainingProgramService} from '../services/training-program.service';
import {ActivatedRoute} from '@angular/router';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {RegulationService} from '../services/regulation.service';
import {TrainingProgramRegulationService} from '../services/training-program-regulation.service';
import {Regulation} from '../models/Regulation';
import {TrainingProgramRegulation} from '../models/TrainingProgramRegulation';
import {CurriculumTopicRegulation} from '../models/СurriculumTopicRegulation';
import {CurriculumTopicRegulationService} from '../services/curriculum-topic-regulation.service';
import {CurriculumTopicTrainingProgram} from '../models/СurriculumTopicTrainingProgram';
import {CurriculumTopicTrainingProgramService} from '../services/curriculum-topic-training-program.service';
import {MainLiterature} from '../models/MainLiterature';

@Component({
  selector: 'app-training-program-add-form5',
  templateUrl: './training-program-add-form5.component.html',
  styleUrls: ['./training-program-add-form5.component.scss'],
  providers: [
    TrainingProgramService,
    RegulationService,
    TrainingProgramRegulationService,
    CurriculumTopicTrainingProgramService,
    CurriculumTopicRegulationService
  ]
})
export class TrainingProgramAddForm5Component implements OnInit {

  todo = [];
  done = [];
  id: number;
  trainingProgram: TrainingProgram;
  curriculumTopicTrainingPrograms: CurriculumTopicTrainingProgram[];
  curriculumTopicTrainingProgram: CurriculumTopicTrainingProgram;
  regulation: Regulation = new Regulation();
  curriculumTopicRegulation: CurriculumTopicRegulation = new CurriculumTopicRegulation();

  constructor(
    private trainingProgramService: TrainingProgramService,
    private regulationService: RegulationService,
    private trainingProgramRegulationService: TrainingProgramRegulationService,
    private curriculumTopicRegulationService: CurriculumTopicRegulationService,
    private curriculumTopicTrainingProgramService: CurriculumTopicTrainingProgramService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.loadTrainingProgramRegulation();
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
    this.curriculumTopicTrainingProgramService.getValue(this.id).subscribe((data: CurriculumTopicTrainingProgram[]) => {
      if (data !== undefined && data !== null) {
        this.curriculumTopicTrainingPrograms = data;
        this.loadRegulation();
      }
    });
  }

  // tslint:disable-next-line:typedef
  loadRegulation() {
    // tslint:disable-next-line:prefer-const
    const curriculumTopicIdArray: number[] = [this.curriculumTopicTrainingPrograms.length];
    console.log(curriculumTopicIdArray);
    this.curriculumTopicTrainingPrograms.forEach(i => {
      curriculumTopicIdArray.push(i.curriculumTopicId);
    });
    this.regulationService.getRegulation(curriculumTopicIdArray)
      .subscribe((data: Regulation[]) => {
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
  loadTrainingProgramRegulation() {
    this.trainingProgramRegulationService.getValue(this.id)
      .subscribe((data: TrainingProgramRegulation[]) => {
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
              seventh: tmp.regulationId,
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
      let trainingProgramRegulation: TrainingProgramRegulation = new TrainingProgramRegulation();
      i = index + 1;
      if (object.fourth !== undefined){
        trainingProgramRegulation.id = +object.fourth;
        trainingProgramRegulation.trainingProgramId = +object.fifth;
        trainingProgramRegulation.regulationId = +object.seventh;
      }
      else {
        trainingProgramRegulation.regulationId = +object.first;
        trainingProgramRegulation.trainingProgramId = +this.id;
      }
      trainingProgramRegulation.serialNumber = +i;

      if (trainingProgramRegulation.id === undefined){
        this.trainingProgramRegulationService.createValue(trainingProgramRegulation)
          .subscribe((data: TrainingProgramRegulation) => {
            object.seventh = data.id;
            console.log('Save was successful');
            trainingProgramRegulation = null;
          });
      }
      else {
        this.update(trainingProgramRegulation);
        trainingProgramRegulation = null;
      }
    });
  }

  // UPDATE

  // tslint:disable-next-line:typedef
  update(tmp: TrainingProgramRegulation){
    this.trainingProgramRegulationService.updateValue(tmp)
      .subscribe((data: TrainingProgramRegulation) => {
        console.log('Update was successful ' + data.serialNumber);
      });
  }

  // tslint:disable-next-line:typedef
  cancel() {
    this.regulation = new Regulation();
  }

  // tslint:disable-next-line:typedef
  addRegulation() {
    this.crateRegulation();
  }

  // tslint:disable-next-line:typedef
  crateRegulation(){
    this.regulationService.createValue(this.regulation)
      .subscribe((data: Regulation) => {
        if (data !== undefined){
          this.regulation = data;
          console.log('Success');
          this.done.push({
            first: this.regulation.id,
            third: this.regulation.content
          });
          this.curriculumTopicRegulation.regulationId = this.regulation.id;
          this.curriculumTopicRegulation.curriculumTopicId = this.curriculumTopicTrainingProgram.curriculumTopicId;
          this.crateCurriculumTopicRegulation();
        }
      });
  }

  // tslint:disable-next-line:typedef
  crateCurriculumTopicRegulation(){
    this.curriculumTopicRegulationService.createValue(this.curriculumTopicRegulation)
      .subscribe((data: CurriculumTopicRegulation) => {
        if (data !== undefined){
          this.curriculumTopicRegulation = data;
          console.log('Success');
        }
        this.cancel();
      });
  }

  // tslint:disable-next-line:typedef
  deleteTrainingProgramRegulation(data: any, indx: number){
    this.done.splice(indx, 1);
    if (data !== 'undefined'){
      this.trainingProgramRegulationService.deleteValue(+data).subscribe(() => {
        console.log('Delete was successful ' + data);
      });
    }
  }
}
