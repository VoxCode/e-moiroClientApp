import { Component, OnInit } from '@angular/core';
import { AdditionalLiteratureService } from '../services/additional-literature.service';
import { AdditionalLiterature } from '../models/AdditionalLiterature';

@Component({
  selector: 'app-additional-literature',
  templateUrl: './additional-literature.component.html',
  styleUrls: ['./additional-literature.component.css'],
  providers: [AdditionalLiteratureService]
})
export class AdditionalLiteratureComponent implements OnInit {
  value: AdditionalLiterature = new AdditionalLiterature();
  values: AdditionalLiterature[];
  tableMode = true;

  constructor(private valueService: AdditionalLiteratureService) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.loadValue();
  }
  // tslint:disable-next-line:typedef
  loadValue() {
    this.valueService.getValues()
      .subscribe((data: AdditionalLiterature[]) => this.values = data);
  }
  // tslint:disable-next-line:typedef
  save() {
    if (this.value.id == null) {
      this.valueService.createValue(this.value)
        .subscribe((data: AdditionalLiterature) => this.values.push(data));
    } else {
      this.valueService.updateValue(this.value)
        .subscribe(data => this.loadValue());
    }
    this.cancel();
  }
  // tslint:disable-next-line:typedef
  editValue(p: AdditionalLiterature) {
    this.value = p;
  }
  // tslint:disable-next-line:typedef
  cancel() {
    this.value = new AdditionalLiterature();
    this.tableMode = true;
  }
  // tslint:disable-next-line:typedef
  delete(p: AdditionalLiterature) {
    this.valueService.deleteValue(p.id)
      .subscribe(data => this.loadValue());
  }
  // tslint:disable-next-line:typedef
  add() {
    this.cancel();
    this.tableMode = false;
  }
}
