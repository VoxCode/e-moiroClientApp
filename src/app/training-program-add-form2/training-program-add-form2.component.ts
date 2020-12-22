import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {ActivatedRoute} from '@angular/router';
import {TrainingProgram} from "../models/TrainingProgram";
import {TrainingProgramService} from "../services/training-program.service";

@Component({
  selector: 'app-training-program-add-form2',
  templateUrl: './training-program-add-form2.component.html',
  styleUrls: ['./training-program-add-form2.component.scss']
})
export class TrainingProgramAddForm2Component implements OnInit {
  todo = [];
  done = [];
  id: number;
  trainingProgram: TrainingProgram;

  constructor(
    private trainingProgramService: TrainingProgramService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
  }

  // tslint:disable-next-line:typedef
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
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
