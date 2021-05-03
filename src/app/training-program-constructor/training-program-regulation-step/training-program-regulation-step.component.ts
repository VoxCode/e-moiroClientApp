import { Component, OnInit } from '@angular/core';
import {TrainingProgram} from '../../models/TrainingProgram';
import {TrainingProgramService} from '../../services/training-program.service';
import {ActivatedRoute} from '@angular/router';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {RegulationService} from '../../services/regulation.service';
import {TrainingProgramRegulationService} from '../../services/training-program-regulation.service';
import {Regulation} from '../../models/Regulation';
import {TrainingProgramRegulation} from '../../models/TrainingProgramRegulation';
import {Globals} from '../../globals';
import {CurriculumTopicService} from '../../services/curriculum-topic.service';
import {CurriculumTopic} from '../../models/CurriculumTopic';

@Component({
  selector: 'app-training-program-regulation-step',
  templateUrl: './training-program-regulation-step.component.html',
  styleUrls: ['./training-program-regulation-step.component.scss'],
  providers: [
    TrainingProgramService,
    RegulationService,
    TrainingProgramRegulationService,
    CurriculumTopicService
  ]
})
export class TrainingProgramRegulationStepComponent implements OnInit {

  todo = [];
  done = [];
  id: number;
  trainingProgram: TrainingProgram;
  regulation: Regulation = new Regulation();

  constructor(
    public globals: Globals,
    private trainingProgramService: TrainingProgramService,
    private regulationService: RegulationService,
    private trainingProgramRegulationService: TrainingProgramRegulationService,
    private curriculumTopicService: CurriculumTopicService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.loadTrainingProgramRegulation();

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

  noReturnPredicate(): boolean {
    return false;
  }

  loadTrainingProgram(): void {
    this.trainingProgramService.getValue(this.id)
      .subscribe((trainingProgram: TrainingProgram) => {
        if (trainingProgram){
          this.trainingProgram = trainingProgram;
          this.loadCurriculumTopicTemplates();
        }
      });
  }

  loadCurriculumTopicTemplates(): void {
    this.curriculumTopicService.getByTrainingProgram(this.id).subscribe((curriculumTopics: CurriculumTopic[]) => {
      this.loadRegulationTemplates(curriculumTopics);

    });
  }

  loadRegulationTemplates(curriculumTopics: CurriculumTopic[]): void {
    const curriculumTopicIdArray: number[] = [curriculumTopics.length];
    curriculumTopics.forEach(curriculumTopic => {
      curriculumTopicIdArray.push(curriculumTopic.id);
    });
    this.regulationService.getByCurriculumTopics(curriculumTopicIdArray)
      .subscribe((data: Regulation[]) => {
        if (data.length !== 0) {
          data.sort((a, b) => b.id - a.id);
          data.forEach((tmp) => {
            const tmp2 = this.done.find(a => a.seventh === tmp.id);
            if (!tmp2) {
              this.todo.push({
                first: tmp.id,
                third: tmp.content
              });
            }
          });
        }
      });
  }

  loadTrainingProgramRegulation(): void {
    this.trainingProgramRegulationService.getValue(this.id)
      .subscribe((data: TrainingProgramRegulation[]) => {
        this.loadTrainingProgram();
        if (data.length !== 0){
          data.sort((a, b) => a.serialNumber - b.serialNumber);
          data.forEach((tmp) => {
            this.done.push({
              fourth: tmp.id,
              fifth: tmp.trainingProgramId,
              third: tmp.content,
              seventh: tmp.serialNumber
            });
          });
        }
      });
  }

  save(): void {
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
            object.fourth = data.id;
            object.fifth = data.trainingProgramId;
            object.seventh = data.regulationId;
            object.eight = data.serialNumber;
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

  update(tmp: TrainingProgramRegulation): void {
    this.trainingProgramRegulationService.updateValue(tmp)
      .subscribe((data: TrainingProgramRegulation) => {
        console.log('Update was successful ' + data.serialNumber);
      });
  }

  addRegulation(): void {
    this.crateRegulation();
  }

  crateRegulation(): void {
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

  deleteTrainingProgramRegulation(id: number, indx: number): void {
    this.done.splice(indx, 1);
    if (id !== undefined){
      this.trainingProgramRegulationService.deleteValue(id).subscribe(() => {
        console.log('Delete was successful ' + id);
      });
    }
  }
}
