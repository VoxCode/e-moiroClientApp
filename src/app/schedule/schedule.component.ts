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
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS
} from '@angular/material-moment-adapter';
import 'moment/locale/ru';
import {ScheduleDateScheduleBlock} from '../models/schedule-models/ScheduleDateScheduleBlock';
import {FormControl, FormGroup} from '@angular/forms';
import {ScheduleBlockComponent} from '../schedule-block/schedule-block.component';
import {MatDialog} from '@angular/material/dialog';
import {Teacher} from '../models/Teacher';
import {CurriculumTopicTrainingProgram} from '../models/СurriculumTopicTrainingProgram';
import {CurriculumTopicTrainingProgramService} from '../services/curriculum-topic-training-program.service';
import {TeacherService} from '../services/teacher.service';
import {ScheduleBlock} from '../models/schedule-models/ScheduleBlock';
import {ClassTime} from '../models/schedule-models/СlassTime';
import {ClassTimeService} from '../services/schedule-services/class-time.service';
import {ScheduleClassTimes} from "./schedule-class-times";


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService,
    ClassRoomService, GroupService, CurriculumTopicTrainingProgramService, TeacherService, TrainingProgramService,
    ScheduleDateService, ScheduleBlockService,
    ScheduleDateScheduleBlockService, ScheduleBlockTeacherService, ScheduleBlockCurriculumTopicTrainingProgramService,
    ScheduleBlockClassTimeService, ScheduleBlockClassRoomService, ClassTimeService,
    {provide: MAT_DATE_LOCALE, useValue: 'ru-RU'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}, ],

})
export class ScheduleComponent implements OnInit {
  testScheduleData: ScheduleElement[] = [   // ScheduleElement
    {
      id: 0,
      // topicId: 10,
      topic: 'topic1',
      teacherId: 5,
      teacher: 'teacher1',
      date: new Date(),
      startTime: new Date(0, 0, 15, 11, 0, 0, 0),
      endTime: new Date(),
      timeId: 1,
      group: 1,
      groupId: 1,
      // roomId: 3,
      room: '1',
    },
    {
      id: 2,
      topic: 'topic2',
      teacherId: 15,
      teacher: 'teacher2',
      startTime: new Date(),
      endTime: new Date(),
      timeId: 2,
      group: 2,
      groupId: 3,
      room: '2',
    },
    {
      id: 3,
      topic: 'topic3',
      teacherId: 16,
      teacher: 'teacher3',
      startTime: new Date(),
      endTime: new Date(),
      timeId: 2,
      group: 3,
      groupId: 3,
      room: '3',
    },
    {
      id: 4,
      topic: 'topic4',
      teacherId: 17,
      teacher: 'teacher4',
      startTime: new Date(),
      endTime: new Date(),
      timeId: 3,
      group: 4,
      groupId: 3,
      room: '4',
    },
    {
      id: 5,
      topic: 'topic5',
      teacherId: 18,
      teacher: 'teacher5',
      startTime: new Date(),
      endTime: new Date(),
      timeId: 0,
      group: 5,
      groupId: 3,
      room: '5',
    },
    {
      id: 6,
      topic: 'topic6',
      teacherId: 19,
      teacher: 'teacher6',
      startTime: new Date(),
      endTime: new Date(),
      timeId: 0,
      group: 6,
      groupId: 3,
      room: '6',
    },
  ];

  testTimes = [
    {
      timeStart: new Date(0, 0, 0, 11, 0, 0, 0),
      timeEnd: new Date(0, 0, 0, 12, 25, 0, 0),
      id: 0,
    },
    {
      timeStart: new Date(0, 0, 0, 12, 55, 0, 0),
      timeEnd: new Date(0, 0, 0, 14, 20, 0, 0),
      id: 1,
    },
    {
      timeStart: new Date(0, 0, 0, 14, 30, 0, 0),
      timeEnd: new Date(0, 0, 0, 15, 55, 0, 0),
      id: 2,
    },
    {
      timeStart: new Date(0, 0, 0, 16, 5, 0, 0),
      timeEnd: new Date(0, 0, 0, 17, 30, 0, 0),
      id: 3,
    },
  ];


  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  algRes: any = [];
  timedMonday: any = [];
  algResGeneric: any = [];

