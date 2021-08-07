import {Component, OnInit} from '@angular/core';
import {TrainingProgramService} from '../services/training-program.service';
import {ActivatedRoute} from '@angular/router';
import {TrainingProgramCurriculumSection} from '../models/TrainingProgramCurriculumSection';
import {TrainingProgramCurriculumSectionService} from '../services/training-program-curriculum-section.service';
import {CurriculumTopicTrainingProgramService} from '../services/curriculum-topic-training-program.service';
import {TrainingProgramFinalExamination} from '../models/TrainingProgramFinalExamination';
import {TrainingProgramFinalExaminationService} from '../services/training-program-final-examination.service';
import {TrainingProgramMainLiteratureService} from '../services/training-program-main-literature.service';
import {TrainingProgramAdditionalLiteratureService} from '../services/training-program-additional-literature.service';
import {TrainingProgramRegulationService} from '../services/training-program-regulation.service';
import {TrainingProgramMainLiterature} from '../models/TrainingProgramMainLiterature';
import {TrainingProgramAdditionalLiterature} from '../models/TrainingProgramAdditionalLiterature';
import {TrainingProgramRegulation} from '../models/TrainingProgramRegulation';
import {WordToSfdtService} from '../services/word-to-sfdt.service';
import {DocxMergeService} from '../services/docx-merge.service';
import {TrainingProgramTeacherService} from '../services/training-program-teacher.service';
import {TrainingProgramTeacher} from '../models/TrainingProgramTeacher';
import {TrainingProgramIntroduction} from '../models/TrainingProgramIntroduction';
import {TrainingProgramIntroductionService} from '../services/training-program-introduction.service';
import {OccupationFormClassHourService} from '../services/occupation-form-class-hour.service';
import {TrainingProgramGenerator} from '../models/generator-models/TrainingProgramGenerator';
import {TrainingProgramTestWorkService} from '../services/training-program-test-work.service';
import {TrainingProgramIndependentWorkQuestionService} from '../services/training-program-independent-work-question.service';
import {CurriculumTopicTrainingProgramGenerator} from '../models/generator-models/CurriculumTopicTrainingProgramGenerator';
import {OccupationFormClassHour} from '../models/OccupationFormClassHour';
import {FirstDocumentPart} from './first-document-part/first-document-part';
import {SecondDocumentPart} from './second-document-part/second-document-part';
import {Packer} from 'docx';
import {Base64ToBlob} from '../base64-to-blob/base64-to-blob';
import {Globals} from '../globals';
import {GuidedTestWorkAssignment} from '../models/GuidedTestWorkAssignment';
import {GuidedTestWorkAssignmentService} from '../services/guided-test-work-assignment.service';

@Component({
  selector: 'app-docx-generator',
  templateUrl: './docx-generator-TP.component.html',
  styleUrls: ['./docx-generator-TP.component.scss'],
  providers: [
    TrainingProgramService,
    TrainingProgramCurriculumSectionService,
    TrainingProgramFinalExaminationService,
    TrainingProgramMainLiteratureService,
    TrainingProgramAdditionalLiteratureService,
    TrainingProgramRegulationService,
    TrainingProgramTeacherService,
    TrainingProgramIntroductionService,
    TrainingProgramTestWorkService,
    TrainingProgramIndependentWorkQuestionService,
    CurriculumTopicTrainingProgramService,
    OccupationFormClassHourService,
    GuidedTestWorkAssignmentService,
    WordToSfdtService,
    DocxMergeService
  ]
})

export class DocxGeneratorTPComponent implements OnInit{
  id: number;
  trainingProgram: TrainingProgramGenerator;
  docx: any[] = [];
  loading: boolean;
  curriculumTopicIdArray: number[] = [];
  wordDocxType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

