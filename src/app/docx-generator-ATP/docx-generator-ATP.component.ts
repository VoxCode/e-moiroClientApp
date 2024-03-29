import {Component, OnInit} from '@angular/core';
import { Packer } from 'docx';
import {DocumentCreatorRector} from './cv-generator-ATP';
import {TrainingProgramService} from '../services/training-program.service';
import {ActivatedRoute} from '@angular/router';
import {TrainingProgramCurriculumSectionService} from '../services/training-program-curriculum-section.service';
import {CurriculumTopicTrainingProgramService} from '../services/curriculum-topic-training-program.service';
import {TrainingProgramMainLiteratureService} from '../services/training-program-main-literature.service';
import {TrainingProgramAdditionalLiteratureService} from '../services/training-program-additional-literature.service';
import {TrainingProgramRegulationService} from '../services/training-program-regulation.service';
import {OccupationFormClassHourService} from '../services/occupation-form-class-hour.service';
import {TrainingProgramCurriculumSection} from '../models/TrainingProgramCurriculumSection';
import {TrainingProgramMainLiterature} from '../models/TrainingProgramMainLiterature';
import {TrainingProgramAdditionalLiterature} from '../models/TrainingProgramAdditionalLiterature';
import {TrainingProgramRegulation} from '../models/TrainingProgramRegulation';
import {OccupationFormService} from '../services/occupation-form.service';
import {OccupationForm} from '../models/OccupationForm';
import {TrainingProgramGenerator} from '../models/generator-models/TrainingProgramGenerator';
import {CurriculumTopicTrainingProgramGenerator} from '../models/generator-models/CurriculumTopicTrainingProgramGenerator';
import {OccupationFormClassHour} from '../models/OccupationFormClassHour';
import {MaxVariableTopicTimeService} from '../services/max-variable-topic-time.service';
import {MaxVariableTopicTime} from '../models/MaxVariableTopicTime';
import {Globals} from '../globals';


@Component({
  selector: 'app-docx-generator',
  templateUrl: './docx-generator-ATP.component.html',
  styleUrls: ['./docx-generator-ATP.component.scss'],
  providers: [
    TrainingProgramService,
    TrainingProgramCurriculumSectionService,
    TrainingProgramMainLiteratureService,
    TrainingProgramAdditionalLiteratureService,
    TrainingProgramRegulationService,
    CurriculumTopicTrainingProgramService,
    OccupationFormClassHourService,
    MaxVariableTopicTimeService,
    OccupationFormService,
  ]
})

export class DocxGeneratorATPComponent implements OnInit{
  id: number;
  trainingProgram: TrainingProgramGenerator;
  docx: any[] = [];
  isRector = true;
  occupationForms: OccupationForm[];
  loading: boolean;
  isForum: boolean;

  constructor(
    private trainingProgramService: TrainingProgramService,
    private trainingProgramCurriculumSectionService: TrainingProgramCurriculumSectionService,
    private trainingProgramMainLiteratureService: TrainingProgramMainLiteratureService,
    private trainingProgramAdditionalLiteratureService: TrainingProgramAdditionalLiteratureService,
    private trainingProgramRegulationService: TrainingProgramRegulationService,
    private curriculumTopicTrainingProgramService: CurriculumTopicTrainingProgramService,
    private occupationFormClassHourService: OccupationFormClassHourService,
    private maxVariableTopicTimeService: MaxVariableTopicTimeService,
    private occupationFormService: OccupationFormService,
    private route: ActivatedRoute,
    public globals: Globals
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.loading = true;
    this.loadTrainingProgram();
  }

  loadTrainingProgram(): void {
    this.trainingProgramService.getValueForDocxGenerator(this.id)
      .subscribe((data: TrainingProgramGenerator) => {
        if (data) {
          this.trainingProgram = data;
          this.loadOccupationForms();
        }
      });
  }

  loadOccupationForms(): void {
    this.occupationFormService.getValues()
      .subscribe((data: OccupationForm[]) => {
        if (data) {
          this.occupationForms = data;
          data.sort((a, b) => a.id - b.id);
          this.loadTrainingProgramCurriculumSections();
        }
      });
  }

  loadTrainingProgramCurriculumSections(): void {
    this.trainingProgramCurriculumSectionService.getFromTrainingProgram(this.id)
      .subscribe((data: TrainingProgramCurriculumSection[]) => {
        if (data.length !== 0) {
          data.sort((a, b) => a.sectionNumber - b.sectionNumber);
          this.trainingProgram.trainingProgramCurriculumSections = data;
          this.loadCurriculumTopicTrainingPrograms();
        }
      });
  }

