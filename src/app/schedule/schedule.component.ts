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
import {ScheduleDateService} from "../services/schedule-services/schedule-date.service";
import {ScheduleDate} from "../models/schedule-models/ScheduleDate";
import {ScheduleDateScheduleBlockService} from "../services/schedule-services/schedule-date-schedule-block.service";
import {ScheduleBlockTeacherService} from "../services/schedule-services/schedule-block-teacher.service";
import {ScheduleBlockCurriculumTopicTrainingProgramService} from "../services/schedule-services/schedule-block-curriculum-topic-training-program.service";
import {ScheduleBlockClassTimeService} from "../services/schedule-services/schedule-block-class-time.service";
import {ScheduleBlockClassRoomService} from "../services/schedule-services/schedule-block-class-room.service";


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService,
    ClassRoomService, GroupService, TrainingProgramService, ScheduleDateService,
  ScheduleDateScheduleBlockService, ScheduleBlockTeacherService, ScheduleBlockCurriculumTopicTrainingProgramService,
  ScheduleBlockClassTimeService, ScheduleBlockClassRoomService]
})
export class ScheduleComponent implements OnInit {

  roomData: any[] = [];
  scheduleData: any[] = [];
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
  ) { }

  ngOnInit(): void {
    this.loadRooms();
    this.loadGroups();

    this.scheduleData = [{
      Id: 1,
      Subject: 'asdefrgtyhujikol',
      Description: 'zxcvbnm,',
      StartTime: new Date(2018, 6, 30, 9, 0),
      EndTime: new Date(2018, 6, 30, 11, 0),
      RoomId: 1,
      booop: 'wabba-labba-dub-dub',
    }];
  }


  // Color generator
  intToRGB(i: number): string{
    // tslint:disable-next-line:no-bitwise
    const c: string = (i & 0x00FFFFFF)
      .toString(16)
      .toUpperCase();
    return '00000'.substring(0, 6 - c.length) + c;
  }

  loadRooms(): void{
    this.classRoomService.getValues()
      .subscribe((data: ClassRoom[]) => {
        if (data.length > 0) {
          if (this.roomData.length > 0) { this.roomData = []; }
          data.forEach((el, index) => {
            this.roomData.push({
              text: el.name, id: index + 1, color: `#${this.intToRGB(3453434 * ((index + 1) * 5))}` // Math.random()
            });
          });
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
        this.roomData.push({text: roomResponse.name, id: roomResponse.id, color: '#543434'});
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
    this.scheduleDateService.getValues()
      .subscribe((data: ScheduleDate[]) => {
        if (data.length > 0){
          data.forEach((el, index) => {

          });
        }
      });
  }


  loadTrainingPrograms(): void{}


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
