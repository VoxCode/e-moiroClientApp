import { Component, OnInit } from '@angular/core';
import { SectionNumberService } from '../services/section-number.service';
import { SectionNumber } from '../models/SectionNumber';

@Component({
  selector: 'app-section-number',
  templateUrl: './section-number.component.html',
  styleUrls: ['./section-number.component.css']
})
export class SectionNumberComponent implements OnInit {
  value: SectionNumber = new SectionNumber();
  values: SectionNumber[];
  tableMode = true;

  constructor(private valueService: SectionNumberService) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.loadValue();
  }
  // tslint:disable-next-line:typedef
  loadValue() {
    this.valueService.getValues()
      .subscribe((data: SectionNumber[]) => this.values = data);
  }
  // tslint:disable-next-line:typedef
  save() {
    if (this.value.id == null) {
      this.valueService.createValue(this.value)
        .subscribe((data: SectionNumber) => this.values.push(data));
    } else {
      this.valueService.updateValue(this.value)
        .subscribe(data => this.loadValue());
    }
    this.cancel();
  }
  // tslint:disable-next-line:typedef
  editValue(p: SectionNumber) {
    this.value = p;
  }
  // tslint:disable-next-line:typedef
  cancel() {
    this.value = new SectionNumber();
    this.tableMode = true;
  }
  // tslint:disable-next-line:typedef
  delete(p: SectionNumber) {
    this.valueService.deleteValue(p.id)
      .subscribe(data => this.loadValue());
  }
  // tslint:disable-next-line:typedef
  add() {
    this.cancel();
    this.tableMode = false;
  }
}
