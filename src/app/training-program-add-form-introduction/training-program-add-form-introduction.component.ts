import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TrainingProgram} from '../models/TrainingProgram';
import {Globals} from '../globals';
import {TrainingProgramService} from '../services/training-program.service';

@Component({
  selector: 'app-training-program-add-form-introduction',
  templateUrl: './training-program-add-form-introduction.component.html',
  styleUrls: ['./training-program-add-form-introduction.component.scss'],
  providers: [
    TrainingProgramService,
    ]
})
export class TrainingProgramAddFormIntroductionComponent implements OnInit {
  id: number;
  trainingProgram: TrainingProgram;

  constructor(
    public globals: Globals,
    private trainingProgramService: TrainingProgramService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
  }

  // LOAD

  // tslint:disable-next-line:typedef
  loadTrainingProgram() {
    this.trainingProgramService.getValue(this.id)
      .subscribe((data: TrainingProgram) => {
        if (data !== undefined){
          this.trainingProgram = data;
        }
      });
  }
}
