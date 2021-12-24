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
    // this.scheduleData.push({
    //     id: 12,
    //     scheduleBlockId: 0,
    //     topicId: 0,
    //     topic: "qwe",
    //     teacherId: 0,
    //     teacher: "sdf",
    //     startTime: new Date(),
    //     endTime: new Date(),
    //     groupId: 0,
    //     group: 12321312,
    //     roomId: 2,
    //     room: "dfsdffewr",
    //   }
    // );
    this.loadScheduleDates();
    setInterval(() => {
    console.log(this.scheduleData); }, 1000);
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
    this.scheduleBlockService.getSchedule()
      .subscribe((data: any) => {
        console.log('danewone');
        console.log(data);
        data.forEach( (el, index) => {
          console.log(index);
          this.scheduleData.push({
              id: index,
              scheduleBlockId: el.scheduleBlockId,
              topicId: el.curriculumTopicTrainingProgramId,
              topic: el.topicTitle,
              teacherId: el.teacherId,
              teacher: el.teacherFullName,
              startTime: el.classTimeStart,
              endTime: el.classTimeEnd,
              groupId: el.groupId,
              group: el.groupNumber,
              roomId: el.classRoomId,
              room: el.name,
            }
          );
        });
      });
    // this.scheduleDateScheduleBlockService.getValues()
    //   .subscribe((data: ScheduleDateScheduleBlock[]) => {
    //     if (data.length > 0){
    //       data.forEach((el, index) => {
    //         const aux: ScheduleElement = {};
    //         this.loadBlockTopic(el.scheduleBlockId); // load topic
    //         this.loadBlockTeacher(el.scheduleBlockId); // load teacher
    //         this.loadBlockClassTime(el.scheduleBlockId, aux); // load timing
    //         this.loadBlockClassRoom(el.scheduleBlockId); // roomId from database
    //         const loadErrorState = false;
    //         if (!loadErrorState) {
    //           // console.log("temp")
    //           // console.log(this.tempData);
    //           this.scheduleData.push(this.tempData);
    //           // setTimeout(() => {this.scheduleData.push(this.tempData);}, 1000);
    //           // this.tempData = {};
    //         }
    //       });
    //     }
    //   });
  }

  loadBlockTopic(id: number): void{
    return this.scheduleBlockCurriculumTopicTrainingProgramService.getValuesFromScheduleBlock(id)
      .subscribe((data: ScheduleBlockCurriculumTopicTrainingProgram) => {
        if (data) {
          this.tempData.topic = data[0].topicTitle;
          this.tempData.topicId = data[0].curriculumTopicTrainingProgramId;
        }
      });
  }

  loadBlockTeacher(id: number): void{
    this.scheduleBlockTeacherService.getValuesFromScheduleBlock(id)
      .subscribe((data: ScheduleBlockTeacher) => {
        if (data) {
          console.log('yollololololololol');
          console.log(data);
          this.tempData.teacher = `${data[0].lastName} ${data[0].firstName} ${data[0].patronymicName} (${data[0].position})`;
          this.tempData.teacherId = data.teacherId;
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
          this.tempData.room = data[0].name;
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
