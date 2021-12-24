import {Component, Inject, Input, OnInit, OnChanges, ViewChild, ViewEncapsulation, SimpleChanges} from '@angular/core';
import { extend, isNullOrUndefined, Browser, setCulture, L10n, loadCldr, Internationalization } from '@syncfusion/ej2-base';
import {
  ScheduleComponent,
  ActionEventArgs,
  CurrentAction,
  EJ2Instance,
  CellClickEventArgs,
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

import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
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
import {ScheduleElement} from '../schedule/schedule-element';
import {ScheduleBlock} from '../models/schedule-models/ScheduleBlock';
import {ClassTime} from '../models/schedule-models/СlassTime';
import {ClassTimeService} from '../services/schedule-services/class-time.service';

loadCldr(numberingSystems['default'], gregorian["default"], numbers["default"], timeZoneNames["default"]);
L10n.load(dictionary["default"]);



@Component({
  selector: 'app-syncfusion-room-scheduler',
  templateUrl: './syncfusion-room-scheduler.component.html',
  styleUrls: ['./syncfusion-room-scheduler.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [TimelineViewsService, ResizeService, DragAndDropService, DayService, WeekService,
    TimelineViewsService, MonthService, AgendaService,
    ScheduleDateService, ScheduleBlockService,
    ScheduleDateScheduleBlockService, ScheduleBlockTeacherService, ScheduleBlockCurriculumTopicTrainingProgramService,
    ScheduleBlockClassTimeService, ScheduleBlockClassRoomService, ClassTimeService]
})


export class SyncfusionRoomSchedulerComponent implements OnInit, OnChanges
{
  @Input()  scheduleData: any[] = [];
  @Input() public set roomData(val: ClassRoom[]) {
    this._roomData = val;
    this.parseRooms();
  }

  constructor(
    private scheduleDateService: ScheduleDateService,
    private scheduleBlockTeacherService: ScheduleBlockTeacherService,
    private scheduleBlockCurriculumTopicTrainingProgramService: ScheduleBlockCurriculumTopicTrainingProgramService,
    private scheduleDateScheduleBlockService: ScheduleDateScheduleBlockService,
    private scheduleBlockClassTimeService: ScheduleBlockClassTimeService,
    private scheduleBlockClassRoomService: ScheduleBlockClassRoomService,
    private scheduleBlockService: ScheduleBlockService,
    private classTimeService: ClassTimeService,
  ) {}


  private _roomData: ClassRoom[] = [];
  convertedRooms: any[] = [];

  private prev: ScheduleElement;

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

    setTimeout(() => {
      if (this.convertedRooms && this.scheduleData) {
        this.loaded = true;
      }
    }, 1000);
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

    if (args.type === 'Editor')
    {
      this.prev = data;
    }
    console.log(this.prev);
    if (args.type === 'QuickInfo' || args.type === 'Editor' || args.type === 'RecurrenceAlert' || args.type === 'DeleteAlert') {
      const target: HTMLElement = (args.type === 'RecurrenceAlert' || args.type === 'DeleteAlert') ? (args.data as any).element[0] : args.target;
      if (!isNullOrUndefined(target) && target.classList.contains('e-work-cells')) {
        if (args.type === 'QuickInfo')
        {
          args.cancel = true;
        }
        if ((target.classList.contains('e-read-only-cells')) ||
          (!this.scheduleObj.isSlotAvailable(data))) {
          // if cell already have appointment inside
          // args.cancel = true;
        }
      } else if (!isNullOrUndefined(target) && target.classList.contains('e-appointment') &&
        (this.isReadOnly(data.EndTime as Date))) {
        args.cancel = true;
      }
    }
    console.log('popup');
    console.log(args);
  }

  onActionBegin(args: ActionEventArgs): void {
    if (args.requestType === 'eventCreate' && args.data[0].metaData !== 'Valid'
      && !isNullOrUndefined(document.querySelector('.e-schedule-dialog'))) {
      this.scheduleObj.uiStateValues.isBlock = true;
      console.log(args.data[0].metaData);
      args.cancel = true;
      alert('Не прошло валидацию!');
    }

    if (args.requestType === 'eventCreate' || args.requestType === 'eventChange' || args.requestType === 'eventRemove') {
      let data: { [key: string]: Object };
      if (args.requestType === 'eventCreate') {
        data = (args.data[0] as { [key: string]: Object });
        // this.createScheduleBlock(data);
      } else if (args.requestType === 'eventChange') {
        data = (args.data as { [key: string]: Object });
        args.cancel = true;
        console.log('change');
        console.log(args);
        console.log(args.data);
        this.updateScheduleBlock(data);
      } else if (args.requestType === 'eventRemove'){
        console.log('remove');
        console.log(args.data);

        data = (args.data[0] as { [key: string]: Object });

        console.log(data);
        console.log(data.scheduleBlockId);
        this.deleteScheduleBlock(data);
      }
      // restriction to generating second appointment in one room
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
    console.log("eventrendered");
    console.log(args);
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
    console.log('popupClose');
    console.log(args);
    console.log(this.scheduleData);
  }

  deleteScheduleBlock(args: ScheduleElement): void{
    console.log('actualremoving');
    console.log(args);
    console.log(args.scheduleBlockId);
    this.scheduleBlockService.deleteValue(args.scheduleBlockId)
      .subscribe((response: ScheduleBlock) => {

      });
  }
  createScheduleBlock(args: ScheduleElement): void{
    const date = new ScheduleDate(0, args.startTime, args.groupId);
    const block = new ScheduleBlock(0, 0, 0);
    const time = new ClassTime(0, args.startTime, args.endTime);
    this.scheduleBlockService.createValue(block)
      .subscribe((blockResponse: ScheduleBlock) => {
        this.createScheduleBlockTeacher(new ScheduleBlockTeacher(0, args.teacherId, blockResponse.id));
        this.createScheduleBlockRoom(new ScheduleBlockClassRoom(0, blockResponse.id, args.roomId));
        this.createBlockTopic(new ScheduleBlockCurriculumTopicTrainingProgram(0, args.topicId, blockResponse.id, 0));
        this.classTimeService.createValue(time)
          .subscribe((classTimeResponse) => {
            this.createScheduleBlockTime(new ScheduleBlockClassTime(0, blockResponse.id, classTimeResponse.id));
          });
        this.scheduleDateService.createValue(date)
          .subscribe((dateResponse: ScheduleDate) => {
            this.createScheduleDateBlock(new ScheduleDateScheduleBlock(0, dateResponse.id, blockResponse.id));
          });
      });
  }

  createBlockTopic(blockTopicProgram: ScheduleBlockCurriculumTopicTrainingProgram): void{
    this.scheduleBlockCurriculumTopicTrainingProgramService.createValue(blockTopicProgram)
      .subscribe((blockTopicProgramResponse: ScheduleBlockCurriculumTopicTrainingProgram) => {
        // nothing
      });
  }

  createScheduleDateBlock(dateBlock: ScheduleDateScheduleBlock): void{
    this.scheduleDateScheduleBlockService.createValue(dateBlock)
      .subscribe((dateBlockResponse: ScheduleDateScheduleBlock) => {
        // nothing
      });
  }

  createScheduleBlockTeacher(blockTeacher: ScheduleBlockTeacher): void{
    this.scheduleBlockTeacherService.createValue(blockTeacher)
      .subscribe((blockResponse) => {
        // nothing
      });
  }

  createScheduleBlockRoom(blockRoom: ScheduleBlockClassRoom): void{
    this.scheduleBlockClassRoomService.createValue(blockRoom)
      .subscribe((blockRoomResponse: ScheduleDate) => {
        // nothing
      });

  }

  createScheduleBlockTime(blockTime: ScheduleBlockClassTime): void{
    this.scheduleBlockClassTimeService.createValue(blockTime)
      .subscribe((blockClassTimeResponse) => {
        // nothing
      });
  }

  updateScheduleBlock(args: ScheduleElement): void{

  }

  public getHeaderStyles(data: Record<string, any>): Record<string, any> {
    if (data.elementType === 'cell') {
      return { 'text-align': 'center', 'align-items': 'center', height: '5vh' , color: '#919191' };
    } else {
      const color = data.PrimaryColor;
      return { background: color, color: '#FFFFFF', margin: '1vh' };
    }
  }

  public buttonClickActions(e: Event) {
    const quickPopup: HTMLElement = this.scheduleObj.element.querySelector('.e-quick-popup-wrapper') as HTMLElement;
    const getSlotData: Function = (): { [key: string]: Object } => {
      const cellDetails: CellClickEventArgs = this.scheduleObj.getCellDetails(this.scheduleObj.getSelectedElements());
      const addObj: { [key: string]: Object } = {};
      addObj.Id = this.scheduleObj.getEventMaxID();
      addObj.Subject = ((quickPopup.querySelector('#title') as EJ2Instance).ej2_instances[0] as DropDownListComponent).value;
      addObj.StartTime = new Date(+cellDetails.startTime);
      addObj.EndTime = new Date(+cellDetails.endTime);
      addObj.Description = ((quickPopup.querySelector('#notes') as EJ2Instance).ej2_instances[0] as DropDownListComponent).value;
      addObj.RoomId = ((quickPopup.querySelector('#eventType') as EJ2Instance).ej2_instances[0] as DropDownListComponent).value;
      return addObj;
    };
    if ((e.target as HTMLElement).id === 'add') {
      const addObj: { [key: string]: Object } = getSlotData();
      this.scheduleObj.addEvent(addObj);
    } else if ((e.target as HTMLElement).id === 'delete') {
      const eventDetails: { [key: string]: Object } = this.scheduleObj.activeEventData.event as { [key: string]: Object };
      let currentAction: CurrentAction;
      if (eventDetails.RecurrenceRule) {
        currentAction = 'DeleteOccurrence';
      }
      this.scheduleObj.deleteEvent(eventDetails, currentAction);
    } else {
      const isCellPopup: boolean = quickPopup.firstElementChild.classList.contains('e-cell-popup');
      const eventDetails: { [key: string]: Object } = isCellPopup ? getSlotData() :
        this.scheduleObj.activeEventData.event as { [key: string]: Object };
      let currentAction: CurrentAction = isCellPopup ? 'Add' : 'Save';
      if (eventDetails.RecurrenceRule) {
        currentAction = 'EditOccurrence';
      }
      this.scheduleObj.openEditor(eventDetails, currentAction, true);
    }
    this.scheduleObj.closeQuickInfoPopup();
  }
}