  loadCurriculumTopicTrainingPrograms(): void {
    const checkLength: number[] = [];
    const forumTmp = this.occupationForms.find(a => a
      .fullName.toLowerCase() === 'форум'); // заглушка для удаления форума из УТП (часть 1)
    const forumId = forumTmp.id;
    this.trainingProgram.trainingProgramCurriculumSections.forEach((object, index) => {
      this.maxVariableTopicTimeService.getValues(object.id)  // load maxVariableTopicTimes
        .subscribe((maxVariableTopicTimes: MaxVariableTopicTime[]) => {
          // if (!this.trainingProgram.isDistanceLearning) { // заглушка для отключения макс. вариативных часов в УТП
          //
          // }
          // else {
          //   this.trainingProgram.trainingProgramCurriculumSections[index].maxVariableTopicTimes = [];
          // }
          this.trainingProgram.trainingProgramCurriculumSections[index].maxVariableTopicTimes = maxVariableTopicTimes;
      });
      this.curriculumTopicTrainingProgramService.getFromTrainingProgramCurriculumSection(object.id)
        .subscribe((data: CurriculumTopicTrainingProgramGenerator[]) => {
          if (data.length !== 0) {
            data.sort((a, b) => a.serialNumber - b.serialNumber);
            this.trainingProgram.trainingProgramCurriculumSections[index].curriculumTopicTrainingPrograms = data;
            checkLength.push(index);
            this.occupationFormClassHourService.getValuesFromCurriculumSection(object.id) // load occupationFormClassHours
              .subscribe((occupationFormClassHours: OccupationFormClassHour[]) => {
                if (occupationFormClassHours.length !== 0) {
                  if (!this.isForum && this.trainingProgram.isDistanceLearning) {
                    const tmp = occupationFormClassHours.find(a => a.occupationFormId === forumId);
                    if (tmp) {
                      this.isForum = true;
                    }
                  }
                  this.trainingProgram.trainingProgramCurriculumSections[index]
                    .curriculumTopicTrainingPrograms.forEach((obj, i) => {
                    this.trainingProgram.trainingProgramCurriculumSections[index]
                      .curriculumTopicTrainingPrograms[i].occupationFormClassHours = occupationFormClassHours
                      .filter(a => a.
                        curriculumTopicTrainingProgramId === obj.id && a.
                        occupationFormId !== forumId); // заглушка для удаления форума из УТП (часть 2)
                  });
                }
              });
            if (checkLength.length === this.trainingProgram.trainingProgramCurriculumSections.length) {
              const indx = this.occupationForms
                .findIndex(a => a.fullName.toLowerCase() === 'форум'); // заглушка для удаления форума из УТП (часть 3)
              this.occupationForms.splice(indx, 1);
              this.loadTrainingProgramMainLiteratures();
            }
          }
        });
    });
  }

  loadTrainingProgramMainLiteratures(): void {
    this.trainingProgramMainLiteratureService.getValuesFromTrainingProgram(this.id)
      .subscribe((data: TrainingProgramMainLiterature[]) => {
        if (data.length !== 0) {
          data.sort((a, b) => a.serialNumber - b.serialNumber);
          this.trainingProgram.trainingProgramMainLiteratures = data;
          this.loadTrainingProgramAdditionalLiteratures();
        }
      });
  }

  loadTrainingProgramAdditionalLiteratures(): void {
    this.trainingProgramAdditionalLiteratureService.getValuesFromTrainingProgram(this.id)
      .subscribe((data: TrainingProgramAdditionalLiterature[]) => {
        if (data.length !== 0) {
          data.sort((a, b) => a.serialNumber - b.serialNumber);
          this.trainingProgram.trainingProgramAdditionalLiteratures = data;
          this.loadTrainingProgramRegulations();
        }
      });
  }

  loadTrainingProgramRegulations(): void {
    this.trainingProgramRegulationService.getValuesFromTrainingProgram(this.id)
      .subscribe((data: TrainingProgramRegulation[]) => {
        if (data.length !== 0) {
          data.sort((a, b) => a.serialNumber - b.serialNumber);
          this.trainingProgram.trainingProgramRegulations = data;
          this.getDocument();
        }
      });
  }

  public getDocument(): void {
    const documentCreator = new DocumentCreatorRector(
      this.trainingProgram,
      this.occupationForms,
      this.isRector,
      this.isForum
    );
    const docxTmp = documentCreator.create();
    Packer.toBlob(docxTmp).then(blob => {
      this.docx = [];
      this.docx.push(blob);
      this.loading = false;
    });
  }

  generateRector(): void {
    this.isRector = true;
    this.getDocument();
  }

  generateDean(): void {
    this.isRector = false;
    this.getDocument();
  }
}
