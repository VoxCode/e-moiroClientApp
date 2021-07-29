import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {MDBModalRef} from 'angular-bootstrap-md';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './is-delete.component.html',
  styleUrls: ['../styles/modal-form-style.scss']
})
export class IsDeleteComponent implements OnInit{

  public editableRow: { heading: string };
  public saveButtonClicked: Subject<any> = new Subject<any>();

  constructor(public modalRef: MDBModalRef) { }

  ngOnInit(): void {
  }

  delete(): void {
    this.saveButtonClicked.next(true);
    this.modalRef.hide();
  }

  cancel(): void {
    this.saveButtonClicked.next(false);
    this.modalRef.hide();
  }
}
