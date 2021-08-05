import { Component, OnInit } from '@angular/core';
import {MDBModalRef} from 'angular-bootstrap-md';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  constructor(
    public modalRef: MDBModalRef,
  ) { }

  public form: FormGroup = new FormGroup({
    id: new FormControl({value: '', disabled: true}),      // index
    roomId: new FormControl({value: '', disabled: true}),   // id
    roomName: new FormControl('', Validators.required),      // name
  });

  public saveButtonClicked: Subject<any> = new Subject<any>();

  get roomId(): AbstractControl  { return this.form.get('roomId'); }
  get roomName(): AbstractControl  { return this.form.get('roomName'); }

  ngOnInit(): void {
  }

  saveRoom(): void {
    this.saveButtonClicked.next(this.form.getRawValue());
    this.modalRef.hide();
  }
}
