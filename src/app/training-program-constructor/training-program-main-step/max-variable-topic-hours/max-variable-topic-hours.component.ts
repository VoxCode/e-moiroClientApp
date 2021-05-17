import {Component, Input, OnInit} from '@angular/core';
import {OccupationForm} from '../../../models/OccupationForm';
import {MaxVariableTopicTimeService} from '../../../services/max-variable-topic-time.service';
import {MaxVariableTopicTime} from '../../../models/MaxVariableTopicTime';

@Component({
  selector: 'app-max-variable-topic-hours',
  templateUrl: './max-variable-topic-hours.component.html',
  styleUrls: ['./max-variable-topic-hours.component.scss'],
  providers: [MaxVariableTopicTimeService]
})
export class MaxVariableTopicHoursComponent implements OnInit {
  @Input() occupationForms: OccupationForm[];
  @Input() trainingProgramCurriculumSectionId: number;

  constructor(private maxVariableTopicTimeService: MaxVariableTopicTimeService) { }

  ngOnInit(): void {
    this.loadMaxVariableTopicHours();
  }

  loadMaxVariableTopicHours(): void {
    if (!this.trainingProgramCurriculumSectionId) { return; }
    this.maxVariableTopicTimeService.getValues(this.trainingProgramCurriculumSectionId)
      .subscribe((maxVariableTopicTimeList: MaxVariableTopicTime[]) => {
        maxVariableTopicTimeList.forEach(obj => {
          const tmpIndex = this.occupationForms.findIndex(a => a.id === obj.occupationFormId);
          this.occupationForms[tmpIndex].occupationFormId = obj.occupationFormId;
          this.occupationForms[tmpIndex].trainingProgramCurriculumSectionId = obj.trainingProgramCurriculumSectionId;
          this.occupationForms[tmpIndex].maxVariableTopicHours = obj.maxVariableTopicHours;
        });
      });
  }

  crateMaxVariableTopicHours(occupationForm: OccupationForm): void {
    const maxVariableTopicTime = new MaxVariableTopicTime(
      occupationForm.id,
      this.trainingProgramCurriculumSectionId,
      occupationForm.maxVariableTopicHours);
    if (occupationForm.maxVariableTopicHours === 0 && occupationForm.trainingProgramCurriculumSectionId) {
      this.deleteMaxVariableTopicHours(maxVariableTopicTime);
      return;
    }
    if (occupationForm.trainingProgramCurriculumSectionId) { this.updateMaxVariableTopicHours(maxVariableTopicTime); return; }
    this.maxVariableTopicTimeService.createValue(maxVariableTopicTime).subscribe(() => {
      console.log('Crate was successful!');
    });
  }

  updateMaxVariableTopicHours(maxVariableTopicTime: MaxVariableTopicTime): void {
    this.maxVariableTopicTimeService.updateValue(maxVariableTopicTime).subscribe(() => {
      console.log('Update was successful!');
    });
  }

  deleteMaxVariableTopicHours(maxVariableTopicTime: MaxVariableTopicTime): void {
    this.maxVariableTopicTimeService.deleteValue(maxVariableTopicTime).subscribe(() => {
      console.log('Delete was successful!');
    });
  }
}
