import { Component, Inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { extend, isNullOrUndefined, Browser } from '@syncfusion/ej2-base';
import {
  ScheduleComponent, ActionEventArgs, PopupOpenEventArgs, EventRenderedArgs, RenderCellEventArgs, DragAndDropService,
  TimelineViewsService, GroupModel, EventSettingsModel, ResizeService, TimeScaleModel, WorkHoursModel, View
} from '@syncfusion/ej2-angular-schedule';
import { roomData } from './data';


@Component({
  selector: 'app-syncfusion-room-scheduler',
  templateUrl: './syncfusion-room-scheduler.component.html',
  styleUrls: ['./syncfusion-room-scheduler.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [TimelineViewsService, ResizeService, DragAndDropService]
})

export class SyncfusionRoomSchedulerComponent {
  public selectedDate: Date = new Date(2018, 7, 1);
  public timeScale: TimeScaleModel = { interval: 60, slotCount: 1 };
  public workHours: WorkHoursModel = { start: '08:00', end: '18:00' };
  public currentView: View = 'TimelineWeek';
  public group: GroupModel = {
    enableCompactView: false,
    resources: ['MeetingRoom']
  };
  public resourceDataSource: object[] = [
    { text: 'Jammy', id: 1, color: '#ea7a57', capacity: 20, type: 'Conference' },
    { text: 'Tweety', id: 2, color: '#7fa900', capacity: 7, type: 'Cabin' },
    { text: 'Nestle', id: 3, color: '#5978ee', capacity: 5, type: 'Cabin' },
    { text: 'Phoenix', id: 4, color: '#fec200', capacity: 15, type: 'Conference' },
    { text: 'Mission', id: 5, color: '#df5286', capacity: 25, type: 'Conference' },
    { text: 'Hangout', id: 6, color: '#00bdae', capacity: 10, type: 'Cabin' },
    { text: 'Rick Roll', id: 7, color: '#865fcf', capacity: 20, type: 'Conference' },
    { text: 'Rainbow', id: 8, color: '#1aaa55', capacity: 8, type: 'Cabin' },
    { text: 'Swarm', id: 9, color: '#df5286', capacity: 30, type: 'Conference' },
    { text: 'Photogenic', id: 10, color: '#710193', capacity: 25, type: 'Conference' }
  ];
  public allowMultiple = true;
  public eventSettings: EventSettingsModel = {
    dataSource: extend([], roomData, null, true) as object[],
    fields: {
      id: 'Id',
      subject: { title: 'Summary', name: 'Subject' },
      location: { title: 'Location', name: 'Location' },
      description: { title: 'Comments', name: 'Description' },
      startTime: { title: 'From', name: 'StartTime' },
      endTime: { title: 'To', name: 'EndTime' }
    }
  };

  @ViewChild('scheduleObj')
  public scheduleObj: ScheduleComponent;

  constructor() {

  }

  isReadOnly(endDate: Date): boolean {
    return (endDate < new Date(2018, 6, 31, 0, 0));
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
    const data: { [key: string]: object } = args.data;
    if (this.isReadOnly(data.EndTime as Date)) {
      args.element.setAttribute('aria-readonly', 'true');
      args.element.classList.add('e-read-only');
    }
  }
}
