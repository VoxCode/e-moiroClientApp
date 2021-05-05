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
import {WordToSfdtService} from '../services/word-to-sfdt.service';
import {FirstDocumentPart} from './first-document-part/first-document-part';
import {DocxMergeService} from '../services/docx-merge.service';
import {Base64ToBlob} from '../base64-to-blob/base64-to-blob';
import {SecondDocumentPart} from './second-document-part/second-document-part';
import {TrainingProgramTeacherService} from '../services/training-program-teacher.service';
import {TrainingProgramTeacher} from '../models/TrainingProgramTeacher';
import {Department} from '../models/Department';
import {DepartmentService} from '../services/department.service';


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
    CurriculumTopicTrainingProgramService,
    StudentCategoryService,
    CertificationTypeService,
    DepartmentService,
    WordToSfdtService,
    DocxMergeService
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
  trainingProgramTeachers: TrainingProgramTeacher[];
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
    private studentCategoryService: StudentCategoryService,
    private certificationTypeService: CertificationTypeService,
    private htmlToDocxService: WordToSfdtService,
    private docxMergeService: DocxMergeService,
    private departmentService: DepartmentService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
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
          this.trainingProgramCurriculumSections.sort((a, b) => a.sectionNumber - b.sectionNumber);
          this.loadCurriculumTopicTrainingProgram();
        }
      });
  }

  // tslint:disable-next-line:typedef
  loadCurriculumTopicTrainingProgram() {
    // this.trainingProgramCurriculumSections.forEach((object, index) => {
    //   this.curriculumTopicTrainingProgramService.getValueList(object.id)
    //     .subscribe((data: CurriculumTopicTrainingProgram[]) => {
    //       if (data !== undefined){
    //         const curriculumTopicTrainingPrograms: CurriculumTopicTrainingProgram[] = data;
    //         curriculumTopicTrainingPrograms
    //           .sort((a, b) => a.serialNumber - b.serialNumber);
    //         this.curriculumTopicsList[index] = curriculumTopicTrainingPrograms;
    //         this.checkCurriculumTopicsList.push(index);
    //         if (this.checkCurriculumTopicsList.length === this.trainingProgramCurriculumSections.length) {
    //           this.loadTrainingProgramFinalExamination();
    //         }
    //       }
    //     });
    // });
  }

  // tslint:disable-next-line:typedef
  loadTrainingProgramFinalExamination() {
    this.trainingProgramFinalExaminationService.getValue(this.id)
      .subscribe((data: TrainingProgramFinalExamination[]) => {
        if (data !== undefined){
          this.trainingProgramFinalExaminations = data;
          this.trainingProgramFinalExaminations.sort((a, b) => a.serialNumber - b.serialNumber);
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
          this.trainingProgramMainLiteratures
            .sort((a, b) => a.serialNumber - b.serialNumber);
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
          this.trainingProgramAdditionalLiteratures
            .sort((a, b) => a.serialNumber - b.serialNumber);
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
          this.trainingProgramRegulations
            .sort((a, b) => a.serialNumber - b.serialNumber);
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
          this.loadTrainingProgramTeacher();
        }
      });
  }

  loadTrainingProgramTeacher(): void {
    this.trainingProgramTeacherService.getTrainingProgramTeachers(this.id)
      .subscribe((trainingProgramTeacher: TrainingProgramTeacher[]) => {
        if (trainingProgramTeacher){
          this.trainingProgramTeachers = trainingProgramTeacher;
          this.loadDepartment();
        }
      });
  }

  loadDepartment(): void {
    this.departmentService.getValue(this.trainingProgram.departmentId)
      .subscribe((department: Department) => {
        if (department){
          this.department = department;
          this.loadCertificationType();
        }
      });
  }

  loadCertificationType(): void {
    this.certificationTypeService.getValue(this.trainingProgram.certificationTypeId)
      .subscribe((data: CertificationType) => {
        if (data !== undefined){
          this.certificationType = data;
          this.getDocument();
        }
      });
  }

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
    const secondDocxTmp = secondDocumentPart.create([model, empty]);
    Packer.toBlob(firstDocxTmp).then(blob => {
      let blobArray: any[] = [];
      const introductionBlob = new Base64ToBlob().generate(this.trainingProgram.introduction, this.wordDocxType, 512);
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

    // const documentCreator = new DocumentCreator(
    //   this.curriculumTopicsList,
    //   this.trainingProgram,
    //   this.trainingProgramCurriculumSections,
    //   this.trainingProgramFinalExaminations,
    //   this.trainingProgramMainLiteratures,
    //   this.trainingProgramAdditionalLiteratures,
    //   this.trainingProgramRegulations,
    //   this.studentCategory,
    //   this.certificationType
    // );
    //
    // const docxTmp = documentCreator.create([
    //   model,
    //   empty
    // ]);
    //
    // Packer.toBlob(docxTmp).then(blob => {
    //   this.docx.push(blob);
    // });
  }
}
