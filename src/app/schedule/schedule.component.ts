import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {AgendaService, DayService, MonthService, WeekService, WorkWeekService} from '@syncfusion/ej2-angular-schedule';
import {ClassRoom} from '../models/schedule-models/ClassRoom';
import {scheduleData} from '../syncfusion-room-scheduler/data';
import {StudentCategoryEditComponent} from '../student-category/student-category-edit.component';
import {MDBModalRef, MDBModalService} from 'angular-bootstrap-md';
import {Subject} from 'rxjs';
import {RoomComponent} from '../room/room.component';
import {StudentCategory} from '../models/StudentCategory';
import {ClassRoomService} from '../services/schedule-services/class-room.service';


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, ClassRoomService]
})
export class ScheduleComponent implements OnInit {

  roomData: any[];
  scheduleData: any[];
  public modalRef: MDBModalRef;

  public room: {
    roomId: string,
    roomName: string,
  };

  public saveButtonClicked: Subject<any> = new Subject<any>();

  constructor(
    private modalService: MDBModalService,
    private classRoomService: ClassRoomService,
  ) { }

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


  addRoom(): void {
    this.modalRef = this.modalService.show(RoomComponent, this.modalOption(this.emptyEl()));
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      console.log(newElement);
      this.roomData.push({text: newElement.roomName, id: 5, color: '#543434'});
      console.log(this.roomData);
      this.createRoom(newElement);
    });
  }

  createRoom(el: any): void{
    const room = new ClassRoom();// +el.roomId, el.roomName
    room.id = 0;
    room.name = '123';
    console.log(room);
    this.classRoomService.createValue(room)
      .subscribe((roomResponse: ClassRoom) => {
        // this.roomData.push({text: roomResponse.name, id: roomResponse.id, color: '#543434'});
        // console.log(roomResponse);
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
        editableRow: el
      }
    };
  }
}
