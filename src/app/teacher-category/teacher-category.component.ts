import { Component, OnInit } from '@angular/core';
import { TeacherCategoryService } from '../services/teacher-category.service';
import { TeacherCategory } from '../models/TeacherCategory';

@Component({
  selector: 'app-teacher-category',
  templateUrl: './teacher-category.component.html',
  styleUrls: ['./teacher-category.component.css'],
  providers: [TeacherCategoryService]
})
export class TeacherCategoryComponent implements OnInit {
  value: TeacherCategory = new TeacherCategory();
  values: TeacherCategory[];
  tableMode = true;

  constructor(private valueService: TeacherCategoryService) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.loadValue();
  }
  // tslint:disable-next-line:typedef
  loadValue() {
    this.valueService.getValues()
      .subscribe((data: TeacherCategory[]) => this.values = data);
  }
  // tslint:disable-next-line:typedef
  save() {
    if (this.value.id == null) {
      this.valueService.createValue(this.value)
        .subscribe((data: TeacherCategory) => this.values.push(data));
    } else {
      this.valueService.updateValue(this.value)
        .subscribe(data => this.loadValue());
    }
    this.cancel();
  }
  // tslint:disable-next-line:typedef
  editValue(p: TeacherCategory) {
    this.value = p;
  }
  // tslint:disable-next-line:typedef
  cancel() {
    this.value = new TeacherCategory();
    this.tableMode = true;
  }
  // tslint:disable-next-line:typedef
  delete(p: TeacherCategory) {
    this.valueService.deleteValue(p.id)
      .subscribe(data => this.loadValue());
  }
  // tslint:disable-next-line:typedef
  add() {
    this.cancel();
    this.tableMode = false;
  }
}
