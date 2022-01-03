import {convertMillimetersToTwip, Document, Footer, Header, PageNumberFormat, Paragraph} from 'docx';
import {DocxJournalDataTemplate} from './docx-journal-data-template';
import {ContentTableHeaderGenerator} from "./content-table-generator/content-table-header-generator";

export class TitlePageGenerator {

  docxGeneratorDataTemplate: DocxJournalDataTemplate = new DocxJournalDataTemplate(28);
  contentTableHeaderGenerator: ContentTableHeaderGenerator = new ContentTableHeaderGenerator();

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
            this.contentTableHeaderGenerator.insert(),
          ],
        }),
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
      sections: this.sections,
    });
  }
}
