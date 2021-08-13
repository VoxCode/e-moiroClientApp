import {Component, OnInit} from '@angular/core';
import {AgendaService, DayService, MonthService, WeekService, WorkWeekService} from '@syncfusion/ej2-angular-schedule';
import {ClassRoom} from '../models/schedule-models/ClassRoom';
import {MDBModalRef, MDBModalService} from 'angular-bootstrap-md';
import {Subject} from 'rxjs';
import {RoomComponent} from '../room/room.component';
import {ClassRoomService} from '../services/schedule-services/class-room.service';


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, ClassRoomService]
})
export class ScheduleComponent implements OnInit {

  roomData: any[] = [];
  scheduleData: any[] = [];
  public modalRef: MDBModalRef;

  public saveButtonClicked: Subject<any> = new Subject<any>();

  constructor(
    private modalService: MDBModalService,
    private classRoomService: ClassRoomService,
  ) { }

  ngOnInit(): void {
    this.loadRooms();
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

  loadRooms(): void{
    this.classRoomService.getValues()
      .subscribe((data: ClassRoom[]) => {
        data.forEach((el, index) => {
          this.roomData.push({
            text: el.name, id: index + 1, color: `#${index}1${index}1${index}1`
          });
        });
    });
  }

  addRoom(): void {
    this.modalRef = this.modalService.show(RoomComponent, this.modalOption(this.roomData));
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      this.roomData.push({text: newElement.roomName, id: 5, color: '#543434'});
      this.roomData = this.roomData.map(num => num);
      // this.createRoom(newElement);
    });
  }

  createRoom(el: any): void{
    const room = new ClassRoom(+el.roomId, el.roomName);
    this.classRoomService.createValue(room)
      .subscribe((roomResponse: ClassRoom) => {
        this.roomData.push({text: roomResponse.name, id: roomResponse.id, color: '#543434'});
      });
  }

  load



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
      class: 'modal-dialog',
      containerClass: '',
      animated: true,
      data: {
        editableRow: el
      }
    };
  }
}
