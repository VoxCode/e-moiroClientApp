import {Component, Input, OnInit} from '@angular/core';
import {Globals} from '../../globals';

@Component({
  selector: 'app-training-program-stepper',
  templateUrl: './training-program-stepper.component.html',
  styleUrls: ['./training-program-stepper.component.scss']
})
export class TrainingProgramStepperComponent implements OnInit {
  @Input() id: number;
  @Input() isDistanceLearning = false;

  constructor(public globals: Globals) { }

  ngOnInit(): void {
  }

}
