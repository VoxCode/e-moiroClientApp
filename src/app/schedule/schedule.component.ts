import {AfterViewInit, Component, OnInit} from '@angular/core';
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
import {ScheduleClassTimes} from './schedule-class-times';
import {fromEvent, interval} from 'rxjs';
import {debounceTime, distinctUntilChanged, last, map, switchMap} from 'rxjs/operators';
import {MY_FORMATS} from '../utils/material-date-format';


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
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}, ],

})
export class ScheduleComponent implements OnInit, AfterViewInit {

  settings = new FormGroup({
    filterElement: new FormControl(),
    start: new FormControl(),
    end: new FormControl(),
    shift: new FormControl(),
  });

  selectedFilter: any;
  timedWeek: any = [];
  timedMonday: any = [];
  timedMondayFirstShift: any = [];
  timedMondaySecondShift: any = [];
  timedWeekGeneric: any = [];
  timedWeekFirstShift: any = [];
  timedWeekSecondShift: any = [];
  monthGeneric: any = [];
  times: ClassTime[];

  weeks: any = [];
  days: any = [];

  currentRequest: any;
  showSpinner: boolean;

  teachers: Teacher[] = [];
  curriculumTopicTrainingPrograms: CurriculumTopicTrainingProgram[] = [];
  groups: Group[] = [];
  roomData: ClassRoom[] = [];
  scheduleData: ScheduleElement[] = [];
  public modalRef: MDBModalRef;

  $search: Subject<void> = new Subject<void>();

  public saveButtonClicked: Subject<any> = new Subject<any>();
  formatTeacherName: any = Teacher.getFullName;
  private selectedShift: number;


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
    this.showSpinner = false;
    this.loadSecondaryData();

    this.settings.setControl('start', new FormControl(
      this.getFirstDayOfWeek(new Date())
    ));
    this.settings.setControl('end', new FormControl(
      new Date(this.getFirstDayOfWeek(new Date()).getTime() + (6 * 24 * 60 * 60 * 1000))
    ));
    this.settings.setControl('shift', new FormControl(0));

    this.selectedShift = 0;
    // this.loadScheduleDates();

    this.loadScheduleDatesRange(this.settings.value.start, this.settings.value.end);

