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
      if (occupationFormClassHours.length !== 0) {
        this.occupationFormClassHours = occupationFormClassHours;
      }
    });
  }

  crateOccupationFormClassHours(occupationFormClassHour: OccupationFormClassHour, index): void {
    if (occupationFormClassHour.curriculumTopicTrainingProgramId) {
      this.updateOccupationFormClassHours(occupationFormClassHour);
      return;
    }
    occupationFormClassHour.curriculumTopicTrainingProgramId = this.curriculumTopicTrainingProgramId;
    occupationFormClassHour.serialNumber = ++index;
    this.occupationFormClassHourService.createValue(occupationFormClassHour)
      .subscribe(() => {
        console.log('Create was successful');
      });
  }

  updateOccupationFormClassHours(occupationFormClassHour: OccupationFormClassHour): void {
    this.occupationFormClassHourService.updateValue(occupationFormClassHour)
      .subscribe(() => {
        console.log('Update was successful');
      });
  }

  deleteOccupationFormClassHours(occupationFormClassHour: OccupationFormClassHour, index): void {
    if (!occupationFormClassHour.curriculumTopicTrainingProgramId) {
      this.occupationFormClassHours.splice(index, 1);
      return;
    }
    this.occupationFormClassHourService.deleteValue(occupationFormClassHour)
      .subscribe(() => {
        this.occupationFormClassHours.splice(index, 1);
      });
  }

  addOccupationFormClassHours(): void {
    this.occupationFormClassHours.push(new OccupationFormClassHour());

  }
}
