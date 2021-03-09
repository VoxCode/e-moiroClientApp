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

  public create([]): Document {
    const document = new Document({
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
    });

    document.addSection({
      headers: {
        default: new Header({
          children: [this.docxGeneratorDataTemplate.pageNumbers()],
        })
      },
      properties: {
        pageNumberStart: 2,
        pageNumberFormatType: PageNumberFormat.DECIMAL,
        titlePage: true
      },
      margins: {
        top: convertMillimetersToTwip(20),
        right: convertMillimetersToTwip(10),
        bottom: convertMillimetersToTwip(20),
        left: convertMillimetersToTwip(30)
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
        )
      ],
    });
    return document;
  }
}
