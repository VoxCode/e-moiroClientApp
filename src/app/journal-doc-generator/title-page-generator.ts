import {
  convertMillimetersToTwip,
  Document,
  Footer,
  Header,
  PageBreak,
  PageNumberFormat,
  Paragraph,
  Table,
  WidthType
} from 'docx';
import {DocxJournalDataTemplate} from './docx-journal-data-template';
import {ContentTableHeaderGenerator} from './content-table-generator/content-table-header-generator';
import {TableHeaderFirstRow} from '../docx-generator-data-template/table-ATP/table-ATP-structure/table-header/table-header-first-row';
import {ListenersTableGenerator} from "./content-table-generator/listeners-table-generator";
import {JournalScheduleTableGenerator} from "./content-table-generator/journal-schedule-table-generator";

export class TitlePageGenerator {

  docxGeneratorDataTemplate: DocxJournalDataTemplate = new DocxJournalDataTemplate(28);
  contentTableHeaderGenerator: ContentTableHeaderGenerator = new ContentTableHeaderGenerator();
  listenersTableGenerator: ListenersTableGenerator = new ListenersTableGenerator();
  journalScheduleTableGenerator: JournalScheduleTableGenerator = new JournalScheduleTableGenerator();

  tableHeaderFirstRow: TableHeaderFirstRow = new TableHeaderFirstRow(5, false);

  sections: any[] = [];
  children: any[] = [];

  constructor(
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
        }
      },
      children: [
        new Paragraph({
          children: [
            this.docxGeneratorDataTemplate.ministryOfEducation(),
            this.docxGeneratorDataTemplate.emptyParagraph(),
            this.docxGeneratorDataTemplate.titleMOIRO(),
            this.docxGeneratorDataTemplate.emptyParagraph(),
            this.docxGeneratorDataTemplate.emptyParagraph(),
            this.docxGeneratorDataTemplate.emptyParagraph(),
            this.docxGeneratorDataTemplate.emptyParagraph(),
            this.docxGeneratorDataTemplate.emptyParagraph(),
            this.docxGeneratorDataTemplate.emptyParagraph(),
            this.docxGeneratorDataTemplate.emptyParagraph(),
            this.docxGeneratorDataTemplate.emptyParagraph(),
            this.docxGeneratorDataTemplate.emptyParagraph(),
            this.docxGeneratorDataTemplate.titleJournal(),
            this.docxGeneratorDataTemplate.emptyParagraph(),
            this.docxGeneratorDataTemplate.titlePKProgram(),
            this.docxGeneratorDataTemplate.emptyParagraph(),
            this.docxGeneratorDataTemplate.titleTrainingProgram(),
            this.docxGeneratorDataTemplate.emptyParagraph(),
            this.docxGeneratorDataTemplate.group(),
            this.docxGeneratorDataTemplate.emptyParagraph(),
            this.docxGeneratorDataTemplate.educationForm(),
            this.docxGeneratorDataTemplate.studyDuration(),
            this.docxGeneratorDataTemplate.emptyParagraph(),
            this.docxGeneratorDataTemplate.startTime(),
            this.docxGeneratorDataTemplate.emptyParagraph(),
            this.docxGeneratorDataTemplate.endTime(),
            this.docxGeneratorDataTemplate.emptyParagraph(),
            this.docxGeneratorDataTemplate.emptyParagraph(),
            this.docxGeneratorDataTemplate.emptyParagraph(),
            this.docxGeneratorDataTemplate.emptyParagraph(),
            this.docxGeneratorDataTemplate.emptyParagraph(),
            this.docxGeneratorDataTemplate.methodist(),
            this.docxGeneratorDataTemplate.emptyParagraph(),
            this.docxGeneratorDataTemplate.educationalDepartmentChief(),
          ],
        }),
      ],
    });

    this.sections.push({
      properties: {
        page: {
          margin: {
            left: convertMillimetersToTwip(15),
            right: convertMillimetersToTwip(15),
            top: convertMillimetersToTwip(9.5),
            bottom: convertMillimetersToTwip(15)
          }
        }
      },
      children: [
        this.contentTableHeaderGenerator.insert(),
        this.docxGeneratorDataTemplate.pageBreak()
      ]
    });

    this.sections.push({
      properties: {
        page: {
          margin: {
            left: convertMillimetersToTwip(15),
            right: convertMillimetersToTwip(15),
            top: convertMillimetersToTwip(9.5),
            bottom: convertMillimetersToTwip(15)
          }
        }
      },
      children: [
        this.listenersTableGenerator.insert(),
        this.docxGeneratorDataTemplate.pageBreak()
      ]
    });

    this.sections.push({
      properties: {
        page: {
          margin: {
            left: convertMillimetersToTwip(15),
            right: convertMillimetersToTwip(15),
            top: convertMillimetersToTwip(9.5),
            bottom: convertMillimetersToTwip(15)
          }
        }
      },
      children: [
        this.journalScheduleTableGenerator.insert(),
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
      sections: this.sections,
    });
  }
}
