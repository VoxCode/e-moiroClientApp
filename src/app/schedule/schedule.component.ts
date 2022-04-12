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
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Teacher} from '../models/Teacher';
import {CurriculumTopicTrainingProgram} from '../models/СurriculumTopicTrainingProgram';
import {CurriculumTopicTrainingProgramService} from '../services/curriculum-topic-training-program.service';
import {TeacherService} from '../services/teacher.service';
import {ScheduleBlock} from '../models/schedule-models/ScheduleBlock';
import {ClassTime} from '../models/schedule-models/СlassTime';
import {ClassTimeService} from '../services/schedule-services/class-time.service';
import {ScheduleClassTimes} from "./schedule-class-times";
import {log} from "util";


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
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},],

})
export class ScheduleComponent implements OnInit {
  testScheduleData: ScheduleElement[] = [   // ScheduleElement
    {
      id: 0,
      topicId: 10,
      topic: 'topic1',
      teacherId: 5,
      teacher: 'teacher1',
      date: new Date(),
      startTime: new Date(0, 0, 15, 11, 0, 0, 0),
      endTime: new Date(),
      timeId: 1,
      group: 1,
      groupId: 1,
      roomId: 3,
      room: '1',
    },
    {
      id: 2,
      topic: 'topic2',
      teacherId: 15,
      teacher: 'teacher2',
      date: new Date(),
      startTime: new Date(),
      endTime: new Date(),
      timeId: 8,
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
      timeId: 9,
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
      timeId: 10,
      group: 4,
      groupId: 3,
      room: '4',
    },
    {
      id: 5,
      topic: 'topic5',
      teacherId: 17,
      teacher: 'teacher5',
      startTime: new Date(),
      endTime: new Date(),
      timeId: 12,
      group: 5,
      groupId: 3,
      room: '5',
    },
    {
      id: 6,
      topic: 'topic6',
      teacherId: 18,
      teacher: 'teacher6',
      startTime: new Date(),
      endTime: new Date(),
      timeId: 12,
      group: 6,
      groupId: 3,
      room: '6',
    },
  ];


  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  algRes: any = [];
  timedMonday: any = [];
  algResGeneric: any = [];
  tm: ClassTime;
  times: ClassTime[];

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


    console.log('set');
    //console.log(ScheduleClassTimes.mondayFirstShift[0].FirstClassTimeStart);
    console.log(ScheduleClassTimes.mondayFirstShift[0].FirstClassTimeStart.toLocaleTimeString());
    console.log(ScheduleClassTimes.mondayFirstShift[0].FirstClassTimeStart.toUTCString());
    console.log(ScheduleClassTimes.mondayFirstShift[0].FirstClassTimeStart.toISOString());

    //this.gentimes();

    this.getTimes();


    setInterval(() => {
      console.log('get');
      console.log(this.scheduleData);
      }, 1000);
    setTimeout(() => {

    }, 5000);
  }

  gentimes(): void {
    ScheduleClassTimes.mondayFirstShift.forEach((time) => {
      this.createTimes(new ClassTime(time.id, time.FirstClassTimeStart, time.FirstClassTimeEnd));
    });
    ScheduleClassTimes.mondaySecondShift.forEach((time) => {
      this.createTimes(new ClassTime(time.id, time.FirstClassTimeStart, time.FirstClassTimeEnd));
    });
    ScheduleClassTimes.genericFirstShift.forEach((time) => {
      this.createTimes(new ClassTime(time.id, time.FirstClassTimeStart, time.FirstClassTimeEnd));
    });
    ScheduleClassTimes.genericSecondShift.forEach((time) => {
      this.createTimes(new ClassTime(time.id, time.FirstClassTimeStart, time.FirstClassTimeEnd));
    });
  }

  createTimes(time: ClassTime): void {
    this.classTimeService.createValue(time)
      .subscribe((response: ClassTime) => {
        this.tm = response;
      });
  }

  getTimes(): void {
    this.classTimeService.getValues()
      .subscribe((data: ClassTime[]) => {
        this.times = data;
      });
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
      this.scheduleData.forEach((el) => {
        if (el.date.getDay() === monday
          && el.timeId === time.id) { // change to monday time schedule
          auxCol.scell.push(el);
        }
      });
      auxRow.scol.push(auxCol);
      this.timedMonday.push(auxRow);
    });
    console.log('tmonday');
    console.log(this.timedMonday);
  }



  generateTimedWeekArray(): void {

    // change to loaded timeschedule(first of all create one)
    ScheduleClassTimes.genericFirstShift.forEach((time) => {
      const auxRow = {
        rowTime: time, // { timeId: time, time: new Date()}
        scol: []
      };
      [2, 3, 4, 5, 6].forEach((day) => {
        const auxCol = {
          day,
          scell: [],
        };
        this.scheduleData.forEach((el) => {
          if (day === el.date.getDay()
            && el.timeId === time.id) {
            auxCol.scell.push(el);
          }
        });
        auxRow.scol.push(auxCol);
      });
      this.algRes.push(auxRow);
    });
    console.log('tarr');
    console.log(this.algRes);
  }

  generateGenericWeekArray(): void {

    // change to loaded timeschedule(first of all create one)
    [1, 2, 3, 4, 5, 6].forEach((day) => {
      const auxCol = {
        day,
        scell: [],
      };
      this.scheduleData.forEach((el) => {
        if (day === el.date.getDay()) {
          auxCol.scell.push(el);
        }
      });
      this.algResGeneric.push(auxCol);
    });
    console.log('garr');
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
              dateId: el.scheduleDateId,
              date: new Date(el.date),
              teacherId: el.teacherId,
              teacher: el.teacherFullName,
              timeId: el.classTimeId,
              startTime: new Date(el.classTimeStart),
              endTime: new Date(el.classTimeEnd),
              groupId: el.groupId,
              group: el.groupNumber,
              subgroup: el.subgroupNumber,
              roomId: el.classRoomId,
              room: el.name,
            }
          );
        });
        this.generateTimedMonday();
        this.generateTimedWeekArray();
        this.generateGenericWeekArray();
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
    const dialogRef = this.matDialog.open(ScheduleBlockComponent, {
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
    dialogRef.afterClosed().subscribe(result => {
      console.log('dialog closed');
      console.log(result);
    });
    console.log('clicked celllll');
  }
}
