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
import {RegulationDragAndDrop} from '../../models/drag-and-drop-models/RegulationDragAndDrop';

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

  todo: any = [];
  done: any = [];
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

  loadTrainingProgramRegulation(): void {
    this.trainingProgramRegulationService.getValue(this.id)
      .subscribe((trainingProgramRegulations: TrainingProgramRegulation[]) => {
        this.loadTrainingProgram();
        if (trainingProgramRegulations.length !== 0){
          trainingProgramRegulations.sort((a, b) => a.serialNumber - b.serialNumber);
          trainingProgramRegulations.forEach((trainingProgramRegulation ) => {
            this.done.push({
              trainingProgramRegulationId: trainingProgramRegulation.id,
              trainingProgramId: trainingProgramRegulation.trainingProgramId,
              trainingProgramRegulationContent: trainingProgramRegulation.content,
              trainingProgramRegulationSerialNumber: trainingProgramRegulation.serialNumber
            });
          });
        }
      });
  }

  loadCurriculumTopicTemplates(): void {
    this.curriculumTopicService.getFromTrainingProgram(this.id).subscribe((curriculumTopics: CurriculumTopic[]) => {
      this.loadRegulationTemplates(curriculumTopics);
    });
  }

  loadRegulationTemplates(curriculumTopics: CurriculumTopic[]): void {
    const curriculumTopicIdArray: number[] = [curriculumTopics.length];
    curriculumTopics.forEach(curriculumTopic => {
      curriculumTopicIdArray.push(curriculumTopic.id);
    });
    this.regulationService.getByCurriculumTopics(curriculumTopicIdArray)
      .subscribe((regulations: Regulation[]) => {
        if (regulations.length !== 0) {
          regulations.sort((a, b) => b.id - a.id);
          regulations.forEach((regulation) => {
            const regulationFound = this.done.find(a => a.regulationId === regulation.id);
            if (!regulationFound) {
              this.todo.push({
                first: regulation.id,
                second: regulation.content
              });
            }
          });
        }
      });
  }

  save(): void {
    // let i = 0;
    // this.done.forEach((regulationDragAndDrop, index) => {
    //   let trainingProgramRegulation: TrainingProgramRegulation = new TrainingProgramRegulation();
    //   i = index + 1;
    //   if (regulationDragAndDrop.fourth){
    //     trainingProgramRegulation.id = +regulationDragAndDrop.fourth;
    //     trainingProgramRegulation.trainingProgramId = +regulationDragAndDrop.fifth;
    //     trainingProgramRegulation.regulationId = +regulationDragAndDrop.seventh;
    //   }
    //   else {
    //     trainingProgramRegulation.regulationId = +regulationDragAndDrop.first;
    //     trainingProgramRegulation.trainingProgramId = +this.id;
    //   }
    //   trainingProgramRegulation.serialNumber = +i;
    //
    //   if (!trainingProgramRegulation.id) {
    //     this.trainingProgramRegulationService.createValue(trainingProgramRegulation)
    //       .subscribe((data: TrainingProgramRegulation) => {
    //         object.fourth = data.id;
    //         object.fifth = data.trainingProgramId;
    //         object.seventh = data.regulationId;
    //         object.eight = data.serialNumber;
    //         console.log('Save was successful');
    //         trainingProgramRegulation = null;
    //       });
    //   }
    //   else {
    //     this.update(trainingProgramRegulation);
    //     trainingProgramRegulation = null;
    //   }
    // });
  }

  update(tmp: TrainingProgramRegulation): void {
    this.trainingProgramRegulationService.updateValue(tmp)
      .subscribe((data: TrainingProgramRegulation) => {
        console.log('Update was successful ' + data.serialNumber);
      });
  }

  addTrainingProgramRegulation(): void {
    this.crateRegulation();
  }

  crateRegulation(): void {
    // this.regulationService.createValue(this.regulation)
    //   .subscribe((data: Regulation) => {
    //     if (data !== undefined){
    //       this.regulation = data;
    //       console.log('Success');
    //       this.done.push({
    //         first: this.regulation.id,
    //         third: this.regulation.content
    //       });
    //       this.curriculumTopicRegulation.regulationId = this.regulation.id;
    //       this.curriculumTopicRegulation.curriculumTopicId = this.curriculumTopicTrainingProgram.curriculumTopicId;
    //       this.crateCurriculumTopicRegulation();
    //     }
    //   });
  }

  deleteTrainingProgramRegulation(id: number, index: number): void {
    this.done.splice(index, 1);
    if (id){
      this.trainingProgramRegulationService.deleteValue(id).subscribe(() => {
        console.log('Delete was successful ' + id);
      });
    }
  }
}
