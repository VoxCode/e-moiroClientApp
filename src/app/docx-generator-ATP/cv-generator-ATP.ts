import {convertMillimetersToTwip, Document, Header, PageNumberFormat, Paragraph} from 'docx';
import {DocxGeneratorDataTemplate} from '../docx-generator-data-template/docx-generator-data-template';
import {OccupationForm} from '../models/OccupationForm';
import {TableATPGenerator} from '../docx-generator-data-template/table-ATP/table-ATP-generator';
import {TrainingProgramGenerator} from '../models/generator-models/TrainingProgramGenerator';

export class DocumentCreatorRector {

  teacher: number;
  docxGeneratorDataTemplate: DocxGeneratorDataTemplate = new DocxGeneratorDataTemplate(28);
  tableATPGenerator: TableATPGenerator = new TableATPGenerator();
  sections: any[] = [];

  constructor(
    private trainingProgram: TrainingProgramGenerator,
    private occupationForms: OccupationForm[],
    private isRector: boolean,
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
          this.trainingProgram.numberOfHours, this.trainingProgram.formOfEducationName, this.trainingProgram.isDistanceLearning),
        new Paragraph({ text: '' }),
        this.tableATPGenerator.tableATP(
          this.occupationForms,
          this.trainingProgram
        ),
        this.docxGeneratorDataTemplate.noteATP(),
        this.docxGeneratorDataTemplate.footerATPDean(this.isRector),
        this.docxGeneratorDataTemplate
          .footerATPDepartmentHead(this.trainingProgram.departmentName, this.trainingProgram.departmentHeadName)
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
