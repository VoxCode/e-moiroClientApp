import {Component, Input, OnInit} from '@angular/core';
import {OccupationForm} from '../../../models/OccupationForm';
import {OccupationFormClassHourService} from '../../../services/occupation-form-class-hour.service';
import {OccupationFormClassHour} from '../../../models/OccupationFormClassHour';
import {MDBModalRef, MDBModalService} from 'angular-bootstrap-md';
import {OccupationFormClassTimeEditFormComponent} from './occupation-form-class-time-edit-form.component';

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
  occupationFormClassHours: OccupationFormClassHour[] = [];
  modalRef: MDBModalRef;
  plurals = {
    result: {
      '=1': 'час',
      '=2': 'часа',
      '=3': 'часа',
      '=4': 'часа',
      other: '# часов'
    },
  };

  constructor(
    private occupationFormClassHourService: OccupationFormClassHourService,
    private modalService: MDBModalService
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

  crateOccupationFormClassHours(occupationFormClassHour: OccupationFormClassHour): void {
    this.occupationFormClassHourService.createValue(occupationFormClassHour)
      .subscribe(() => {
        this.occupationFormClassHours.push(occupationFormClassHour);
        console.log('Create was successful');
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
        console.log('Delete was successful');
      });
  }

  addOccupationFormClassHours(): void {
    this.occupationFormClassHours.push(new OccupationFormClassHour());
  }

  occupationFormClassTimeCrateForm(): void {
    this.modalRef = this.modalService.show(OccupationFormClassTimeEditFormComponent, this.modalOption(this.emptyEl()));
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      const occupationFormClassHour = new OccupationFormClassHour();
      occupationFormClassHour.occupationFormId = +newElement.occupationFormId;
      occupationFormClassHour.curriculumTopicTrainingProgramId = this.curriculumTopicTrainingProgramId;
      occupationFormClassHour.classHours = newElement.classHours;
      occupationFormClassHour.fullName = newElement.fullName;
      if (this.occupationFormClassHours.length === 0) {
        occupationFormClassHour.serialNumber = this.occupationFormClassHours.length + 1;
      }
      else {
        occupationFormClassHour.serialNumber = this.occupationFormClassHours[this.occupationFormClassHours.length - 1].classHours + 1;
      }
      this.crateOccupationFormClassHours(occupationFormClassHour);
    });
  }

  emptyEl(): any {
    return {occupationFormId: '', classHours: 0, fullName: ''};
  }

  modalOption(el: any): any {
    return {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: true,
      class: 'modal-fluid',
      containerClass: '',
      animated: true,
      data: {
        editableRow: el
      }
    };
  }
}
