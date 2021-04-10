import {convertMillimetersToTwip, Document, Header, PageNumberFormat, Paragraph} from 'docx';
import {TrainingProgram} from '../models/TrainingProgram';
import {TrainingProgramCurriculumSection} from '../models/TrainingProgramCurriculumSection';
import {CurriculumTopicTrainingProgram} from '../models/СurriculumTopicTrainingProgram';
import {TrainingProgramFinalExamination} from '../models/TrainingProgramFinalExamination';
import {TrainingProgramMainLiterature} from '../models/TrainingProgramMainLiterature';
import {TrainingProgramAdditionalLiterature} from '../models/TrainingProgramAdditionalLiterature';
import {TrainingProgramRegulation} from '../models/TrainingProgramRegulation';
import {StudentCategory} from '../models/StudentCategory';
import {CertificationType} from '../models/CertificationType';
import {DocxGeneratorDataTemplate} from '../docx-generator-data-template/docx-generator-data-template';
import {FormOfEducation} from '../models/FormOfEducation';
import {OccupationForm} from '../models/OccupationForm';
import {Department} from '../models/Department';
import {TableATPGenerator} from '../docx-generator-data-template/table-ATP/table-ATP-generator';

export class DocumentCreatorRector {

  teacher: number;
  docxGeneratorDataTemplate: DocxGeneratorDataTemplate = new DocxGeneratorDataTemplate(28);
  tableATPGenerator: TableATPGenerator = new TableATPGenerator();
  sections: any[] = [];

  constructor(
    private curriculumTopicsList: CurriculumTopicTrainingProgram[][],
    private trainingProgram: TrainingProgram,
    private trainingProgramCurriculumSections: TrainingProgramCurriculumSection[],
    private trainingProgramFinalExaminations: TrainingProgramFinalExamination[],
    private trainingProgramMainLiteratures: TrainingProgramMainLiterature[],
    private trainingProgramAdditionalLiteratures: TrainingProgramAdditionalLiterature[],
    private trainingProgramRegulations: TrainingProgramRegulation[],
    private studentCategory: StudentCategory,
    private certificationType: CertificationType,
    private formOfEducation: FormOfEducation,
    private occupationForms: OccupationForm[],
    private isRector: boolean,
    private department: Department
  ) { }

  public create(): Document {
    this.sections.push({
      properties: {
        page: {
          margin: {
            left: convertMillimetersToTwip(30),
            right: convertMillimetersToTwip(10),
            top: convertMillimetersToTwip(20),
            bottom: convertMillimetersToTwip(20)
          }
        },
        pageNumberStart: 2,
        pageNumberFormatType: PageNumberFormat.DECIMAL,
        titlePage: true
      },
      headers: {
        default: new Header({
          children: [this.docxGeneratorDataTemplate.pageNumbers()],
        })
      },
      children: [
        this.docxGeneratorDataTemplate.titleMOIRO(),
        this.docxGeneratorDataTemplate.emptyParagraph(),
        this.docxGeneratorDataTemplate.approve(this.docxGeneratorDataTemplate.getNowYear(), this.isRector),
        this.docxGeneratorDataTemplate.mainNameDocumentATP('«' + this.trainingProgram.name + '»'),
        this.docxGeneratorDataTemplate.trainingProgramInfoATP(
          this.trainingProgram.numberOfHours, this.formOfEducation.name, this.trainingProgram.isDistanceLearning),
        new Paragraph({ text: '' }),
        this.tableATPGenerator.tableATP(
          this.trainingProgramCurriculumSections,
          this.curriculumTopicsList,
          this.occupationForms,
          this.trainingProgram,
          this.department,
          this.certificationType
        ),
        this.docxGeneratorDataTemplate.noteATP(),
        this.docxGeneratorDataTemplate.footerATPDean(),
        this.docxGeneratorDataTemplate.footerATPDepartmentHead(this.department.name, this.department.departmentHeadName)
      ],
    });

    return new Document({
      creator: 'MOIRO',
      title: 'Document of MOIRO',
      styles: {
        paragraphStyles: [ {
          id: 'default',
          name: 'My Standard style',
          basedOn: 'Normal',
          next: 'Normal',
          quickFormat: true,
          run: {
            size: 28,
          },
        }],
      },
      sections: this.sections
    });
  }
}
