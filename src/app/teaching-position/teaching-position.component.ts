import { Component, OnInit } from '@angular/core';
import { TeachingPositionService } from '../services/teaching-position.service';
import { TeachingPosition } from '../models/TeachingPosition';

@Component({
  selector: 'app-teaching-position',
  templateUrl: './teaching-position.component.html',
  styleUrls: ['./teaching-position.component.scss'],
  providers: [TeachingPositionService]
})
export class TeachingPositionComponent implements OnInit {
  value: TeachingPosition = new TeachingPosition();
  values: TeachingPosition[];
  tableMode = true;

  constructor(private valueService: TeachingPositionService) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.loadValue();
  }
  // tslint:disable-next-line:typedef
  loadValue() {
    this.valueService.getValues()
      .subscribe((data: TeachingPosition[]) => this.values = data);
  }
  // tslint:disable-next-line:typedef
  save() {
    if (this.value.id == null) {
      this.valueService.createValue(this.value)
        .subscribe((data: TeachingPosition) => this.values.push(data));
    } else {
      this.valueService.updateValue(this.value)
        .subscribe(data => this.loadValue());
    }
    this.cancel();
  }
  // tslint:disable-next-line:typedef
  editValue(p: TeachingPosition) {
    this.value = p;
  }
  // tslint:disable-next-line:typedef
  cancel() {
    this.value = new TeachingPosition();
    this.tableMode = true;
  }
  // tslint:disable-next-line:typedef
  delete(p: TeachingPosition) {
    this.valueService.deleteValue(p.id)
      .subscribe(data => this.loadValue());
  }
  // tslint:disable-next-line:typedef
  add() {
    this.cancel();
    this.tableMode = false;
  }
}
