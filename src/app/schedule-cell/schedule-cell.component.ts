import {Component, HostListener, Input, OnInit} from '@angular/core';
import {ScheduleElement} from '../schedule/schedule-element';
import {Teacher} from "../models/Teacher";

@Component({
  selector: 'app-schedule-cell',
  templateUrl: './schedule-cell.component.html',
  styleUrls: ['./schedule-cell.component.scss']
})
export class ScheduleCellComponent implements OnInit {

  constructor() { }

  formatTeacherName: any = Teacher.getName;
  colspan = 0;

  @Input() scheduleElement: ScheduleElement;

  @HostListener('click') onClick(): void{
    console.log('User Click using Host Listener');
  }

  ngOnInit(): void {
  }

  parseSubgroup(subgroup: number): string {
    switch (subgroup) {
      case 0:
        return 'Вся группа';
        break;
      case 1:
        return 'Первая подгруппа';
        break;
      case 2:
        return 'Вторая подгруппа';
        break;
      default:
        return 'default';
        break;
    }
  }
}
