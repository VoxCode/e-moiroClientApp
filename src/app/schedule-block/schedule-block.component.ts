import { Component, OnInit } from '@angular/core';
import {ScheduleBlockCurriculumTopicTrainingProgramService} from '../services/schedule-services/schedule-block-curriculum-topic-training-program.service';
import {MDBModalRef} from 'angular-bootstrap-md';
import {ScheduleBlockCurriculumTopicTrainingProgram} from '../models/schedule-models/ScheduleBlockCurriculumTopicTrainingProgram';
import {CurriculumTopicTrainingProgramService} from '../services/curriculum-topic-training-program.service';
import {TrainingProgramCurriculumSection} from '../models/TrainingProgramCurriculumSection';
import {TrainingProgramCurriculumSectionService} from '../services/training-program-curriculum-section.service';
import {CurriculumTopicTrainingProgram} from '../models/СurriculumTopicTrainingProgram';
import {ScheduleBlockTeacher} from '../models/schedule-models/ScheduleBlockTeacher';
import {ScheduleBlockTeacherService} from '../services/schedule-services/schedule-block-teacher.service';

@Component({
  selector: 'app-schedule-block',
  templateUrl: './schedule-block.component.html',
  styleUrls: ['./schedule-block.component.scss'],
  providers: [
    ScheduleBlockCurriculumTopicTrainingProgramService,
    CurriculumTopicTrainingProgramService,
    TrainingProgramCurriculumSectionService,
    ScheduleBlockTeacherService
  ]
})
export class ScheduleBlockComponent implements OnInit {

  public scheduleBlock: {id: number, trainingProgramId: number};
  public selectedTopic: CurriculumTopicTrainingProgram;

  curriculumTopicTrainingPrograms: CurriculumTopicTrainingProgram[] = [];

  constructor(
    private scheduleBlockCurriculumTopicTrainingProgramService: ScheduleBlockCurriculumTopicTrainingProgramService,
    private curriculumTopicTrainingProgramService: CurriculumTopicTrainingProgramService,
    private trainingProgramCurriculumSectionService: TrainingProgramCurriculumSectionService,

  ) { }

  ngOnInit(): void {
    this.scheduleBlock = {
      id: 0,
      trainingProgramId: 16};
    //this.loadScheduleBlockCurriculumTopics();
    this.loadCurriculumTopicTrainingPrograms();
  }

  loadScheduleBlockCurriculumTopics(): void {
  this.scheduleBlockCurriculumTopicTrainingProgramService.getValuesFromCurriculumTopicTrainingProgramm(this.scheduleBlock.id)
    .subscribe((data: ScheduleBlockCurriculumTopicTrainingProgram[]) => {
      if (data.length > 0) {

      }
    });
  }

  loadCurriculumTopicTrainingPrograms(): void{
    this.trainingProgramCurriculumSectionService.GetFromTrainingProgram(this.scheduleBlock.trainingProgramId)
      .subscribe((data: TrainingProgramCurriculumSection[]) => {
        if (data.length > 0){
          data.forEach((obj) => {
            this.curriculumTopicTrainingProgramService.getFromTrainingProgramCurriculumSection(obj.id)
              .subscribe((topicsData: CurriculumTopicTrainingProgram[]) =>{
                if (topicsData.length > 0) {
                  this.curriculumTopicTrainingPrograms = topicsData;
                }
              });
          });
        }
      });

  }

  selectTopic(): void {

  }
}

