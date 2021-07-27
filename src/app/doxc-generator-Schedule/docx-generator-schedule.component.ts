import {Component, OnInit} from '@angular/core';
import { Packer } from 'docx';
import {DocumentCreatorSchedule} from './cv-generator-schedule';
import {TrainingProgramService} from '../services/training-program.service';
import {TrainingProgramCurriculumSectionService} from '../services/training-program-curriculum-section.service';
import {TrainingProgramMainLiteratureService} from '../services/training-program-main-literature.service';
import {TrainingProgramAdditionalLiteratureService} from '../services/training-program-additional-literature.service';
import {TrainingProgramRegulationService} from '../services/training-program-regulation.service';
import {CurriculumTopicTrainingProgramService} from '../services/curriculum-topic-training-program.service';
import {OccupationFormClassHourService} from '../services/occupation-form-class-hour.service';
import {MaxVariableTopicTimeService} from '../services/max-variable-topic-time.service';
import {OccupationFormService} from '../services/occupation-form.service';
import {ActivatedRoute} from '@angular/router';
import {TrainingProgramGenerator} from '../models/generator-models/TrainingProgramGenerator';
import {GroupService} from '../services/group.service';
import { saveAs } from 'file-saver';
import {ScheduleDateService} from '../services/schedule-services/schedule-date.service';
import {GroupScheduleGenerator} from '../models/generator-models/GroupScheduleGenerator';
import {Group} from '../models/Group';

@Component({
  selector: 'app-docx-generator',
  templateUrl: './docx-generator-schedule.component.html',
  styleUrls: ['./docx-generator-schedule.component.scss'],
  providers: [
    GroupService,
    TrainingProgramService
  ]
})

export class DocxGeneratorScheduleComponent implements OnInit{

  constructor(
    private groupService: GroupService,
    private trainingProgramService: TrainingProgramService,
    // private route: ActivatedRoute
  ) {
  }
  docx: any[] = [];
  id: number;
  groupSchedule: GroupScheduleGenerator;
  isBLR = false;
  myDocx: any;

  load;

  ngOnInit(): void {
    const date = new Date();
    this.id = 1;
    this.loadGroup();
    this.getDocument();
  }

  loadGroup(): void{
    this.groupService.getValue(this.id)
      .subscribe((data: GroupScheduleGenerator) => {
        if (data) {
          this.groupSchedule = data;
          console.log(this.groupSchedule.groupNumber.toString());
          console.log(this.groupSchedule.calendarYear);
          // this.loadTrainingProgram();
        }
      });
  }

  loadTrainingProgram(): void {
    this.trainingProgramService.getValueForDocxGenerator(this.groupSchedule.trainingProgramId)
      .subscribe((data: TrainingProgramGenerator) => {
        if (data) {
          this.groupSchedule.trainingProgram = data;
        }
      });
  }
  public getDocument(): void {
    const documentCreator = new DocumentCreatorSchedule(
      this.isBLR,
    );
    const docxTmp = documentCreator.create();
    Packer.toBlob(docxTmp).then(blob => {
      this.docx.push(blob);
      this.myDocx = blob;
    });
  }

  generateDocRU(): void {
    this.isBLR = false;
  }

  generateDocBLR(): void {
    this.isBLR = true;
  }

  downloadDocx(): void {
    saveAs(this.myDocx, 'расписание.docx');
  }
}