  displayTime: any;

  teachers: Teacher[] = [];
  curriculumTopicTrainingPrograms: CurriculumTopicTrainingProgram[] = [];
  groups: Group[] = [];
  roomData: ClassRoom[] = [];
  scheduleData: ScheduleElement[] = [];
  public modalRef: MDBModalRef;

  public saveButtonClicked: Subject<any> = new Subject<any>();


  constructor(
    private matDialog: MatDialog,
    private modalService: MDBModalService,
    private trainingProgramService: TrainingProgramService,
    private classRoomService: ClassRoomService,
    private groupService: GroupService,
    private curriculumTopicTrainingProgramService: CurriculumTopicTrainingProgramService,
    private teacherService: TeacherService,
    private scheduleDateService: ScheduleDateService,
    private scheduleBlockTeacherService: ScheduleBlockTeacherService,
    private scheduleBlockCurriculumTopicTrainingProgramService: ScheduleBlockCurriculumTopicTrainingProgramService,
    private scheduleDateScheduleBlockService: ScheduleDateScheduleBlockService,
    private scheduleBlockClassTimeService: ScheduleBlockClassTimeService,
    private scheduleBlockClassRoomService: ScheduleBlockClassRoomService,
    private scheduleBlockService: ScheduleBlockService,
    private classTimeService: ClassTimeService,
  ) {
  }

  ngOnInit(): void {
    this.loadRooms();
    this.loadGroups();
    this.loadTeachers();
    this.loadCurriculumTopics();
    this.loadScheduleDates();
    this.generateTimedMonday();
    this.generateTimedWeekArray();
    this.generateGenericWeekArray();

    // setInterval(() => {
    //   console.log(this.scheduleData); }, 1000);
  }

  generateTimedMonday(): void {
    const monday = 1;
    ScheduleClassTimes.mondayFirstShift.forEach((time) => {
      const auxRow = {
        rowTime: time, // { timeId: time, time: new Date()}
        scol: []
      };
      const auxCol = {
        day: monday,
        scell: [],
      };
      this.testScheduleData.forEach((el) => {
        if (el.startTime.getDay() === monday
          && el.timeId === time.id) { // change to monday time schedule
          auxCol.scell.push(el);
        }
      });
      auxRow.scol.push(auxCol);
      this.timedMonday.push(auxRow);
    });
    console.log(this.timedMonday);
  }

  createTimes(time: ClassTime): void {
    this.classTimeService.createValue(time)
      .subscribe((response: ClassTime) => {
        console.log(ClassTime);
      });
  }

  generateTimedWeekArray(): void {

    // change to loaded timeschedule(first of all create one)
    this.testTimes.forEach((time) => {
      const auxRow = {
        rowTime: time, // { timeId: time, time: new Date()}
        scol: []
      };
      [2, 3, 4, 5, 6].forEach((day) => {
        const auxCol = {
          day,
          scell: [],
        };
        this.testScheduleData.forEach((el) => {
          if (day === el.startTime.getDay()
            && el.timeId === time.id) {
            auxCol.scell.push(el);
          }
        });
        auxRow.scol.push(auxCol);
      });
      this.algRes.push(auxRow);
    });
    console.log(this.algRes);
  }

  generateGenericWeekArray(): void {

    // change to loaded timeschedule(first of all create one)
    [1, 2, 3, 4, 5, 6].forEach((day) => {
      const auxCol = {
        day,
        scell: [],
      };
      this.testScheduleData.forEach((el) => {
        if (day === el.startTime.getDay()) {
          auxCol.scell.push(el);
        }
      });
      this.algResGeneric.push(auxCol);
    });
    console.log(this.algResGeneric);
  }

  loadRooms(): void {
    this.classRoomService.getValues()
      .subscribe((data: ClassRoom[]) => {
        if (data.length > 0) {
          this.roomData = data;
        }
      });
  }

  loadGroups(): void {
    this.groupService.getValues()
      .subscribe((data: Group[]) => {
        if (data.length > 0) {
          this.groups = data;
        }
      });
  }

