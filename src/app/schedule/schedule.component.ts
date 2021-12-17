import {Component, OnInit} from '@angular/core';
import {AgendaService, DayService, MonthService, WeekService, WorkWeekService} from '@syncfusion/ej2-angular-schedule';
import {ClassRoom} from '../models/schedule-models/ClassRoom';
import {MDBModalRef, MDBModalService} from 'angular-bootstrap-md';
import {Subject} from 'rxjs';
import {RoomComponent} from '../room/room.component';
import {ClassRoomService} from '../services/schedule-services/class-room.service';
import {TrainingProgramService} from '../services/training-program.service';
import {GroupService} from '../services/group.service';
import {Group} from '../models/Group';
import {ScheduleDateService} from '../services/schedule-services/schedule-date.service';
import {ScheduleDate} from '../models/schedule-models/ScheduleDate';
import {ScheduleDateScheduleBlockService} from '../services/schedule-services/schedule-date-schedule-block.service';
import {ScheduleBlockTeacherService} from '../services/schedule-services/schedule-block-teacher.service';
import {ScheduleBlockCurriculumTopicTrainingProgramService} from '../services/schedule-services/schedule-block-curriculum-topic-training-program.service';
import {ScheduleBlockClassTimeService} from '../services/schedule-services/schedule-block-class-time.service';
import {ScheduleBlockClassRoomService} from '../services/schedule-services/schedule-block-class-room.service';
import {ScheduleBlockService} from '../services/schedule-services/schedule-block.service';
import {ScheduleBlock} from '../models/schedule-models/ScheduleBlock';
import {ScheduleBlockTeacher} from '../models/schedule-models/ScheduleBlockTeacher';
import {ScheduleBlockClassTime} from '../models/schedule-models/ScheduleBlockClassTime';
import {ScheduleBlockClassRoom} from '../models/schedule-models/ScheduleBlockClassRoom';
import {ScheduleBlockCurriculumTopicTrainingProgram} from '../models/schedule-models/ScheduleBlockCurriculumTopicTrainingProgram';
import {ScheduleElement} from './schedule-element';
import {ScheduleDateScheduleBlock} from '../models/schedule-models/ScheduleDateScheduleBlock';


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService,
    ClassRoomService, GroupService, TrainingProgramService, ScheduleDateService, ScheduleBlockService,
  ScheduleDateScheduleBlockService, ScheduleBlockTeacherService, ScheduleBlockCurriculumTopicTrainingProgramService,
  ScheduleBlockClassTimeService, ScheduleBlockClassRoomService]
})
export class ScheduleComponent implements OnInit {

  roomData: ClassRoom[] = [];
  scheduleData: ScheduleElement[] = [];
  tempData: ScheduleElement = {};
  groups: Group[];
  public modalRef: MDBModalRef;

  public saveButtonClicked: Subject<any> = new Subject<any>();

  constructor(
    private modalService: MDBModalService,
    private trainingProgramService: TrainingProgramService,
    private classRoomService: ClassRoomService,
    private groupService: GroupService,
    private scheduleDateService: ScheduleDateService,
    private scheduleBlockTeacherService: ScheduleBlockTeacherService,
    private scheduleBlockCurriculumTopicTrainingProgramService: ScheduleBlockCurriculumTopicTrainingProgramService,
    private scheduleDateScheduleBlockService: ScheduleDateScheduleBlockService,
    private scheduleBlockClassTimeService: ScheduleBlockClassTimeService,
    private scheduleBlockClassRoomService: ScheduleBlockClassRoomService,
    private scheduleBlockService: ScheduleBlockService,
  ) { }

