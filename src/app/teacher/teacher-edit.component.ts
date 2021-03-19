import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {MDBModalRef} from 'angular-bootstrap-md';
import {TeachingPositionService} from '../services/teaching-position.service';
import {TeachingPosition} from '../models/TeachingPosition';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './teacher-edit.component.html',
  styleUrls: ['./teacher.component.scss'],
  providers: [TeachingPositionService]
})
export class TeacherEditComponent {
  teachingPositions: TeachingPosition[];
  public editableRow: { id: string, first: string, second: string, third: string, fourth: string, last: string, handle: string };
  public saveButtonClicked: Subject<any> = new Subject<any>();

  public form: FormGroup = new FormGroup({
    id: new FormControl({value: '', disabled: true}),
    first: new FormControl({value: '', disabled: true}),
    second: new FormControl(''),
    third: new FormControl(''),
    last: new FormControl('', Validators.required)
  });

  constructor(public modalRef: MDBModalRef, private teachingPositionService: TeachingPositionService) { }

  // tslint:disable-next-line:typedef use-lifecycle-interface
  ngOnInit() {
    this.form.controls.id.patchValue(this.editableRow.id);
    this.form.controls.first.patchValue(this.editableRow.first);
    this.form.controls.second.patchValue(this.editableRow.second);
    this.form.controls.third.patchValue(this.editableRow.third);
    this.form.controls.last.patchValue(this.editableRow.last);
  }

  // tslint:disable-next-line:typedef
  editRow() {
    this.editableRow = this.form.getRawValue();
    this.editableRow.fourth = this.teachingPositions.find(p => p.id === +this.editableRow.second).name;
    this.saveButtonClicked.next(this.editableRow);
    this.modalRef.hide();
  }

  // tslint:disable-next-line:typedef
  get first() { return this.form.get('first'); }
  // tslint:disable-next-line:typedef
  get second() { return this.form.get('second'); }
  // tslint:disable-next-line:typedef
  get third() { return this.form.get('third'); }
  // tslint:disable-next-line:typedef
  get last() { return this.form.get('last'); }
}
