import {Component, Input, OnInit} from '@angular/core';
import {OccupationForm} from '../../../models/OccupationForm';
import {OccupationFormClassHourService} from '../../../services/occupation-form-class-hour.service';
import {OccupationFormClassHour} from '../../../models/OccupationFormClassHour';

@Component({
  selector: 'app-occupation-form-class-hour-child',
  templateUrl: './occupation-form-class-hour-child.component.html',
  styleUrls: ['./occupation-form-class-hour-child.component.scss'],
  providers: [
    OccupationFormClassHourService
  ]
})
export class OccupationFormClassHourChildComponent implements OnInit {
  @Input() occupationForms: OccupationForm[];
  @Input() curriculumTopicTrainingProgramId: number;
  occupationFormClassHours: OccupationFormClassHour[] = [{}];

  constructor(
    private occupationFormClassHourService: OccupationFormClassHourService
  ) { }

  ngOnInit(): void {
    this.loadOccupationFormClassHours();
  }

  loadOccupationFormClassHours(): void {
    if (!this.curriculumTopicTrainingProgramId) { return; }
    this.occupationFormClassHourService.getValues(this.curriculumTopicTrainingProgramId)
      .subscribe((occupationFormClassHours: OccupationFormClassHour[]) => {
      console.log(occupationFormClassHours);
      if (occupationFormClassHours.length !== 0) {
        this.occupationFormClassHours = occupationFormClassHours;
      }
    });
  }

  crateOccupationFormClassHours(occupationFormClassHour: OccupationFormClassHour, index): void {

    occupationFormClassHour.curriculumTopicTrainingProgramId = this.curriculumTopicTrainingProgramId;
    occupationFormClassHour.serialNumber = ++index;
    console.log(occupationFormClassHour);
    this.occupationFormClassHourService.createValue(this.curriculumTopicTrainingProgramId, occupationFormClassHour)
      .subscribe((occupationFormClassHours: OccupationFormClassHour[]) => {
        console.log(occupationFormClassHours);
      });
  }

  addOccupationFormClassHours(): void {
    this.occupationFormClassHours.push(new OccupationFormClassHour());

  }
}
