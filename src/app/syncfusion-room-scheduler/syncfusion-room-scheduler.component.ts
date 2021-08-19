import {Component, Inject, Input, OnInit, OnChanges, ViewChild, ViewEncapsulation, SimpleChanges} from '@angular/core';
import { extend, isNullOrUndefined, Browser, setCulture, L10n, loadCldr } from '@syncfusion/ej2-base';
import {
  ScheduleComponent, ActionEventArgs, PopupOpenEventArgs, EventRenderedArgs, RenderCellEventArgs, DragAndDropService,
  TimelineViewsService, GroupModel, EventSettingsModel, ResizeService, TimeScaleModel, WorkHoursModel, View, MonthService
} from '@syncfusion/ej2-angular-schedule';
import * as numberingSystems from './localization/numberingSystems.json';
import * as gregorian from './localization/ru/ca-gregorian.json';
import * as numbers from './localization/ru/numbers.json';
import * as timeZoneNames from './localization/ru/timeZoneNames.json';
import * as dictionary from './localization/dictionary.json';

loadCldr(numberingSystems['default'], gregorian['default'], numbers['default'], timeZoneNames['default']);
L10n.load(dictionary['default']);
//setCulture('ru');



@Component({
  selector: 'app-syncfusion-room-scheduler',
  templateUrl: './syncfusion-room-scheduler.component.html',
  styleUrls: ['./syncfusion-room-scheduler.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [TimelineViewsService, ResizeService, DragAndDropService],
})


export class SyncfusionRoomSchedulerComponent implements OnInit, OnChanges
{
  @Input()  scheduleData: any[] = [];
  @Input()  roomData: any[] = [];

  public newEvent: any;
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
  public group: GroupModel = {
    enableCompactView: false,
    resources: ['MeetingRoom']
  };

  public allowMultiple = true;
  public eventSettings: EventSettingsModel;

  @ViewChild('scheduleObj')
  public scheduleObj: ScheduleComponent;

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
    L10n.load(dictionary);
    this.eventSettings = {
      dataSource: this.scheduleData,
      fields: {
        id: 'Id',
        subject: { title: 'Summary', name: 'Subject' },
        location: { title: 'Location', name: 'Location' },
        description: { title: 'Comments', name: 'Description' },
        startTime: { title: 'From', name: 'StartTime' },
        endTime: { title: 'To', name: 'EndTime' },
      }
    };


    this.scheduleBlock = {
      id: 1,
      trainingProgramId: 16,
    };

    // extend([], this.scheduleData, null, true) as object[]
    // this.scheduleObj.locale = 'ru';
    // console.log(numberingSystems);
    // console.log(gregorian);
    // console.log(numbers);
    // console.log(timeZoneNames);
    // console.log(dictionary);
    // L10n.load(dictionary);
    // console.log(this.scheduleObj.localeObj);

    // console.log(this.scheduleObj);

    // this.scheduleObj.localeObj = new L10n('schedule', {
    //   day: 'лол',
    //   week: 'лол',
    //   workWeek: 'лол',
    //   month: 'лол',
    //   today: 'лол'
    // });
    // this.scheduleObj.localeObj.setLocale('ru');
    // this.scheduleObj.localeObj.getConstant('today');
    console.log('init');




  }

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.scheduleObj) {
      this.scheduleObj.render();
    }
  }

  public dateParser(data: string): Date {
    return new Date(data);
  }

  isReadOnly(endDate: Date): boolean {
    const myCurrentDate = new Date();
    myCurrentDate.setDate(myCurrentDate.getDate() - 1);
    return (endDate < myCurrentDate);
  }

  onPopupOpen(args: PopupOpenEventArgs): void {
    if (args.type === 'Editor')  {
      console.log(args);
    }
    const data: { [key: string]: object } = args.data as { [key: string]: object };
    if (args.type === 'QuickInfo' || args.type === 'Editor' || args.type === 'RecurrenceAlert' || args.type === 'DeleteAlert') {
      const target: HTMLElement = (args.type === 'RecurrenceAlert' ||
        args.type === 'DeleteAlert') ? args.element[0] : args.target;
      if (!isNullOrUndefined(target) && target.classList.contains('e-work-cells')) {
        if ((target.classList.contains('e-read-only-cells')) ||
          (!this.scheduleObj.isSlotAvailable(data))) {
          args.cancel = true;
        }
      } else if (!isNullOrUndefined(target) && target.classList.contains('e-appointment') &&
        (this.isReadOnly(data.EndTime as Date))) {
        args.cancel = true;
      }
    }
    // console.log(args);
  }

  onActionBegin(args: ActionEventArgs): void {
    // console.log(args);
    // args.data.push(this.newEvent);
    if (args.requestType === 'eventCreate' || args.requestType === 'eventChange') {
      let data: { [key: string]: object };
      if (args.requestType === 'eventCreate') {
        data = (args.data[0] as { [key: string]: object });
        // console.log(data);
      } else if (args.requestType === 'eventChange') {
        data = (args.data as { [key: string]: object });
      }
      if (!this.scheduleObj.isSlotAvailable(data)) {
        args.cancel = true;
      }
    }
    // console.log(this.scheduleData);
  }

  onRenderCell(args: RenderCellEventArgs): void {
    // console.log('render cell');
    // console.log(args);
    if (args.element.classList.contains('e-work-cells')) {
      if (this.isReadOnly(args.date)) {
        args.element.setAttribute('aria-readonly', 'true');
        args.element.classList.add('e-read-only-cells');
      }
    }
    if (args.elementType === 'emptyCells' && args.element.classList.contains('e-resource-left-td')) {
      const target: HTMLElement = args.element.querySelector('.e-resource-text') as HTMLElement;
      target.innerHTML = '<div style="text-align: center" class="name">Аудитория</div>';
      target.parentElement.style.width = '100px';
    }
  }

  onEventRendered(args: EventRenderedArgs): void {
    // console.log('event rendered');
    // console.log(args);
    const data: { [key: string]: object } = args.data;
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
    //   RoomId: 1,
    //   booop: 'wabba-labba-dub-dub',
    // };
  }
}
