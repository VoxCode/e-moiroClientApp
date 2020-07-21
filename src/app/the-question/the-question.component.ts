import { Component, OnInit } from '@angular/core';
import { TheQuestionService } from '../services/the-question.service';
import { TheQuestion } from '../models/TheQuestion';

@Component({
  selector: 'app-the-question',
  templateUrl: './the-question.component.html',
  styleUrls: ['./the-question.component.css'],
  providers: [TheQuestionService]
})
export class TheQuestionComponent implements OnInit {
  value: TheQuestion = new TheQuestion();
  values: TheQuestion[];
  tableMode = true;

  constructor(private valueService: TheQuestionService) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.loadValue();
  }
  // tslint:disable-next-line:typedef
  loadValue() {
    this.valueService.getValues()
      .subscribe((data: TheQuestion[]) => this.values = data);
  }
  // tslint:disable-next-line:typedef
  save() {
    if (this.value.id == null) {
      this.valueService.createValue(this.value)
        .subscribe((data: TheQuestion) => this.values.push(data));
    } else {
      this.valueService.updateValue(this.value)
        .subscribe(data => this.loadValue());
    }
    this.cancel();
  }
  // tslint:disable-next-line:typedef
  editValue(p: TheQuestion) {
    this.value = p;
  }
  // tslint:disable-next-line:typedef
  cancel() {
    this.value = new TheQuestion();
    this.tableMode = true;
  }
  // tslint:disable-next-line:typedef
  delete(p: TheQuestion) {
    this.valueService.deleteValue(p.id)
      .subscribe(data => this.loadValue());
  }
  // tslint:disable-next-line:typedef
  add() {
    this.cancel();
    this.tableMode = false;
  }
}
