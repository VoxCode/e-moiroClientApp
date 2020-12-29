import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {ActivatedRoute} from '@angular/router';
import {TrainingProgram} from '../models/TrainingProgram';
import {TrainingProgramService} from '../services/training-program.service';
import {CurriculumTopicService} from '../services/curriculum-topic.service';
import {CurriculumTopic} from '../models/CurriculumTopic';
import {FinalExaminationService} from '../services/final-examination.service';
import {FinalExamination} from '../models/FinalExamination';

@Component({
  selector: 'app-training-program-add-form2',
  templateUrl: './training-program-add-form2.component.html',
  styleUrls: ['./training-program-add-form2.component.scss'],
  providers: [
    TrainingProgramService,
    FinalExaminationService,
    CurriculumTopicService
  ]
})
export class TrainingProgramAddForm2Component implements OnInit {
  todo = [];
  done = [];
  id: number;
  trainingProgram: TrainingProgram;
  curriculumTopics: CurriculumTopic[];
  finalExaminations: FinalExamination[];
  finalExaminationList: FinalExamination[] = [];

  constructor(
    private trainingProgramService: TrainingProgramService,
    private finalExaminationService: FinalExaminationService,
    private curriculumTopicService: CurriculumTopicService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
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
        this.finalExaminations = data;
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

}
