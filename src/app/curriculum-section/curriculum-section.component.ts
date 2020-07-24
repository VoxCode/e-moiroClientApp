import { Component, OnInit } from '@angular/core';
import { CurriculumSectionService } from '../services/curriculum-section.service';
import { CurriculumSection } from '../models/CurriculumSection';

@Component({
  selector: 'app-curriculum-section',
  templateUrl: './curriculum-section.component.html',
  styleUrls: ['./curriculum-section.component.scss'],
  providers: [CurriculumSectionService]
})
export class CurriculumSectionComponent implements OnInit {
  value: CurriculumSection = new CurriculumSection();
  values: CurriculumSection[];
  tableMode = true;

  constructor(private valueService: CurriculumSectionService) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.loadValue();
  }
  // tslint:disable-next-line:typedef
  loadValue() {
    this.valueService.getValues()
      .subscribe((data: CurriculumSection[]) => this.values = data);
  }
  // tslint:disable-next-line:typedef
  save() {
    if (this.value.id == null) {
      this.valueService.createValue(this.value)
        .subscribe((data: CurriculumSection) => this.values.push(data));
    } else {
      this.valueService.updateValue(this.value)
        .subscribe(data => this.loadValue());
    }
    this.cancel();
  }
  // tslint:disable-next-line:typedef
  editValue(p: CurriculumSection) {
    this.value = p;
  }
  // tslint:disable-next-line:typedef
  cancel() {
    this.value = new CurriculumSection();
    this.tableMode = true;
  }
  // tslint:disable-next-line:typedef
  delete(p: CurriculumSection) {
    this.valueService.deleteValue(p.id)
      .subscribe(data => this.loadValue());
  }
  // tslint:disable-next-line:typedef
  add() {
    this.cancel();
    this.tableMode = false;
  }
}
