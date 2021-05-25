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
  public maxVariableTopicTimes: MaxVariableTopicTime[] = [];

  constructor(private maxVariableTopicTimeService: MaxVariableTopicTimeService) { }

  ngOnInit(): void {
    this.occupationForms.forEach((obj) => {
      const maxVariableTopicTime = new MaxVariableTopicTime();
      maxVariableTopicTime.maxVariableTopicHours = 0;
      maxVariableTopicTime.occupationFormId = obj.id;
      maxVariableTopicTime.fullName = obj.fullName;
      this.maxVariableTopicTimes.push(maxVariableTopicTime);
    });
    this.loadMaxVariableTopicHours();
  }

  loadMaxVariableTopicHours(): void {
    if (!this.trainingProgramCurriculumSectionId) { return; }
    this.maxVariableTopicTimeService.getValues(this.trainingProgramCurriculumSectionId)
      .subscribe((maxVariableTopicTimeList: MaxVariableTopicTime[]) => {
        if (maxVariableTopicTimeList.length !== 0) {
          maxVariableTopicTimeList.forEach(obj => {
            const tmpIndex = this.maxVariableTopicTimes.findIndex(a => a.occupationFormId === obj.occupationFormId);
            this.maxVariableTopicTimes[tmpIndex].maxVariableTopicHours = obj.maxVariableTopicHours;
            this.maxVariableTopicTimes[tmpIndex].trainingProgramCurriculumSectionId = obj.trainingProgramCurriculumSectionId;
          });
        }
      });
  }

  crateMaxVariableTopicHours(maxVariableTopicTime: MaxVariableTopicTime): void {
    if (maxVariableTopicTime.maxVariableTopicHours === 0 && maxVariableTopicTime.trainingProgramCurriculumSectionId) {
      this.deleteMaxVariableTopicHours(maxVariableTopicTime);
      maxVariableTopicTime.trainingProgramCurriculumSectionId = undefined;
      return;
    }
    if (maxVariableTopicTime.trainingProgramCurriculumSectionId) { this.updateMaxVariableTopicHours(maxVariableTopicTime); return; }
    maxVariableTopicTime.trainingProgramCurriculumSectionId = this.trainingProgramCurriculumSectionId;
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