  constructor(
    private trainingProgramService: TrainingProgramService,
    private trainingProgramCurriculumSectionService: TrainingProgramCurriculumSectionService,
    private trainingProgramFinalExaminationService: TrainingProgramFinalExaminationService,
    private trainingProgramMainLiteratureService: TrainingProgramMainLiteratureService,
    private trainingProgramAdditionalLiteratureService: TrainingProgramAdditionalLiteratureService,
    private trainingProgramRegulationService: TrainingProgramRegulationService,
    private curriculumTopicTrainingProgramService: CurriculumTopicTrainingProgramService,
    private trainingProgramTeacherService: TrainingProgramTeacherService,
    private trainingProgramIntroductionService: TrainingProgramIntroductionService,
    private trainingProgramTestWorkService: TrainingProgramTestWorkService,
    private trainingProgramIndependentWorkQuestionService: TrainingProgramIndependentWorkQuestionService,
    private occupationFormClassHourService: OccupationFormClassHourService,
    private guidedTestWorkAssignmentService: GuidedTestWorkAssignmentService,
    private htmlToDocxService: WordToSfdtService,
    private docxMergeService: DocxMergeService,
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
          this.loadTrainingProgramCurriculumSections();
        }
      });
  }

  loadTrainingProgramCurriculumSections(): void {
    this.trainingProgramCurriculumSectionService.GetFromTrainingProgram(this.id)
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
    this.trainingProgram.trainingProgramCurriculumSections.forEach((object, index) => {
      this.curriculumTopicTrainingProgramService.getFromTrainingProgramCurriculumSection(object.id)
        .subscribe((data: CurriculumTopicTrainingProgramGenerator[]) => {
          if (data.length !== 0) {
            data.sort((a, b) => a.serialNumber - b.serialNumber);
            this.trainingProgram.trainingProgramCurriculumSections[index].curriculumTopicTrainingPrograms = data;
            checkLength.push(index);
            data.forEach(obj => {
              if (!obj.isVariable) {
                this.curriculumTopicIdArray.push(obj.id);
              }
            });

            this.occupationFormClassHourService.getValuesFromCurriculumSection(object.id)
              .subscribe((occupationFormClassHours: OccupationFormClassHour[]) => {
                if (data.length !== 0) {
                  this.trainingProgram.trainingProgramCurriculumSections[index]
                    .curriculumTopicTrainingPrograms.forEach((obj, i) => {
                    this.trainingProgram.trainingProgramCurriculumSections[index]
                      .curriculumTopicTrainingPrograms[i].occupationFormClassHours = occupationFormClassHours
                      .filter(a => a.curriculumTopicTrainingProgramId === obj.id);
                  });
                }
              });
            if (checkLength.length === this.trainingProgram.trainingProgramCurriculumSections.length) {
              this.loadTrainingProgramFinalExaminations();
            }
          }
        });
    });
  }

  loadTrainingProgramFinalExaminations(): void {
    this.trainingProgramFinalExaminationService.getValuesFromTrainingProgram(this.id)
      .subscribe((data: TrainingProgramFinalExamination[]) => {
        if (data.length !== 0) {
          data.sort((a, b) => a.serialNumber - b.serialNumber);
          this.trainingProgram.trainingProgramFinalExaminations = data;
          this.loadTrainingProgramMainLiteratures();
        }
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
          this.loadTrainingProgramTeachers();
        }
      });
  }

  loadTrainingProgramTeachers(): void {
    this.trainingProgramTeacherService.getValuesFromTrainingProgram(this.id)
      .subscribe((data: TrainingProgramTeacher[]) => {
        if (data.length !== 0) {
          this.trainingProgram.trainingProgramTeachers = data;
          this.loadTrainingProgramIntroduction();
        }
      });
  }

  loadTrainingProgramIntroduction(): void {
    this.trainingProgramIntroductionService.getValueFromTrainingProgram(this.id)
      .subscribe((data: TrainingProgramIntroduction) => {
        if (data) {
          this.trainingProgram.trainingProgramIntroduction = data;
          if (this.trainingProgram.isDistanceLearning) {
            this.loadGuidedTestWorkAssignment();
          }
          else {
            this.getDocument();
          }
        }
      });
  }

  loadGuidedTestWorkAssignment(): void {
    this.guidedTestWorkAssignmentService.getGuidedTestWorkAssignments(this.curriculumTopicIdArray)
      .subscribe((guidedTestWorkAssignmentsResponse: GuidedTestWorkAssignment[]) => {
        if (guidedTestWorkAssignmentsResponse.length !== 0) {
          console.log(guidedTestWorkAssignmentsResponse);
          this.getDocument();
        }
      });
  }

  public getDocument(): void {
    const firstDocumentPart = new FirstDocumentPart(
      this.trainingProgram
    );

    const secondDocumentPart = new SecondDocumentPart(
      this.trainingProgram
    );

    const firstDocxTmp = firstDocumentPart.create();
    const secondDocxTmp = secondDocumentPart.create();

    Packer.toBlob(firstDocxTmp).then(blob => {
      let blobArray: any[] = [];
      const introductionBlob = new Base64ToBlob()
        .generate(this.trainingProgram.trainingProgramIntroduction.introduction, this.wordDocxType, 512);
      blobArray.push(introductionBlob);
      blobArray.push(blob);

      this.docxMergeService.merge(blobArray).subscribe((result) => {
        const resultBlob = new Base64ToBlob().generate(result, this.wordDocxType, 512);

        Packer.toBlob(secondDocxTmp).then(blob2 => {
          blobArray = [];
          blobArray.push(blob2);
          blobArray.push(resultBlob);

          this.docxMergeService.merge(blobArray).subscribe((result2) => {
            const resultBlob2 = new Base64ToBlob().generate(result2, this.wordDocxType, 512);
            this.docx.push(resultBlob2);
            this.loading = false;
          });
        });
      });
    });
  }
}
