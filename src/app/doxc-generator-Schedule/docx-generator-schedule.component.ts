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

@Component({
  selector: 'app-docx-generator',
  templateUrl: './docx-generator-schedule.component.html',
  styleUrls: ['./docx-generator-schedule.component.scss'],
  providers: [
  ]
})

export class DocxGeneratorScheduleComponent implements OnInit{
  docx: any[] = [];
  id: number;
  trainingProgram: TrainingProgramGenerator;
  isBLR = false;
  myDocx: any;

  constructor(
    // private trainingProgramService: TrainingProgramService,
    // private group: GroupService,
    // private trainingProgramCurriculumSectionService: TrainingProgramCurriculumSectionService,
    // private trainingProgramMainLiteratureService: TrainingProgramMainLiteratureService,
    // private trainingProgramAdditionalLiteratureService: TrainingProgramAdditionalLiteratureService,
    // private trainingProgramRegulationService: TrainingProgramRegulationService,
    // private curriculumTopicTrainingProgramService: CurriculumTopicTrainingProgramService,
    // private occupationFormClassHourService: OccupationFormClassHourService,
    // private maxVariableTopicTimeService: MaxVariableTopicTimeService,
    // private occupationFormService: OccupationFormService,
    // private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    const date = new Date();
    this.getDocument();
  }

  // loadTrainingProgram(): void {
  //   this.trainingProgramService.getValueForDocxGenerator(this.id)
  //     .subscribe((data: TrainingProgramGenerator) => {
  //       if (data) {
  //         this.trainingProgram = data;
  //       }
  //     });
  // }

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
