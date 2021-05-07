import {Component, Input, OnInit} from '@angular/core';
import {OccupationForm} from '../../../models/OccupationForm';

@Component({
  selector: 'app-occupation-form-class-hour-child',
  templateUrl: './occupation-form-class-hour-child.component.html',
  styleUrls: ['./occupation-form-class-hour-child.component.scss']
})
export class OccupationFormClassHourChildComponent implements OnInit {
  @Input() occupationForms: OccupationForm[];
  @Input() curriculumTopicTrainingProgramId: number;

  constructor() { }

  ngOnInit(): void {
  }

  loadOccupationFormClassHours(): void {

  }

}
