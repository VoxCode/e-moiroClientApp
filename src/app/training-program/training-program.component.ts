import { Component, OnInit } from '@angular/core';
import { TrainingProgramService } from '../services/training-program.service';
import { TrainingProgram } from '../models/TrainingProgram';

@Component({
  selector: 'app-training-program',
  templateUrl: './training-program.component.html',
  styleUrls: ['./training-program.component.css']
})
export class TrainingProgramComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