  loadTeachers(): void {
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

  loadCurriculumTopics(): void {
    this.curriculumTopicTrainingProgramService.getValues()
      .subscribe((topicsData: CurriculumTopicTrainingProgram[]) => {
        if (topicsData.length > 0) {
          this.curriculumTopicTrainingPrograms = topicsData;
        }
      });
  }

  loadScheduleDates(): void {
    this.scheduleBlockService.getSchedule()
      .subscribe((data: any) => {
        console.log('danewone');
        console.log(data);
        data.forEach((el, index) => {
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
              subgroup: el.subgroup,
              roomId: el.classRoomId,
              room: el.name,
            }
          );
        });
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

  createRoom(el: any): void {
    const room = new ClassRoom(+el.roomId, el.roomName);
    this.classRoomService.createValue(room)
      .subscribe((roomResponse: ClassRoom) => {
        this.roomData.push(roomResponse);
      });
  }

  deleteScheduleBlock(args: ScheduleElement): void {
    console.log('actualremoving');
    console.log(args);
    console.log(args.scheduleBlockId);
    this.scheduleBlockService.deleteValue(args.scheduleBlockId)
      .subscribe((response: ScheduleBlock) => {

      });
  }

  createScheduleBlock(args: ScheduleElement): void {
    const date = new ScheduleDate(0, args.startTime, args.groupId);
    const block = new ScheduleBlock(0, 0, 0);
    const time = new ClassTime(0, args.startTime, args.endTime);
    this.scheduleBlockService.createValue(block)
      .subscribe((blockResponse: ScheduleBlock) => {
        this.createScheduleBlockTeacher(new ScheduleBlockTeacher(0, args.teacherId, blockResponse.id));
        this.createScheduleBlockRoom(new ScheduleBlockClassRoom(0, blockResponse.id, args.roomId));
        this.createBlockTopic(new ScheduleBlockCurriculumTopicTrainingProgram(0, args.topicId, blockResponse.id, 0));
        // this.classTimeService.createValue(time)
        //   .subscribe((classTimeResponse) => {
        //     this.createScheduleBlockTime(new ScheduleBlockClassTime(0, blockResponse.id, classTimeResponse.id));
        //   });
        this.scheduleDateService.createValue(date)
          .subscribe((dateResponse: ScheduleDate) => {
            this.createScheduleDateBlock(new ScheduleDateScheduleBlock(0, dateResponse.id, blockResponse.id));
          });
      });
  }

  createBlockTopic(blockTopicProgram: ScheduleBlockCurriculumTopicTrainingProgram): void {
    this.scheduleBlockCurriculumTopicTrainingProgramService.createValue(blockTopicProgram)
      .subscribe((blockTopicProgramResponse: ScheduleBlockCurriculumTopicTrainingProgram) => {
        // nothing
      });
  }

  createScheduleDateBlock(dateBlock: ScheduleDateScheduleBlock): void {
    this.scheduleDateScheduleBlockService.createValue(dateBlock)
      .subscribe((dateBlockResponse: ScheduleDateScheduleBlock) => {
        // nothing
      });
  }

  createScheduleBlockTeacher(blockTeacher: ScheduleBlockTeacher): void {
    this.scheduleBlockTeacherService.createValue(blockTeacher)
      .subscribe((blockResponse) => {
        // nothing
      });
  }

  createScheduleBlockRoom(blockRoom: ScheduleBlockClassRoom): void {
    this.scheduleBlockClassRoomService.createValue(blockRoom)
      .subscribe((blockRoomResponse: ScheduleDate) => {
        // nothing
      });

  }

  createScheduleBlockTime(blockTime: ScheduleBlockClassTime): void {
    this.scheduleBlockClassTimeService.createValue(blockTime)
      .subscribe((blockClassTimeResponse) => {
        // nothing
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
      class: 'modal-fluid',
      containerClass: '',
      animated: true,
      data: {
        scheduleElement: el
      }
    };
  }

  onCellClick(title: string, el: ScheduleElement = new ScheduleElement()): void {
    this.matDialog.open(ScheduleBlockComponent, {
      minWidth: '800px',
      data: {
        title,
        groups: this.groups,
        rooms: this.roomData,
        topics: this.curriculumTopicTrainingPrograms,
        teachers: this.teachers,
        scheduleElement: el,
      }
    });
    console.log('clicked celllll');
  }
}
