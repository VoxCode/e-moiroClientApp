import { Component, OnInit } from '@angular/core';
import { CurriculumTopicService } from '../services/curriculum-topic.service';
import { CurriculumTopic } from '../models/CurriculumTopic';

@Component({
  selector: 'app-curriculum-topic',
  templateUrl: './curriculum-topic.component.html',
  styleUrls: ['./curriculum-topic.component.css']
})
export class CurriculumTopicComponent implements OnInit {
  value: CurriculumTopic = new CurriculumTopic();
  values: CurriculumTopic[];
  tableMode = true;

  constructor(private valueService: CurriculumTopicService) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.loadValue();
  }
  // tslint:disable-next-line:typedef
  loadValue() {
    this.valueService.getValues()
      .subscribe((data: CurriculumTopic[]) => this.values = data);
  }
  // tslint:disable-next-line:typedef
  save() {
    if (this.value.id == null) {
      this.valueService.createValue(this.value)
        .subscribe((data: CurriculumTopic) => this.values.push(data));
    } else {
      this.valueService.updateValue(this.value)
        .subscribe(data => this.loadValue());
    }
    this.cancel();
  }
  // tslint:disable-next-line:typedef
  editValue(p: CurriculumTopic) {
    this.value = p;
  }
  // tslint:disable-next-line:typedef
  cancel() {
    this.value = new CurriculumTopic();
    this.tableMode = true;
  }
  // tslint:disable-next-line:typedef
  delete(p: CurriculumTopic) {
    this.valueService.deleteValue(p.id)
      .subscribe(data => this.loadValue());
  }
  // tslint:disable-next-line:typedef
  add() {
    this.cancel();
    this.tableMode = false;
  }
}
