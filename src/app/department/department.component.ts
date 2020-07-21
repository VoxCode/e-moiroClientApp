import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../services/department.service';
import { Department } from '../models/Department';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
  providers: [DepartmentService]
})
export class DepartmentComponent implements OnInit {
  value: Department = new Department();
  values: Department[];
  tableMode = true;

  constructor(private valueService: DepartmentService) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.loadValue();
  }
  // tslint:disable-next-line:typedef
  loadValue() {
    this.valueService.getValues()
      .subscribe((data: Department[]) => this.values = data);
  }
  // tslint:disable-next-line:typedef
  save() {
    if (this.value.id == null) {
      this.valueService.createValue(this.value)
        .subscribe((data: Department) => this.values.push(data));
    } else {
      this.valueService.updateValue(this.value)
        .subscribe(data => this.loadValue());
    }
    this.cancel();
  }
  // tslint:disable-next-line:typedef
  editValue(p: Department) {
    this.value = p;
  }
  // tslint:disable-next-line:typedef
  cancel() {
    this.value = new Department();
    this.tableMode = true;
  }
  // tslint:disable-next-line:typedef
  delete(p: Department) {
    this.valueService.deleteValue(p.id)
      .subscribe(data => this.loadValue());
  }
  // tslint:disable-next-line:typedef
  add() {
    this.cancel();
    this.tableMode = false;
  }
}
