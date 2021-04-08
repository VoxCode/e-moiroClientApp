import {Component, OnInit} from '@angular/core';
import { Packer } from 'docx';
import { model, empty } from './cv-data-TP';
import { DocumentCreator } from './cv-generator-TP';
import {TrainingProgramService} from '../services/training-program.service';
import {TrainingProgram} from '../models/TrainingProgram';
import {ActivatedRoute} from '@angular/router';
import {TrainingProgramCurriculumSection} from '../models/TrainingProgramCurriculumSection';
import {TrainingProgramCurriculumSectionService} from '../services/training-program-curriculum-section.service';
import {CurriculumTopicTrainingProgram} from '../models/СurriculumTopicTrainingProgram';
import {CurriculumTopicTrainingProgramService} from '../services/curriculum-topic-training-program.service';
import {TrainingProgramFinalExamination} from '../models/TrainingProgramFinalExamination';
import {TrainingProgramFinalExaminationService} from '../services/training-program-final-examination.service';
import {TrainingProgramMainLiteratureService} from '../services/training-program-main-literature.service';
import {TrainingProgramAdditionalLiteratureService} from '../services/training-program-additional-literature.service';
import {TrainingProgramRegulationService} from '../services/training-program-regulation.service';
import {TrainingProgramMainLiterature} from '../models/TrainingProgramMainLiterature';
import {TrainingProgramAdditionalLiterature} from '../models/TrainingProgramAdditionalLiterature';
import {TrainingProgramRegulation} from '../models/TrainingProgramRegulation';
import {StudentCategoryService} from '../services/student-category.service';
import {StudentCategory} from '../models/StudentCategory';
import {CertificationTypeService} from '../services/certification-type.service';
import {CertificationType} from '../models/CertificationType';
import { asBlob } from 'html-docx-js-typescript';
import { saveAs } from 'file-saver';
import {HtmlToDocxService} from '../services/html-to-docx.service';


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
    CurriculumTopicTrainingProgramService,
    StudentCategoryService,
    CertificationTypeService,
    HtmlToDocxService
  ]
})

export class DocxGeneratorTPComponent implements OnInit{
  id: number;
  checkCurriculumTopicsList: number[] = [];
  curriculumTopicsList: CurriculumTopicTrainingProgram[][];
  trainingProgram: TrainingProgram;
  studentCategory: StudentCategory;
  certificationType: CertificationType;
  trainingProgramCurriculumSections: TrainingProgramCurriculumSection[];
  trainingProgramFinalExaminations: TrainingProgramFinalExamination[];
  trainingProgramMainLiteratures: TrainingProgramMainLiterature[];
  trainingProgramAdditionalLiteratures: TrainingProgramAdditionalLiterature[];
  trainingProgramRegulations: TrainingProgramRegulation[];
  docx: any[] = [];

