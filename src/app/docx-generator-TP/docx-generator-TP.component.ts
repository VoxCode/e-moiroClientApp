import {Component, OnInit} from '@angular/core';
import { Packer } from 'docx';
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
import {WordToSfdtService} from '../services/word-to-sfdt.service';
import {FirstDocumentPart} from './first-document-part/first-document-part';
import {DocxMergeService} from '../services/docx-merge.service';
import {Base64ToBlob} from '../base64-to-blob/base64-to-blob';
import {SecondDocumentPart} from './second-document-part/second-document-part';
import {TrainingProgramTeacherService} from '../services/training-program-teacher.service';
import {TrainingProgramTeacher} from '../models/TrainingProgramTeacher';
import {Department} from '../models/Department';
import {DepartmentService} from '../services/department.service';
import {TrainingProgramIntroduction} from '../models/TrainingProgramIntroduction';
import {TrainingProgramIntroductionService} from '../services/training-program-introduction.service';
import {OccupationFormClassHourService} from '../services/occupation-form-class-hour.service';
import {TrainingProgramGenerator} from '../models/generator-models/TrainingProgramGenerator';


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
    CurriculumTopicTrainingProgramService,
    StudentCategoryService,
    CertificationTypeService,
    DepartmentService,
    OccupationFormClassHourService,
    WordToSfdtService,
    DocxMergeService
  ]
})