    this.setupButtons();
  }

  ngAfterViewInit(): void {

  }


  applySearch(): void {
    this.loadScheduleDatesRange(this.settings.value.start, this.settings.value.end);
  }

  getFirstDayOfWeek(d: Date): Date {
    const date = new Date(d);
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }
  getFirstDayOfMonth(d: Date): Date{
    const date = new Date(d);
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }
  getLastDayOfMonth(d: Date): Date{
    const date = new Date(d);
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  }

  getDayOfWeek(d: Date): number{
    return new Date(d).getDay();
  }

  generateTimedMonday(): void {
    this.timedMonday = [];
    const monday = 1;
    this.times.filter(x => x.dayOfTheWeek === 1 && (x.shift === this.selectedShift || this.selectedShift === 0))
      .forEach((time) => {
        const auxRow = {
          rowTime: time,
          scol: []
        };
        const auxCol = {
          day: monday,
          scell: [],
        };
        this.scheduleData.forEach((el) => {
          if (el.date.getDay() === monday
            && el.time.id === time.id) { // change to monday time schedule
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
    this.timedWeek = [];
    this.times.filter(x => x.dayOfTheWeek !== 1 && (x.shift === this.selectedShift || this.selectedShift === 0)).forEach((time) => {
      const auxRow = {
        rowTime: time,
        scol: []
      };
      [2, 3, 4, 5, 6].forEach((day) => {
        const auxCol = {
          day,
          scell: [],
        };
        this.scheduleData.forEach((el) => {
          if (day === el.date.getDay()
            && el.time.id === time.id) {
            auxCol.scell.push(el);
          }
        });
        auxRow.scol.push(auxCol);
      });
      this.timedWeek.push(auxRow);
    });

    console.log('tarr');
    console.log(this.timedWeek);
  }

  generateGenericWeekArray(): void {

    this.timedWeekGeneric = [];
    // modify to get time from elements for context pupup
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
      this.timedWeekGeneric.push(auxCol);
    });
    console.log('garr');
    console.log(this.timedWeekGeneric);
  }

  generateMonthArray(): void {
    this.monthGeneric = [];
    const dayInMl = 86400000;
    const start = new Date(this.settings.controls.start.value);
    const firstDayOfTheMonth = this.getFirstDayOfMonth(start);
    const lastDayOfTheMonth = this.getLastDayOfMonth(start);
    let arrayStart;
    let arrayEnd;
    if (firstDayOfTheMonth.getDay() !== 1) {
      arrayStart = new Date(this.getFirstDayOfWeek(firstDayOfTheMonth));
    } else {
      arrayStart = firstDayOfTheMonth;
    }
    if (lastDayOfTheMonth.getDay() !== 0) {
      arrayEnd = new Date(this.getFirstDayOfWeek(lastDayOfTheMonth).getTime() + 6 * dayInMl);
    } else {
      arrayEnd = lastDayOfTheMonth;
    }


    for (let i = arrayStart.getTime(); i <= arrayEnd.getTime(); i = i + dayInMl) {
      const day = {
        date: new Date(i),
        cells: this.scheduleData.filter(x => x.date.getTime() === i)
      };
      this.monthGeneric.push(day);
    }
    const weekRange = this.monthGeneric.length / 7;
    this.weeks = Array(weekRange).fill(1).map((x, i) => i * 7);
    this.days = Array(7).fill(1).map((x, i) => i);
    console.log(weekRange);
    console.log(this.weeks);
    console.log(this.monthGeneric);
  }


  compare(a: number, b: number): number {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  }

  loadTimes(): void {
    this.classTimeService.getValues()
      .subscribe((data: ClassTime[]) => {
        this.times = data.sort((a, b) => this.compare(a.id, b.id));
      });
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
            teacher.fullNameForm = Teacher.getFullNameWithPosition(teacher);
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
        this.scheduleData = [];
        this.parseScheduleElements(data);
        this.reassembleArrays();
      });
  }

  //  request: any;
  loadScheduleDatesRange(s: Date, e: Date): void {
    // console.log('unsub');
    // if(this.request != null)
    //   this.request.unsubscribe();
    //  this.request =
    this.showSpinner = true;
    if (this.currentRequest != null) {
      this.currentRequest.unsubscribe();
    }
    const obs$ = this.scheduleBlockService.getScheduleRange(s, e)
      .subscribe((data: any) => {
        this.scheduleData = [];
        this.parseScheduleElements(data);
        if (this.selectedFilter != null) {
          this.filterSchedule();
        }
        this.reassembleArrays();
      });
    this.currentRequest = obs$;
  }

  loadSecondaryData(): void {
    this.loadTimes();
    this.loadRooms();
    this.loadGroups();
    this.loadTeachers();
    this.loadCurriculumTopics();
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
    this.scheduleBlockService.deleteValue(args.scheduleBlockId)
      .subscribe((blockDeleteResponse: ScheduleBlock) => {
        this.scheduleDateService.deleteValue(args.dateId).subscribe((dateDeleteResponse: ScheduleDate) => {
          // reload schedule data or update the arrays
          this.scheduleData = this.scheduleData.filter((x) => x.scheduleBlockId !== args.scheduleBlockId);
          this.reassembleArrays();
        });
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
    if (el.date?.getDay() === 0) {
      return;
    }
    const dialogRef = this.matDialog.open(ScheduleBlockComponent, {
      minWidth: '800px',
      maxWidth: '800px',
      data: {
        title,
        date: el.date,
        groups: this.groups,
        rooms: this.roomData,
        topics: this.curriculumTopicTrainingPrograms,
        teachers: this.teachers,
        times: this.times,
        scheduleElement: el,
      }
    });
    // status 0 - none, 1 - element added, 2 - element updated, 3 - element deleted

    dialogRef.afterClosed().subscribe(result => {
      switch (result.status) {
        case 0:
          console.log('dialog result status 0');
          break;
        case 1:
          this.loadScheduleDatesRange(this.settings.value.start, this.settings.value.end);
          break;
        case 2:
          setTimeout(() => {
            this.reassembleArrays();
          }, 100);
          break;
        case 3:
          console.log('dialog result status 3');
          break;
        default:
          console.log('dialog result default');
          break;
      }
      console.log('dialog closed');
      console.log(result);
    });
  }

  parseScheduleElements(data: any[]): void {
    console.log('danewone');
    console.log(data);
    data.forEach((el, index) => {
      this.scheduleData.push({
          scheduleBlockId: el.scheduleBlockId,
          topicId: el.curriculumTopicTrainingProgramId,
          topic: el.topicTitle,
          dateId: el.scheduleDateId,
          date: new Date(el.date),
          // teacherId: el.teacherId,
          teacher: el.teacherobj,
          time: el.time,
          // timeId: el.classTimeId,
          // startTime: new Date(el.classTimeStart),
          // endTime: new Date(el.classTimeEnd),
          groupId: el.groupId,
          group: el.groupNumber,
          subgroup: el.subgroupNumber,
          roomId: el.classRoomId,
          room: el.name,
        }
      );
    });
  }

  divideTimedElementsByShift(): void {
    this.timedWeekFirstShift = this.getElementsByShift(this.timedWeek, 1);
    this.timedWeekSecondShift = this.getElementsByShift(this.timedWeek, 2);
    this.timedMondayFirstShift = this.getElementsByShift(this.timedMonday, 1);
    this.timedMondaySecondShift = this.getElementsByShift(this.timedMonday, 2);
  }

  getElementsByShift(schedule: any[], shift: number): any[] {
    if (shift === 0) {
      return schedule;
    } else {
      return schedule.filter(x => x.rowTime.shift === shift || x.rowTime.shift === undefined);
    }
    // return this.timedWeekGeneric.filter(x => x.rowTime.shift === this.settings.value.shift);
  }

  reassembleArrays(): void {
    this.showSpinner = true;
    this.generateTimedMonday();
    this.generateTimedWeekArray();
    this.generateGenericWeekArray();
    this.divideTimedElementsByShift();
    this.generateMonthArray();
    this.showSpinner = false;
  }

  filterSchedule(): void {
    console.log(this.selectedFilter);
    const option = this.selectedFilter.data;
    switch (this.selectedFilter.type) {
      case 'group':
        this.scheduleData = this.scheduleData.filter((x) => x.groupId === option.id);
        break;
      case 'teacher':
        this.scheduleData = this.scheduleData.filter((x) => x.teacher.id === option.id);
        break;
      case 'room':
        this.scheduleData = this.scheduleData.filter((x) => x.roomId === option.id);
        break;
      default:
        console.log('Filter default!');
        break;
    }
  }

  setupButtons(): void {
    // .distinctUntilChanged()
    // .switchMap(() => this.http.post(...post params))
    this.$search.pipe(debounceTime(500)).subscribe(() => {
      console.log('dobounced button');
      this.applySearch();
    });
    // const buttons = document.getElementsByName('loadingButton');
    // buttons.forEach(x => {
    //   const el$ = fromEvent(x, 'click');
    //   el$.pipe(
    //     debounceTime(500)
    //   )
    //     .subscribe(() => {
    //       console.log('dobounced button');
    //       this.applySearch();
    //     });
    // });
  }

  search(): void {
    this.$search.next();
  }

  arrowForward(): void {
    console.log('forward');
    const prevStart = new Date(this.settings.value.start);
    console.log(prevStart);

    const nextStart = this.getFirstDayOfWeek(new Date(prevStart.getTime() + (7 * 24 * 60 * 60 * 1000)));
    const nextEnd = new Date(nextStart.getTime() + (6 * 24 * 60 * 60 * 1000));
    this.settings.controls.start.setValue(nextStart);
    this.settings.controls.end.setValue(nextEnd);
    this.search();
  }

  arrowBackward(): void {
    console.log('backward');
    const prevStart = new Date(this.settings.value.start);

    const nextStart = this.getFirstDayOfWeek(new Date(prevStart.getTime() - (7 * 24 * 60 * 60 * 1000)));
    const nextEnd = new Date(nextStart.getTime() + (6 * 24 * 60 * 60 * 1000));
    this.settings.controls.start.setValue(nextStart);
    this.settings.controls.end.setValue(nextEnd);
    this.search();
  }

}
