import { Component, OnInit } from '@angular/core';
import {StaticData} from "../../../static-data/static-data";

@Component({
  selector: 'app-training-program-main-step-curriculum-type-form',
  templateUrl: './training-program-main-step-curriculum-type-form.component.html',
  styleUrls: ['./training-program-main-step-curriculum-type-form.component.scss'],
  providers:[StaticData]
})
export class TrainingProgramMainStepCurriculumTypeFormComponent implements OnInit {

  constructor(public staticData: StaticData) { }

  ngOnInit(): void {
  }

}
