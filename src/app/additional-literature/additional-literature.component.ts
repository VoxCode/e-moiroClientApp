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
  additionalLiterature: AdditionalLiterature = new AdditionalLiterature();
  additionalLiteratures: AdditionalLiterature[];
  tableMode = true;

  constructor(private additionalLiteratureService: AdditionalLiteratureService) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.loadAdditionalLiterature();
  }
  // tslint:disable-next-line:typedef
  loadAdditionalLiterature() {
    this.additionalLiteratureService.getValues()
      .subscribe((data: AdditionalLiterature[]) => this.additionalLiteratures = data);
  }
  // tslint:disable-next-line:typedef
  save() {
    if (this.additionalLiterature.id == null) {
      this.additionalLiteratureService.createValue(this.additionalLiterature)
        .subscribe((data: AdditionalLiterature) => this.additionalLiteratures.push(data));
    } else {
      this.additionalLiteratureService.updateValue(this.additionalLiterature)
        .subscribe(data => this.loadAdditionalLiterature());
    }
    this.cancel();
  }
  // tslint:disable-next-line:typedef
  editAdditionalLiterature(p: AdditionalLiterature) {
    this.additionalLiterature = p;
  }
  // tslint:disable-next-line:typedef
  cancel() {
    this.additionalLiterature = new AdditionalLiterature();
    this.tableMode = true;
  }
  // tslint:disable-next-line:typedef
  delete(p: AdditionalLiterature) {
    this.additionalLiteratureService.deleteValue(p.id)
      .subscribe(data => this.loadAdditionalLiterature());
  }
  // tslint:disable-next-line:typedef
  add() {
    this.cancel();
    this.tableMode = false;
  }
}
