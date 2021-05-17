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
          this.occupationForms[tmpIndex].maxVariableTopicHours = obj.maxVariableTopicHours;
        });
        console.log(maxVariableTopicTimeList);
      });
  }

  crateMaxVariableTopicHours(occupationForm: OccupationForm): void {
    console.log(occupationForm);
    // maxVariableTopicTime.maxVariableTopicHours = occupationForm.maxVariableTopicHours;
    // maxVariableTopicTime.occupationFormId = occupationForm.id;
    // maxVariableTopicTime.trainingProgramCurriculumSectionId = this.trainingProgramCurriculumSectionId;
    // this.maxVariableTopicTimeService.createValue(maxVariableTopicTime).subscribe(() => {
    //   console.log('Crate was successful!');
    //
    // });
  }
}
