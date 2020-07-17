import { Component, OnInit } from '@angular/core';
import { FormOfEducationService } from '../services/form-of-education.service';
import { FormOfEducation } from '../models/FormOfEducation';

@Component({
  selector: 'app-form-of-education',
  templateUrl: './form-of-education.component.html',
  styleUrls: ['./form-of-education.component.css']
})
export class FormOfEducationComponent implements OnInit {
  value: FormOfEducation = new FormOfEducation();
  values: FormOfEducation[];
  tableMode = true;

  constructor(private valueService: FormOfEducationService) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.loadValue();
  }
  // tslint:disable-next-line:typedef
  loadValue() {
    this.valueService.getValues()
      .subscribe((data: FormOfEducation[]) => this.values = data);
  }
  // tslint:disable-next-line:typedef
  save() {
    if (this.value.id == null) {
      this.valueService.createValue(this.value)
        .subscribe((data: FormOfEducation) => this.values.push(data));
    } else {
      this.valueService.updateValue(this.value)
        .subscribe(data => this.loadValue());
    }
    this.cancel();
  }
  // tslint:disable-next-line:typedef
  editValue(p: FormOfEducation) {
    this.value = p;
  }
  // tslint:disable-next-line:typedef
  cancel() {
    this.value = new FormOfEducation();
    this.tableMode = true;
  }
  // tslint:disable-next-line:typedef
  delete(p: FormOfEducation) {
    this.valueService.deleteValue(p.id)
      .subscribe(data => this.loadValue());
  }
  // tslint:disable-next-line:typedef
  add() {
    this.cancel();
    this.tableMode = false;
  }
}
