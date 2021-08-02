import { Component, OnInit } from '@angular/core';
import {AgendaService, DayService, MonthService, WeekService, WorkWeekService} from '@syncfusion/ej2-angular-schedule';
import {ClassRoom} from '../models/schedule-models/ClassRoom';
import {scheduleData} from '../syncfusion-room-scheduler/data';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService]
})
export class ScheduleComponent implements OnInit {
  roomData: any[];
  scheduleData: any[];

  constructor() { }

  ngOnInit(): void {
    this.roomData = [
      {
        text: 'Room1', id: 1, color: '#ea7a57'
      },
      {
        text: 'room2', id: 2, color: '#ea7a57'
      }];


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

}