  constructor(
    private trainingProgramService: TrainingProgramService,
    private trainingProgramCurriculumSectionService: TrainingProgramCurriculumSectionService,
    private trainingProgramFinalExaminationService: TrainingProgramFinalExaminationService,
    private trainingProgramMainLiteratureService: TrainingProgramMainLiteratureService,
    private trainingProgramAdditionalLiteratureService: TrainingProgramAdditionalLiteratureService,
    private trainingProgramRegulationService: TrainingProgramRegulationService,
    private curriculumTopicTrainingProgramService: CurriculumTopicTrainingProgramService,
    private studentCategoryService: StudentCategoryService,
    private certificationTypeService: CertificationTypeService,
    private htmlToDocxService: HtmlToDocxService,
    private route: ActivatedRoute
  ) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.curriculumTopicsList = [];
    this.id = this.route.snapshot.params.id;
    this.loadTrainingProgram();
  }

  // LOAD

  // tslint:disable-next-line:typedef
  loadTrainingProgram() {
    this.trainingProgramService.getValue(this.id)
      .subscribe((data: TrainingProgram) => {
        if (data !== undefined){
          this.trainingProgram = data;
          this.loadTrainingProgramCurriculumSection();
        }
      });
  }

  // tslint:disable-next-line:typedef
  loadTrainingProgramCurriculumSection() {
    this.trainingProgramCurriculumSectionService.getValue(this.id)
      .subscribe((data: TrainingProgramCurriculumSection[]) => {
        if (data !== undefined){
          this.trainingProgramCurriculumSections = data;
          // tslint:disable-next-line:only-arrow-functions typedef
          this.trainingProgramCurriculumSections.sort(function(a, b) {
            return a.sectionNumber - b.sectionNumber;
          });
          this.loadCurriculumTopicTrainingProgram();
        }
      });
  }

  // tslint:disable-next-line:typedef
  loadCurriculumTopicTrainingProgram() {
    this.trainingProgramCurriculumSections.forEach((object, index) => {
      this.curriculumTopicTrainingProgramService.getValueList(object.id)
        .subscribe((data: CurriculumTopicTrainingProgram[]) => {
          if (data !== undefined){
            const curriculumTopicTrainingPrograms: CurriculumTopicTrainingProgram[] = data;
            // tslint:disable-next-line:only-arrow-functions typedef
            curriculumTopicTrainingPrograms.sort(function(a, b) {
              return a.serialNumber - b.serialNumber;
            });
            this.curriculumTopicsList[index] = curriculumTopicTrainingPrograms;
            this.checkCurriculumTopicsList.push(index);
            if (this.checkCurriculumTopicsList.length === this.trainingProgramCurriculumSections.length) {
              this.loadTrainingProgramFinalExamination();
            }
          }
        });
    });
  }

  // tslint:disable-next-line:typedef
  loadTrainingProgramFinalExamination() {
    this.trainingProgramFinalExaminationService.getValue(this.id)
      .subscribe((data: TrainingProgramFinalExamination[]) => {
        if (data !== undefined){
          this.trainingProgramFinalExaminations = data;
          // tslint:disable-next-line:only-arrow-functions typedef
          this.trainingProgramFinalExaminations.sort(function(a, b) {
            return a.serialNumber - b.serialNumber;
          });
          this.loadTrainingProgramMainLiterature();
        }
      });
  }

  // tslint:disable-next-line:typedef
  loadTrainingProgramMainLiterature() {
    this.trainingProgramMainLiteratureService.getValue(this.id)
      .subscribe((data: TrainingProgramMainLiterature[]) => {
        if (data !== undefined){
          this.trainingProgramMainLiteratures = data;
          // tslint:disable-next-line:only-arrow-functions typedef
          this.trainingProgramMainLiteratures.sort(function(a, b) {
            return a.serialNumber - b.serialNumber;
          });
          this.loadTrainingProgramAdditionalLiterature();
        }
      });
  }

  // tslint:disable-next-line:typedef
  loadTrainingProgramAdditionalLiterature() {
    this.trainingProgramAdditionalLiteratureService.getValue(this.id)
      .subscribe((data: TrainingProgramAdditionalLiterature[]) => {
        if (data !== undefined){
          this.trainingProgramAdditionalLiteratures = data;
          // tslint:disable-next-line:only-arrow-functions typedef
          this.trainingProgramAdditionalLiteratures.sort(function(a, b) {
            return a.serialNumber - b.serialNumber;
          });
          this.loadTrainingProgramRegulation();
        }
      });
  }

  // tslint:disable-next-line:typedef
  loadTrainingProgramRegulation() {
    this.trainingProgramRegulationService.getValue(this.id)
      .subscribe((data: TrainingProgramRegulation[]) => {
        if (data !== undefined){
          this.trainingProgramRegulations = data;
          // tslint:disable-next-line:only-arrow-functions typedef
          this.trainingProgramRegulations.sort(function(a, b) {
            return a.serialNumber - b.serialNumber;
          });
          this.loadStudentCategory();
        }
      });
  }

  // tslint:disable-next-line:typedef
  loadStudentCategory() {
    this.studentCategoryService.getValue(this.trainingProgram.studentCategoryId)
      .subscribe((data: StudentCategory) => {
        if (data !== undefined){
          this.studentCategory = data;
          this.loadCertificationType();
        }
      });
  }

  // tslint:disable-next-line:typedef
  loadCertificationType() {
    this.certificationTypeService.getValue(this.trainingProgram.certificationTypeId)
      .subscribe((data: CertificationType) => {
        if (data !== undefined){
          this.certificationType = data;
          this.getDocument();
        }
      });
  }

  public getDocument(): void {
    const documentCreator = new DocumentCreator(
      this.curriculumTopicsList,
      this.trainingProgram,
      this.trainingProgramCurriculumSections,
      this.trainingProgramFinalExaminations,
      this.trainingProgramMainLiteratures,
      this.trainingProgramAdditionalLiteratures,
      this.trainingProgramRegulations,
      this.studentCategory,
      this.certificationType
    );

    const docxTmp = documentCreator.create([
      model,
      empty
    ]);

    const html = '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">\n' +
      '<html>\n' +
      '     <head>\n' +
      '          <title></title>\n' +
      '     </head>\n' +
      '     <body>\n' +
      '          Looks how cool is <font size="x-large"><b>Open Xml</b></font>.\n' +
      '          Now with <font color="red"><u>HtmlToOpenXml</u></font>, it nevers been so easy to convert html.\n' +
      '          <p>\n' +
      '               If you like it, add me a rating on <a href="https://github.com/onizet/html2openxml">github</a>\n' +
      '          </p>\n' +
      '          <hr>\n' +
      '     </body>\n' +
      '</html>';

    Packer.toBlob(docxTmp).then(blob => {
      asBlob(this.trainingProgram.introduction).then(data => {
        // saveAs(data, 'example.docx');
        this.htmlToDocxService.convert(html).subscribe((tmpData) => {
          // saveAs(tmpData, 'ex.docx');
          console.log(tmpData);
        });
        this.docx.push(blob);
        this.docx.push(blob);
      });
    });
  }
}
