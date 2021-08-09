import {Component, Inject, Input, OnInit, OnChanges, ViewChild, ViewEncapsulation, SimpleChanges} from '@angular/core';
import { extend, isNullOrUndefined, Browser } from '@syncfusion/ej2-base';
import {
  ScheduleComponent, ActionEventArgs, PopupOpenEventArgs, EventRenderedArgs, RenderCellEventArgs, DragAndDropService,
  TimelineViewsService, GroupModel, EventSettingsModel, ResizeService, TimeScaleModel, WorkHoursModel, View
} from '@syncfusion/ej2-angular-schedule';
import {fifaEventsData} from './data';


@Component({
  selector: 'app-syncfusion-room-scheduler',
  templateUrl: './syncfusion-room-scheduler.component.html',
  styleUrls: ['./syncfusion-room-scheduler.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [TimelineViewsService, ResizeService, DragAndDropService],
})


export class SyncfusionRoomSchedulerComponent implements OnInit
{
  @Input()  scheduleData: any[] = [];
  @Input()  roomData: any[];

  public selectedDate: Date = new Date(2018, 7, 1);
  public timeScale: TimeScaleModel = { interval: 60, slotCount: 1 };
  public workHours: WorkHoursModel = { start: '08:00', end: '18:00' };
  public currentView: View = 'TimelineWeek';
  public group: GroupModel = {
    enableCompactView: false,
    resources: ['MeetingRoom']
  };

  public allowMultiple = true;
  public eventSettings: EventSettingsModel;

  @ViewChild('scheduleObj')
  public scheduleObj: ScheduleComponent;

  ngOnInit(): void {
    setInterval(() => {
       // this.scheduleObj.resources[0].dataSource = this.roomData;
       //this.scheduleObj.render();
    }, 3000);

    // this.parsedSchedule = new Array((this.roomData.length));
    // this.parsedScheduleArray = new Array(this.roomData.length);
    // this.parseSchedule();

    // extend([], this.scheduleData, null, true) as object[]
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
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('change');
  }

    // parseSchedule(): void {
    //
    // this.scheduleData.forEach((el, index) => {
    //   this.parsedSchedule.id = ++index;
    //   this.parsedSchedule.subject = `${el.group} (${el.theme})`;
    //   this.parsedSchedule.description = el.teacher;
    //   this.parsedSchedule.startTime = el.startTime;
    //   this.parsedSchedule.endDate = el.endTime;
    //   this.parsedSchedule.id = el.roomId;
    //   this.parsedScheduleArray.push(this.parsedSchedule);
    // });
    // }

  public dateParser(data: string): Date {
    return new Date(data);
  }

  isReadOnly(endDate: Date): boolean {
    return (endDate < new Date(2018, 5, 31, 0, 0));
  }

  onPopupOpen(args: PopupOpenEventArgs): void {
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
  }

  onActionBegin(args: ActionEventArgs): void {
    if (args.requestType === 'eventCreate' || args.requestType === 'eventChange') {
      let data: { [key: string]: object };
      if (args.requestType === 'eventCreate') {
        data = (args.data[0] as { [key: string]: object });
      } else if (args.requestType === 'eventChange') {
        data = (args.data as { [key: string]: object });
      }
      if (!this.scheduleObj.isSlotAvailable(data)) {
        args.cancel = true;
      }
    }
  }

  onRenderCell(args: RenderCellEventArgs): void {
    //console.log('render cell');
    // console.log(args);
    if (args.element.classList.contains('e-work-cells')) {
      if (args.date < new Date(2018, 5, 31, 0, 0)) {
        args.element.setAttribute('aria-readonly', 'true');
        args.element.classList.add('e-read-only-cells');
      }
    }
    if (args.elementType === 'emptyCells' && args.element.classList.contains('e-resource-left-td')) {
      const target: HTMLElement = args.element.querySelector('.e-resource-text') as HTMLElement;
      target.innerHTML = '<div style="text-align: center" class="name">Rooms</div>';
      target.parentElement.style.width = '100px';
    }
  }

  onEventRendered(args: EventRenderedArgs): void {
    //console.log('event rendered');
    // console.log(args);
    const data: { [key: string]: object } = args.data;
    if (this.isReadOnly(data.EndTime as Date)) {
      args.element.setAttribute('aria-readonly', 'true');
      args.element.classList.add('e-read-only');
    }
  }

}
