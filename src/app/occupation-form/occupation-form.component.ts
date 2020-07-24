import { Component, OnInit } from '@angular/core';
import { OccupationFormService } from '../services/occupation-form.service';
import { OccupationForm } from '../models/OccupationForm';

@Component({
  selector: 'app-occupation-form',
  templateUrl: './occupation-form.component.html',
  styleUrls: ['./occupation-form.component.scss'],
  providers: [OccupationFormService]
})
export class OccupationFormComponent implements OnInit {
  value: OccupationForm = new OccupationForm();
  values: OccupationForm[];
  tableMode = true;

  constructor(private valueService: OccupationFormService) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.loadValue();
  }
  // tslint:disable-next-line:typedef
  loadValue() {
    this.valueService.getValues()
      .subscribe((data: OccupationForm[]) => this.values = data);
  }
  // tslint:disable-next-line:typedef
  save() {
    if (this.value.id == null) {
      this.valueService.createValue(this.value)
        .subscribe((data: OccupationForm) => this.values.push(data));
    } else {
      this.valueService.updateValue(this.value)
        .subscribe(data => this.loadValue());
    }
    this.cancel();
  }
  // tslint:disable-next-line:typedef
  editValue(p: OccupationForm) {
    this.value = p;
  }
  // tslint:disable-next-line:typedef
  cancel() {
    this.value = new OccupationForm();
    this.tableMode = true;
  }
  // tslint:disable-next-line:typedef
  delete(p: OccupationForm) {
    this.valueService.deleteValue(p.id)
      .subscribe(data => this.loadValue());
  }
  // tslint:disable-next-line:typedef
  add() {
    this.cancel();
    this.tableMode = false;
  }
}