  ngOnInit(): void {
    this.loadRooms();
    this.loadGroups();

    this.scheduleData.push({
      id: 1,
        topic: 'topic',
        teacher: 'teacher',
      startTime: new Date(2021, 11, 17, 9, 0),
      endTime: new Date(2021, 11, 17, 12, 0),
      group: 12,
      roomId: 1,
    },
      {
        id: 2,
        topic: 'topic',
        teacher: 'teacher',
        startTime: new Date(2021, 11, 17, 9, 0),
        endTime: new Date(2021, 11, 17, 12, 0),
        group: 12,
        roomId: 1,
      },
      {
        id: 3,
        topic: 'topic',
        teacher: 'teacher',
        startTime: new Date(2021, 11, 17, 9, 0),
        endTime: new Date(2021, 11, 17, 12, 0),
        group: 12,
        roomId: 1,
      },
      {
        id: 4,
        topicId: 1,
        topic: 'topic2',
        teacherId: 1,
        teacher: 'teacher2',
        startTime: new Date(2021, 11, 17, 9, 0),
        endTime: new Date(2021, 11, 17, 11, 0),
        groupId: 1,
        group: 232,
        roomId: 3,
        room: 'room2',
        metaData: 'wabba-labba-dub-dub2',
      });
    // console.log('here');
    // this.loadScheduleDates();
    // setInterval(() => {
    //   console.log(this.scheduleData);}, 1000);
  }



  loadRooms(): void{
    this.classRoomService.getValues()
      .subscribe((data: ClassRoom[]) => {
        if (data.length > 0) {
          this.roomData = data;
        }
      });
  }

  addRoom(): void {
    this.modalRef = this.modalService.show(RoomComponent, this.modalOption(this.roomData));
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      // this.roomData.push({text: newElement.roomName, id: 5, color: '#543434'});
      // this.roomData = this.roomData.map(num => num);
      // this.createRoom(newElement);
      this.loadRooms();
    });
  }

  createRoom(el: any): void{
    const room = new ClassRoom(+el.roomId, el.roomName);
    this.classRoomService.createValue(room)
      .subscribe((roomResponse: ClassRoom) => {
        this.roomData.push(roomResponse);
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

  loadScheduleDates(): void{
    this.scheduleDateScheduleBlockService.getValues()
      .subscribe((data: ScheduleDateScheduleBlock[]) => {
        if (data.length > 0){
          data.forEach((el, index) => {
            const aux: ScheduleElement = {};
            this.loadBlockTopic(el.scheduleBlockId); // load topic
            this.loadBlockTeacher(el.scheduleBlockId); // load teacher
            this.loadBlockClassTime(el.scheduleBlockId, aux); // load timing
            this.loadBlockClassRoom(el.scheduleBlockId); // roomId from database
            const loadErrorState = false;
            if (!loadErrorState) {
              // console.log("temp")
              // console.log(this.tempData);
              this.scheduleData.push(this.tempData);
              // setTimeout(() => {this.scheduleData.push(this.tempData);}, 1000);
              // this.tempData = {};
            }
          });
        }
      });
  }

  loadBlockTopic(id: number): void{
    return this.scheduleBlockCurriculumTopicTrainingProgramService.getValuesFromScheduleBlock(id)
      .subscribe((data: ScheduleBlockCurriculumTopicTrainingProgram) => {
        if (data) {
          this.tempData.topic = data[0].topicTitle;
        }
      });
  }

  loadBlockTeacher(id: number): void{
    this.scheduleBlockTeacherService.getValuesFromScheduleBlock(id)
      .subscribe((data: ScheduleBlockTeacher) => {
        if (data) {
          this.tempData.teacher = `${data[0].lastName} ${data[0].firstName} ${data[0].patronymicName} (${data[0].position})`;
        }
      });
  }

  loadBlockClassTime(id: number, ref: ScheduleElement): void{
    this.scheduleBlockClassTimeService.getValuesFromScheduleBlock(id)
      .subscribe((data: ScheduleBlockClassTime) => {

        if (data) {
          this.tempData.startTime = data[0].classTimeStart;
          this.tempData.endTime = data[0].classTimeEnd;
          ref.startTime = data[0].classTimeStart;
          ref.endTime = data[0].classTimeEnd;
        }
      });
  }

  loadBlockClassRoom(id: number): void{
    this.scheduleBlockClassRoomService.getValuesFromScheduleBlock(id)
      .subscribe((data: ScheduleBlockClassRoom) => {
        if (data){
          this.tempData.roomId = data[0].classroomId;
        }
        return undefined;
      });
  }

  emptyEl(): any {
    return {id: 0, roomId: '', roomName: ''};
  }

  modalOption(el: any): any {
    return {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: true,
      class: 'modal-dialog',
      containerClass: '',
      animated: true,
      data: {
        editableRow: el
      }
    };
  }
}
