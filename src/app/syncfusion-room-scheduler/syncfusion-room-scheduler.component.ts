import {Component, Inject, Input, OnInit, OnChanges, ViewChild, ViewEncapsulation, SimpleChanges} from '@angular/core';
import { extend, isNullOrUndefined, Browser, setCulture, L10n, loadCldr } from '@syncfusion/ej2-base';
import {
  ScheduleComponent,
  ActionEventArgs,
  PopupOpenEventArgs,
  EventRenderedArgs,
  RenderCellEventArgs,
  DragAndDropService,
  TimelineViewsService,
  GroupModel,
  EventSettingsModel,
  ResizeService,
  TimeScaleModel,
  WorkHoursModel,
  View,
  MonthService,
  WeekService, DayService, AgendaService,
} from '@syncfusion/ej2-angular-schedule';
import * as numberingSystems from './localization/numberingSystems.json';
import * as gregorian from './localization/ru/ca-gregorian.json';
import * as numbers from './localization/ru/numbers.json';
import * as timeZoneNames from './localization/ru/timeZoneNames.json';
import * as dictionary from './localization/dictionary.json';
import {ClassRoom} from '../models/schedule-models/ClassRoom';
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

import {ScheduleDateScheduleBlock} from '../models/schedule-models/ScheduleDateScheduleBlock';
import {ScheduleElement} from "../schedule/schedule-element";
import {ScheduleBlock} from "../models/schedule-models/ScheduleBlock";
import {ClassTime} from "../models/schedule-models/СlassTime";

loadCldr(numberingSystems['default'], gregorian["default"], numbers["default"], timeZoneNames["default"]);
L10n.load(dictionary["default"]);



@Component({
  selector: 'app-syncfusion-room-scheduler',
  templateUrl: './syncfusion-room-scheduler.component.html',
  styleUrls: ['./syncfusion-room-scheduler.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [TimelineViewsService, ResizeService, DragAndDropService, DayService, WeekService, TimelineViewsService, MonthService, AgendaService,
    ScheduleDateService, ScheduleBlockService,
    ScheduleDateScheduleBlockService, ScheduleBlockTeacherService, ScheduleBlockCurriculumTopicTrainingProgramService,
    ScheduleBlockClassTimeService, ScheduleBlockClassRoomService],
})


export class SyncfusionRoomSchedulerComponent implements OnInit, OnChanges
{
  @Input()  scheduleData: any[] = [];
  @Input() public set roomData(val: ClassRoom[]) {
    this._roomData = val;
    this.parseRooms();
  }

  constructor() {}


  private _roomData: ClassRoom[] = [];

  convertedRooms: any[] = [];

  public newEvent: any;
  public culture = 'ru';
  public scheduleBlock: any;
  public selectedDate: Date = new Date();
  public timeScale: TimeScaleModel = { interval: 60, slotCount: 1 };
  public workHours: WorkHoursModel = { start: '08:00', end: '18:00' };
  public startHour = '08:00';
  public endHour = '18:00';
  public timeFormat = 'HH:mm';
  public currentView: View = 'TimelineWeek';
  public workWeekDays: number[] = [1, 2, 3, 4, 5];
  public showWeekend = false;
  public rowAutoHeight: true;
  public groupResource: GroupModel = {
    enableCompactView: false,
    resources: ['MeetingRoom']
  };

  public allowMultiple = true;
  public eventSettings: EventSettingsModel;

  @ViewChild('scheduleObj')
  public scheduleObj: any;
  loaded: boolean;

  public get roomData(): ClassRoom[]{
    return this._roomData;
  }

  doDaThing(): void{
    console.log(this.scheduleObj);
    L10n.load(dictionary);
    this.scheduleObj.locale = 'ru';
    this.scheduleObj.localeObj.setLocale('ru');
    // const l10n: L10n = new L10n('schedule', {
    //   day: 'лол',
    //   week: 'лол',
    //   workWeek: 'лол',
    //   month: 'лол',
    //   today: 'лол'
    // });
    // this.scheduleObj.localeObj = l10n;
    // this.scheduleObj.render();
    console.log(this.scheduleObj);

  }

