import { Component, OnInit } from '@angular/core';
import { ConsultationTopicService } from '../services/consultation-topic.service';
import { ConsultationTopic } from '../models/ConsultationTopic';

@Component({
  selector: 'app-consultation-topic',
  templateUrl: './consultation-topic.component.html',
  styleUrls: ['./consultation-topic.component.css'],
  providers: [ConsultationTopicService]
})
export class ConsultationTopicComponent implements OnInit {
  value: ConsultationTopic = new ConsultationTopic();
  values: ConsultationTopic[];
  tableMode = true;

  constructor(private valueService: ConsultationTopicService) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.loadValue();
  }
  // tslint:disable-next-line:typedef
  loadValue() {
    this.valueService.getValues()
      .subscribe((data: ConsultationTopic[]) => this.values = data);
  }
  // tslint:disable-next-line:typedef
  save() {
    if (this.value.id == null) {
      this.valueService.createValue(this.value)
        .subscribe((data: ConsultationTopic) => this.values.push(data));
    } else {
      this.valueService.updateValue(this.value)
        .subscribe(data => this.loadValue());
    }
    this.cancel();
  }
  // tslint:disable-next-line:typedef
  editValue(p: ConsultationTopic) {
    this.value = p;
  }
  // tslint:disable-next-line:typedef
  cancel() {
    this.value = new ConsultationTopic();
    this.tableMode = true;
  }
  // tslint:disable-next-line:typedef
  delete(p: ConsultationTopic) {
    this.valueService.deleteValue(p.id)
      .subscribe(data => this.loadValue());
  }
  // tslint:disable-next-line:typedef
  add() {
    this.cancel();
    this.tableMode = false;
  }
}
