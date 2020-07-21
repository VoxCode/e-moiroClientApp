import { Component, OnInit } from '@angular/core';
import { TrainingProgramService } from '../services/training-program.service';
import { TrainingProgram } from '../models/TrainingProgram';

@Component({
  selector: 'app-training-program',
  templateUrl: './training-program.component.html',
  styleUrls: ['./training-program.component.css'],
  providers: [TrainingProgramService]
})
export class TrainingProgramComponent implements OnInit {
  value: TrainingProgram = new TrainingProgram();
  values: TrainingProgram[];
  tableMode = true;

  constructor(private valueService: TrainingProgramService) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.loadValue();
  }
  // tslint:disable-next-line:typedef
  loadValue() {
    this.valueService.getValues()
      .subscribe((data: TrainingProgram[]) => this.values = data);
  }
  // tslint:disable-next-line:typedef
  save() {
    if (this.value.id == null) {
      this.valueService.createValue(this.value)
        .subscribe((data: TrainingProgram) => this.values.push(data));
    } else {
      this.valueService.updateValue(this.value)
        .subscribe(data => this.loadValue());
    }
    this.cancel();
  }
  // tslint:disable-next-line:typedef
  editValue(p: TrainingProgram) {
    this.value = p;
  }
  // tslint:disable-next-line:typedef
  cancel() {
    this.value = new TrainingProgram();
    this.tableMode = true;
  }
  // tslint:disable-next-line:typedef
  delete(p: TrainingProgram) {
    this.valueService.deleteValue(p.id)
      .subscribe(data => this.loadValue());
  }
  // tslint:disable-next-line:typedef
  add() {
    this.cancel();
    this.tableMode = false;
  }
}