  ngOnInit(): void {
    this.eventSettings = {
      dataSource: this.scheduleData,
      fields: {
        id: 'id',
        subject: { title: 'Тема', name: 'topic'},
        location: { title: 'Преподаватель', name: 'teacher' },
        description: { title: 'Comments', name: 'metaData' },
        startTime: { title: 'Начало', name: 'startTime' },
        endTime: { title: 'Конец', name: 'endTime' },
      },

    };

    this.scheduleBlock = {
      id: 1,
      trainingProgramId: 16
    };
    // extend([], this.scheduleData, null, true) as object[]
    console.log('init');
    console.log(this.scheduleData);

    setTimeout(() => { this.loaded = true; }, 1000);

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.scheduleObj) {
      this.scheduleObj.render();
    }
  }

  intToRGB(i: number): string{
    // tslint:disable-next-line:no-bitwise
    const c: string = (i & 0x00FFFFFF)
      .toString(16)
      .toUpperCase();
    return '00000'.substring(0, 6 - c.length) + c;
  }

  public parseRooms(): void{
    this.roomData.forEach((el, index) => {
      this.convertedRooms.push({
        text: el.name, id: el.id, color: `#${this.intToRGB(3453434 * ((index + 1) * 5))}` // Math.random()
      });
    });
  }

  public dateParser(data: string): Date {
    return new Date(data);
  }

  isReadOnly(endDate: Date): boolean {
    return (endDate < new Date(2018, 6, 31, 0, 0));
  }

  onPopupOpen(args: PopupOpenEventArgs): void {
    const data: { [key: string]: Object } = args.data as { [key: string]: Object };

    // if(args.type === 'cellContent')
    // {
    //   console.log("cellcontent");
    // }

    if (args.type === 'QuickInfo' || args.type === 'Editor' || args.type === 'RecurrenceAlert' || args.type === 'DeleteAlert') {
      const target: HTMLElement = (args.type === 'RecurrenceAlert' ||
        args.type === 'DeleteAlert') ? (args.data as any).element[0] : args.target;
      if (!isNullOrUndefined(target) && target.classList.contains('e-work-cells')) {
        if ((target.classList.contains('e-read-only-cells')) ||
          (!this.scheduleObj.isSlotAvailable(data))) {
          //if cell already have appointment inside
          //args.cancel = true;
        }
      } else if (!isNullOrUndefined(target) && target.classList.contains('e-appointment') &&
        (this.isReadOnly(data.EndTime as Date))) {
          args.cancel = true;
      }
    }
    console.log("popup");
    console.log(args);
  }

  onActionBegin(args: ActionEventArgs): void {
    console.log("action begin");
    console.log(args);
    if (args.requestType === 'eventChange') {
      //args.cancel = true;
      //this.scheduleObj.eventSettings.dataSource = this.scheduleData;
    }
    if (args.requestType === 'eventCreate' || args.requestType === 'eventChange') {
      let data: { [key: string]: Object };
      if (args.requestType === 'eventCreate') {
        data = (args.data[0] as { [key: string]: Object });
      } else if (args.requestType === 'eventChange') {
        data = (args.data as { [key: string]: Object });
      }

      //restriction to generating second appointment in one room
      // if (!this.scheduleObj.isSlotAvailable(data)) {
      //   args.cancel = true;
      // }
    }
  }





  onRenderCell(args: RenderCellEventArgs): void {
    if (args.element.classList.contains('e-work-cells')) {
      if (args.date < new Date(2018, 6, 31, 0, 0)) {
        args.element.setAttribute('aria-readonly', 'true');
        args.element.classList.add('e-read-only-cells');
      }
    }
    if (args.elementType === 'emptyCells' && args.element.classList.contains('e-resource-left-td')) {
      const target: HTMLElement = args.element.querySelector('.e-resource-text') as HTMLElement;
      target.innerHTML = '<div class="name">Rooms</div><div class="type">Type</div><div class="capacity">Capacity</div>';
    }
  }

  onEventRendered(args: EventRenderedArgs): void {
    const data: { [key: string]: Object } = args.data;
    if (this.isReadOnly(data.EndTime as Date)) {
      args.element.setAttribute('aria-readonly', 'true');
      args.element.classList.add('e-read-only');
    }
  }



  onPopupClose(args: any): void{
    // args.data = {
    //   Id: 2,
    //   Subject: 'asdefrgtyhujikol',
    //   Description: 'zxcvbnm,',
    //   StartTime: new Date(2018, 7, 1, 9, 0),
    //   EndTime: new Date(2018, 7, 1, 12, 0),
    //   roomId: 1,
    //   booop: 'wabba-labba-dub-dub',
    // };
   console.log("popupClose");
   console.log(args);
   console.log(this.scheduleData);
  }

  CreateScheduleBlock(args: ScheduleElement): void{

      this.roomData.push({text: newElement.roomName, id: 5, color: '#543434'});
      this.roomData = this.roomData.map(num => num);
      this.createRoom(newElement);

      const date = new ScheduleDate(0, args.startTime, args.groupId);
      const dateBlock = new ScheduleDateScheduleBlock(0, 0, args.scheduleBlockId);
      const block = new ScheduleBlock(0,0,0);
      const blockTeacher = new ScheduleBlockTeacher(0, args.teacherId, args.scheduleBlockId, 0);
      const blockRoom = new ScheduleBlockClassRoom(0,args.scheduleBlockId,args.roomId,0,0);
      const blockTime = new ScheduleBlockClassTime(0,args.scheduleBlockId,0, 0,0,0);
      const time = new ClassTime(0, args.startTime, args.endTime);

      this.ScheduleDateService.createValue(date)
        .subscribe((dateResponse: ScheduleDate) => {

        });

      this.Sche

    const room = new ClassRoom(+el.roomId, el.roomName);
    this.classRoomService.createValue(room)
      .subscribe((roomResponse: ClassRoom) => {
        this.roomData.push(roomResponse);
      });
  }

  UpdateScheduleBlock(): void{

  }
}
