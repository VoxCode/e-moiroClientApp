import {Component, HostListener, Input, OnInit} from '@angular/core';
import {ScheduleElement} from '../schedule/schedule-element';

@Component({
  selector: 'app-schedule-cell',
  templateUrl: './schedule-cell.component.html',
  styleUrls: ['./schedule-cell.component.scss']
})
export class ScheduleCellComponent implements OnInit {

  constructor() { }

  Teacher: any = 'Teacher';
  Group: any = 'Group';
  Room: any = 'Room';
  topic: any = 'Topic';

  colspan = 0;

  @Input() scheduleElement: ScheduleElement;

  @HostListener('click') onClick(): void{
    console.log('User Click using Host Listener');
  }

  ngOnInit(): void {
  }
}
