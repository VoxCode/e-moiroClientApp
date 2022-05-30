import { Component, OnInit } from '@angular/core';
import {MDBModalRef} from 'angular-bootstrap-md';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';


@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.scss']
})
export class RoomEditComponent implements OnInit {


  public editableRow: {
    rowNumber: number,
    id: number,
    name: string, };
  public saveButtonClicked: Subject<any> = new Subject<any>();

  constructor(
    public modalRef: MDBModalRef,
  ) { }

  public form: FormGroup = new FormGroup({
    rowNumber: new FormControl({value: '', disabled: true}),      // index
    id: new FormControl({value: '', disabled: true}),   // id
    name: new FormControl('', Validators.required),      // name
  });

  get id(): AbstractControl  { return this.form.get('id'); }
  get name(): AbstractControl  { return this.form.get('name'); }

  ngOnInit(): void {
    this.form.controls.rowNumber.patchValue(this.editableRow.rowNumber);
    this.form.controls.id.patchValue(this.editableRow.id);
    this.form.controls.name.patchValue(this.editableRow.name);
  }

  saveRoom(): void {
    console.log(this.form.getRawValue());
    this.saveButtonClicked.next(this.form.getRawValue());
    this.modalRef.hide();
  }
}
