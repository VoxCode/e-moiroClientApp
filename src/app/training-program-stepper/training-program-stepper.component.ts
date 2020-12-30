import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-training-program-stepper',
  templateUrl: './training-program-stepper.component.html',
  styleUrls: ['./training-program-stepper.component.scss']
})
export class TrainingProgramStepperComponent implements OnInit {
  @Input() id: number;

  constructor() { }

  ngOnInit(): void {
  }

}
