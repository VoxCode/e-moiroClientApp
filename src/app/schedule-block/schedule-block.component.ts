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
import {Group} from '../models/Group';
import {GroupService} from '../services/group.service';
import {ClassRoom} from '../models/schedule-models/ClassRoom';
import {ScheduleBlock} from '../models/schedule-models/ScheduleBlock';
import {ScheduleBlockService} from '../services/schedule-services/schedule-block.service';
import {ScheduleBlockClassTime} from '../models/schedule-models/ScheduleBlockClassTime';
import {ScheduleBlockClassRoom} from '../models/schedule-models/ScheduleBlockClassRoom';
import {ScheduleBlockClassRoomService} from '../services/schedule-services/schedule-block-class-room.service';
import {ScheduleBlockClassTimeService} from '../services/schedule-services/schedule-block-class-time.service';
import {ScheduleElement} from "../schedule/schedule-element";
import {ClassTime} from "../models/schedule-models/СlassTime";

@Component({
  selector: 'app-schedule-block',
  templateUrl: './schedule-block.component.html',
  styleUrls: ['./schedule-block.component.scss'],
  providers: [
    ScheduleBlockService,
    ScheduleBlockCurriculumTopicTrainingProgramService,
    CurriculumTopicTrainingProgramService,
    TrainingProgramCurriculumSectionService,
    ScheduleBlockTeacherService,
    TrainingProgramTeacherService,
    TeacherService,
    GroupService,
    ScheduleBlockClassRoomService,
    ScheduleBlockClassTimeService,
  ]
})
export class ScheduleBlockComponent implements OnInit {


  public selectedGroup: Group;
  public selectedTopic: CurriculumTopicTrainingProgram;
  public selectedTeacher: Teacher;

  @Input() scheduleElement: ScheduleElement;

  teachers: Teacher[] = [];
  curriculumTopicTrainingPrograms: CurriculumTopicTrainingProgram[] = [];
  groups: Group[] = [];

  tempClassTime: ScheduleBlockClassTime;

  constructor(
    private scheduleBlockCurriculumTopicTrainingProgramService: ScheduleBlockCurriculumTopicTrainingProgramService,
    private curriculumTopicTrainingProgramService: CurriculumTopicTrainingProgramService,
    private trainingProgramCurriculumSectionService: TrainingProgramCurriculumSectionService,
    private scheduleBlockTeacherService: ScheduleBlockTeacherService,
    private trainingProgramTeacherService: TrainingProgramTeacherService,
    private teacherService: TeacherService,
    private groupService: GroupService,
    private scheduleBlockService: ScheduleBlockService,
    private scheduleBlockClassRoomService: ScheduleBlockClassRoomService,
    private scheduleBlockClassTimeService: ScheduleBlockClassTimeService,


  ) { }

  ngOnInit(): void {
    console.log(this.scheduleElement);
    //  this.loadScheduleBlockCurriculumTopics();
    this.loadCurriculumTopicTrainingPrograms();
    this.loadTrainingProgramTeachers();
    this.loadGroups();
  }

  createBlock(el: any): void{
    const block = new ScheduleBlock(0, 1, 0);
    this.scheduleBlockService.createValue(block)
      .subscribe((blockResponse: ScheduleBlock) => {
        this.createBlockTopic(blockResponse.id, this.selectedTopic.id);
        this.createBlockClassRoom(blockResponse.id, this.scheduleElement.roomId);
        this.loadScheduleBlockClassTime(this.scheduleElement.startTime, this.scheduleElement.endTime);
        this.createBlockClassTime(blockResponse.id, this.tempClassTime.id);
        this.createBlockTeacher(blockResponse.id, this.selectedTeacher.id);
    });
  }
  createBlockClassTime(blockId: number, timeID: number): void{
    const blockClassTime  = new ScheduleBlockClassTime();
    this.scheduleBlockClassTimeService.createValue(blockClassTime)
      .subscribe((response: ScheduleBlockClassRoom) => {
        // nothing
      });
  }
  createBlockClassRoom(blockId: number, roomID: number): void{
    const blockClassRoom = new ScheduleBlockClassRoom();
    this.scheduleBlockClassRoomService.createValue(blockClassRoom)
      .subscribe((response: ScheduleBlockClassRoom) => {
        // nothing
      });
  }
  createBlockTeacher(blockId: number, teacherId: number): void{
    const blockTeacher = new ScheduleBlockTeacher(0, teacherId, blockId, 0 );
    this.scheduleBlockTeacherService.createValue(blockTeacher)
      .subscribe((response: ScheduleBlockTeacher) => {
       // nothing
    });
  }

  createBlockTopic(blockId: number, topicId: number): void{
    const blockTopic = new ScheduleBlockCurriculumTopicTrainingProgram(0, topicId, blockId, 0);
    this.scheduleBlockCurriculumTopicTrainingProgramService.createValue(blockTopic)
      .subscribe((response: ScheduleBlockCurriculumTopicTrainingProgram) => {
        // nothing
      });
  }

  loadScheduleBlockClassTime(startTime: Date, endTime: Date): void{
    this.scheduleBlockClassTimeService.getValue(1)
      .subscribe((data: ScheduleBlockClassTime) => {
        if (data){
          this.tempClassTime = data;
        }
      });
  }


  loadScheduleBlockCurriculumTopics(): void {
  this.scheduleBlockCurriculumTopicTrainingProgramService.getValuesFromScheduleBlock(this.scheduleElement.id)
    .subscribe((data: ScheduleBlockCurriculumTopicTrainingProgram[]) => {
      if (data.length > 0) {
        console.log(data);
      }
    });
  }

  loadGroups(): void{
    this.groupService.getValues()
      .subscribe((data: Group[]) => {
        if (data.length > 0){
          this.groups = data;
        }
      });
  }

  loadCurriculumTopicTrainingPrograms(): void{
    this.trainingProgramCurriculumSectionService.getFromTrainingProgram(this.scheduleElement.trainingProgramId)
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
    console.log(this.selectedTopic);
    console.log(this.selectedTeacher);
    console.log(this.selectedGroup);
  }

}

