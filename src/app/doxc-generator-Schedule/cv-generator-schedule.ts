import {
  convertMillimetersToTwip,
  Document,
  Header,
  PageNumberFormat,
  PageOrientation
} from 'docx';
import {DocxGeneratorDataTemplate} from '../docx-generator-data-template/docx-generator-data-template';
import {DocxGeneratorScheduleTemplate} from './schedule-document-template/schedule-document-template';
import {TableScheduleGenerator} from './schedule-document-template/schedule-table-generator';

export class DocumentCreatorSchedule {
  docxGeneratorDataTemplate: DocxGeneratorDataTemplate = new DocxGeneratorDataTemplate(28);
  docxGeneratorScheduleTemplate: DocxGeneratorScheduleTemplate = new DocxGeneratorScheduleTemplate(24);
  tableScheduleGenerator: TableScheduleGenerator = new TableScheduleGenerator();
  sections: any[] = [];

  constructor(
    isBLR: boolean
  ) { }

  public create(): Document {
    this.sections.push({
      headers: {
        default: new Header({
          children: [this.docxGeneratorDataTemplate.pageNumbers()],
        })
      },
      properties: {
        page: {
          size: {
            orientation: PageOrientation.LANDSCAPE,
          },
        },
        pageNumberStart: 2,
        pageNumberFormatType: PageNumberFormat.DECIMAL,
        titlePage: true
      },
      margins: {
        top: convertMillimetersToTwip(5),
        right: convertMillimetersToTwip(9.5),
        bottom: convertMillimetersToTwip(4),
        left: convertMillimetersToTwip(9)
      },
      children: [
        this.docxGeneratorScheduleTemplate.tableScheduleHeader(),
        this.docxGeneratorScheduleTemplate.mainNameSchedule(),
        this.docxGeneratorScheduleTemplate.groupInfo(5,
          'Современные подходы в образовании младших школьников',
          'учителей начальных классов учреждений общего среднего образования',
          Date.now(),
          Date.now()),
        this.docxGeneratorScheduleTemplate.trainingProgramInfoATP(5, 'kek', true),
        this.tableScheduleGenerator.insertTable(),
        this.docxGeneratorScheduleTemplate.signatureSchedule(),
        this.docxGeneratorDataTemplate.emptyParagraph(),
      ]
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