export class DocxGeneratorTPComponent implements OnInit{
  id: number;
  checkCurriculumTopicsList: number[] = [];
  curriculumTopicsList: CurriculumTopicTrainingProgram[][] = [];
  trainingProgram: TrainingProgramGenerator;
  studentCategory: StudentCategory;
  certificationType: CertificationType;
  trainingProgramCurriculumSections: TrainingProgramCurriculumSection[];
  trainingProgramFinalExaminations: TrainingProgramFinalExamination[];
  trainingProgramMainLiteratures: TrainingProgramMainLiterature[];
  trainingProgramAdditionalLiteratures: TrainingProgramAdditionalLiterature[];
  trainingProgramRegulations: TrainingProgramRegulation[];
  trainingProgramTeachers: TrainingProgramTeacher[];
  trainingProgramIntroduction: TrainingProgramIntroduction;
  department: Department;
  docx: any[] = [];
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
    private studentCategoryService: StudentCategoryService,
    private certificationTypeService: CertificationTypeService,
    private htmlToDocxService: WordToSfdtService,
    private docxMergeService: DocxMergeService,
    private departmentService: DepartmentService,
    private occupationFormClassHourService: OccupationFormClassHourService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.loadTrainingProgram();
  }

  loadTrainingProgram(): void {
    this.trainingProgramService.getValueForDocxGenerator(this.id)
      .subscribe((data: TrainingProgram) => {
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
    this.trainingProgram.trainingProgramCurriculumSections.forEach((object, index) => {
      this.curriculumTopicTrainingProgramService.getFromTrainingProgramCurriculumSection(object.id)
        .subscribe((data: CurriculumTopicTrainingProgram[]) => {
          if (data.length !== 0) {
            data.sort((a, b) => a.serialNumber - b.serialNumber); // остановился тут
            this.curriculumTopicsList[index] = data;
            this.checkCurriculumTopicsList.push(index);
            if (this.checkCurriculumTopicsList.length === this.trainingProgramCurriculumSections.length) {
              this.loadTrainingProgramFinalExaminations();
            }
          }
        });
    });
  }

  loadTrainingProgramFinalExaminations(): void {
    this.trainingProgramFinalExaminationService.getValuesFromTrainingProgram(this.id)
      .subscribe((data: TrainingProgramFinalExamination[]) => {
        if (data.length !== 0){
          data.sort((a, b) => a.serialNumber - b.serialNumber);
          this.trainingProgramFinalExaminations = data;
          this.loadTrainingProgramMainLiteratures();
        }
      });
  }

  loadTrainingProgramMainLiteratures(): void {
    this.trainingProgramMainLiteratureService.getValuesFromTrainingProgram(this.id)
      .subscribe((data: TrainingProgramMainLiterature[]) => {
        if (data.length !== 0){
          data.sort((a, b) => a.serialNumber - b.serialNumber);
          this.trainingProgramMainLiteratures = data;
          this.loadTrainingProgramAdditionalLiteratures();
        }
      });
  }

  loadTrainingProgramAdditionalLiteratures(): void {
    this.trainingProgramAdditionalLiteratureService.getValuesFromTrainingProgram(this.id)
      .subscribe((data: TrainingProgramAdditionalLiterature[]) => {
        if (data.length !== 0){
          data.sort((a, b) => a.serialNumber - b.serialNumber);
          this.trainingProgramAdditionalLiteratures = data;
          this.loadTrainingProgramRegulations();
        }
      });
  }

  loadTrainingProgramRegulations(): void {
    this.trainingProgramRegulationService.getValuesFromTrainingProgram(this.id)
      .subscribe((data: TrainingProgramRegulation[]) => {
        if (data.length !== 0){
          data.sort((a, b) => a.serialNumber - b.serialNumber);
          this.trainingProgramRegulations = data;
          this.loadTrainingProgramTeachers();
        }
      });
  }

  loadTrainingProgramTeachers(): void {
    this.trainingProgramTeacherService.getValuesFromTrainingProgram(this.id)
      .subscribe((data: TrainingProgramTeacher[]) => {
        if (data.length !== 0){
          this.trainingProgramTeachers = data;
          this.loadTrainingProgramIntroduction();
        }
      });
  }

  loadTrainingProgramIntroduction(): void {
    this.trainingProgramIntroductionService.getValueFromTrainingProgram(this.id)
      .subscribe((data: TrainingProgramIntroduction) => {
        if (data) {
          this.trainingProgramIntroduction = data;
          this.loadStudentCategory();
        }
      });
  }

  loadStudentCategory(): void {
    this.studentCategoryService.getValue(this.trainingProgram.studentCategoryId)
      .subscribe((data: StudentCategory) => {
        if (data){
          this.studentCategory = data;
          this.loadDepartment();
        }
      });
  }

  loadDepartment(): void {
    this.departmentService.getValue(this.trainingProgram.departmentId)
      .subscribe((data: Department) => {
        if (data){
          this.department = data;
          this.loadCertificationType();
        }
      });
  }

  loadCertificationType(): void {
    this.certificationTypeService.getValue(this.trainingProgram.certificationTypeId)
      .subscribe((data: CertificationType) => {
        if (data){
          this.certificationType = data;
          // this.getDocument();
        }
      });
  }

  // loadCertificationType(): void {
  //   this.certificationTypeService.getValue(this.trainingProgram.certificationTypeId)
  //     .subscribe((data: CertificationType) => {
  //       if (data){
  //         this.certificationType = data;
  //         this.getDocument();
  //       }
  //     });
  // }

  public getDocument(): void {
    const firstDocumentPart = new FirstDocumentPart(
      this.trainingProgram,
      this.studentCategory,
      this.trainingProgramTeachers,
      this.department
    );

    const secondDocumentPart = new SecondDocumentPart(
      this.curriculumTopicsList,
      this.trainingProgram,
      this.trainingProgramCurriculumSections,
      this.trainingProgramFinalExaminations,
      this.trainingProgramMainLiteratures,
      this.trainingProgramAdditionalLiteratures,
      this.trainingProgramRegulations,
    );

    const firstDocxTmp = firstDocumentPart.create();
    const secondDocxTmp = secondDocumentPart.create();
    Packer.toBlob(firstDocxTmp).then(blob => {
      let blobArray: any[] = [];
      const introductionBlob = new Base64ToBlob().generate(this.trainingProgramIntroduction.introduction, this.wordDocxType, 512);
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
          });
        });
      });
    });
  }
}
