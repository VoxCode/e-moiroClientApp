import { Component, OnInit } from '@angular/core';
import { MainLiteratureService } from '../services/main-literature.service';
import { MainLiterature } from '../models/MainLiterature';

@Component({
  selector: 'app-main-literature',
  templateUrl: './main-literature.component.html',
  styleUrls: ['./main-literature.component.css']
})
export class MainLiteratureComponent implements OnInit {
  value: MainLiterature = new MainLiterature();
  values: MainLiterature[];
  tableMode = true;

  constructor(private valueService: MainLiteratureService) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.loadValue();
  }
  // tslint:disable-next-line:typedef
  loadValue() {
    this.valueService.getValues()
      .subscribe((data: MainLiterature[]) => this.values = data);
  }
  // tslint:disable-next-line:typedef
  save() {
    if (this.value.id == null) {
      this.valueService.createValue(this.value)
        .subscribe((data: MainLiterature) => this.values.push(data));
    } else {
      this.valueService.updateValue(this.value)
        .subscribe(data => this.loadValue());
    }
    this.cancel();
  }
  // tslint:disable-next-line:typedef
  editValue(p: MainLiterature) {
    this.value = p;
  }
  // tslint:disable-next-line:typedef
  cancel() {
    this.value = new MainLiterature();
    this.tableMode = true;
  }
  // tslint:disable-next-line:typedef
  delete(p: MainLiterature) {
    this.valueService.deleteValue(p.id)
      .subscribe(data => this.loadValue());
  }
  // tslint:disable-next-line:typedef
  add() {
    this.cancel();
    this.tableMode = false;
  }
}
