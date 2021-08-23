import {Component, Input, OnInit} from '@angular/core';
import {ScheduleBlockCurriculumTopicTrainingProgramService} from '../services/schedule-services/schedule-block-curriculum-topic-training-program.service';
import {MDBModalRef} from 'angular-bootstrap-md';
import {ScheduleBlockCurriculumTopicTrainingProgram} from '../models/schedule-models/ScheduleBlockCurriculumTopicTrainingProgram';
import {CurriculumTopicTrainingProgramService} from '../services/curriculum-topic-training-program.service';
import {TrainingProgramCurriculumSection} from '../models/TrainingProgramCurriculumSection';
import {TrainingProgramCurriculumSectionService} from '../services/training-program-curriculum-section.service';
import {CurriculumTopicTrainingProgram} from '../models/СurriculumTopicTrainingProgram';
import {ScheduleBlockTeacher} from '../models/schedule-models/ScheduleBlockTeacher';
import {ScheduleBlockTeacherService} from '../services/schedule-services/schedule-block-teacher.service';
import {TrainingProgramTeacherService} from '../services/training-program-teacher.service';
import {TrainingProgramTeacher} from '../models/TrainingProgramTeacher';
import {TeacherService} from '../services/teacher.service';
import {Teacher} from '../models/Teacher';

@Component({
  selector: 'app-schedule-block',
  templateUrl: './schedule-block.component.html',
  styleUrls: ['./schedule-block.component.scss'],
  providers: [
    ScheduleBlockCurriculumTopicTrainingProgramService,
    CurriculumTopicTrainingProgramService,
    TrainingProgramCurriculumSectionService,
    ScheduleBlockTeacherService,
    TrainingProgramTeacherService,
    TeacherService,
  ]
})
export class ScheduleBlockComponent implements OnInit {


  public selectedTopic: CurriculumTopicTrainingProgram;
  public selectedTeacher: Teacher;

  @Input() scheduleBlock: {id: number, trainingProgramId: number};

  teachers: Teacher[] = [];
  curriculumTopicTrainingPrograms: CurriculumTopicTrainingProgram[] = [];

  constructor(
    private scheduleBlockCurriculumTopicTrainingProgramService: ScheduleBlockCurriculumTopicTrainingProgramService,
    private curriculumTopicTrainingProgramService: CurriculumTopicTrainingProgramService,
    private trainingProgramCurriculumSectionService: TrainingProgramCurriculumSectionService,
    private scheduleBlockTeacherService: ScheduleBlockTeacherService,
    private trainingProgramTeacherService: TrainingProgramTeacherService,
    private teacherService: TeacherService,

  ) { }

  ngOnInit(): void {
    console.log(this.scheduleBlock);
    this.scheduleBlock = {
      id: 0,
      trainingProgramId: 16};
    //  this.loadScheduleBlockCurriculumTopics();
    this.loadCurriculumTopicTrainingPrograms();
    this.loadTrainingProgramTeachers();
  }

  loadScheduleBlockCurriculumTopics(): void {
  this.scheduleBlockCurriculumTopicTrainingProgramService.getValuesFromCurriculumTopicTrainingProgramm(this.scheduleBlock.id)
    .subscribe((data: ScheduleBlockCurriculumTopicTrainingProgram[]) => {
      if (data.length > 0) {
        console.log(data);
      }
    });
  }

  loadCurriculumTopicTrainingPrograms(): void{
    this.trainingProgramCurriculumSectionService.getFromTrainingProgram(this.scheduleBlock.trainingProgramId)
      .subscribe((data: TrainingProgramCurriculumSection[]) => {
        if (data.length > 0){
          data.forEach((obj) => {
            this.curriculumTopicTrainingProgramService.getFromTrainingProgramCurriculumSection(obj.id)
              .subscribe((topicsData: CurriculumTopicTrainingProgram[]) => {
                if (topicsData.length > 0) {
                  this.curriculumTopicTrainingPrograms = topicsData;
                }
              });
          });
        }
      });
  }

  loadTrainingProgramTeachers(): void {
    this.teacherService.getValues()
      .subscribe((teachersData: Teacher[]) => {
        if (teachersData.length > 0) {
          teachersData.forEach((teacher: Teacher) => {
            teacher.fullNameForm = teacher.lastName + ' ' + teacher.firstName + ' ' +
              teacher.patronymicName + ' (' + teacher.position + ')';
            this.teachers.push(teacher);
          });
        }
      });
  }

  selectTopic(): void {

  }
}

