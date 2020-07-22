import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../services/teacher.service';
import { Teacher } from '../models/Teacher';
import {TeachingPosition} from '../models/TeachingPosition';
import {TeachingPositionService} from '../services/teaching-position.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css'],
  providers: [TeacherService, TeachingPositionService]
})
export class TeacherComponent implements OnInit {
  value: Teacher = new Teacher();
  values: Teacher[];
  tvalues: TeachingPosition[];
  tableMode = true;
  selectedValue: string;

  constructor(private valueService: TeacherService, private tvalueService: TeachingPositionService) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.loadValue();
    this.loadTValue();
  }
  // tslint:disable-next-line:typedef
  loadTValue(){
    this.tvalueService.getValues()
      .subscribe((data: Teacher[]) => this.tvalues = data);
  }
  // tslint:disable-next-line:typedef
  loadValue() {
    this.valueService.getValues()
      .subscribe((data: Teacher[]) => this.values = data);
  }
  // tslint:disable-next-line:typedef
  save() {
    if (this.value.id == null) {
      this.valueService.createValue(this.value)
        .subscribe((data: Teacher) => this.values.push(data));
    } else {
      this.valueService.updateValue(this.value)
        .subscribe(data => this.loadValue());
    }
    this.cancel();
  }
  // tslint:disable-next-line:typedef
  editValue(p: Teacher) {
    this.value = p;
  }
  // tslint:disable-next-line:typedef
  cancel() {
    this.value = new Teacher();
    this.tableMode = true;
  }
  // tslint:disable-next-line:typedef
  delete(p: Teacher) {
    this.valueService.deleteValue(p.id)
      .subscribe(data => this.loadValue());
  }
  // tslint:disable-next-line:typedef
  add() {
    this.cancel();
    this.tableMode = false;
  }
}
