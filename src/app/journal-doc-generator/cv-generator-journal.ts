import {convertMillimetersToTwip, Document, Header, PageNumberFormat, Paragraph} from 'docx';
import {DocxGeneratorDataTemplate} from '../docx-generator-data-template/docx-generator-data-template';
import {OccupationForm} from '../models/OccupationForm';
import {TableATPGenerator} from '../docx-generator-data-template/table-ATP/table-ATP-generator';
import {TrainingProgramGenerator} from '../models/generator-models/TrainingProgramGenerator';
import {DistanceTableATPGenerator} from '../docx-generator-data-template/table-ATP/distance-table-ATP-generator';
import {DocxJournalDataTemplate} from "./docx-journal-data-template";

export class DocumentCreatorJournal {

  teacher: number;
  docxGeneratorDataTemplate: DocxJournalDataTemplate = new DocxJournalDataTemplate(28);
  tableATPGenerator: TableATPGenerator;
  sections: any[] = [];

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
        },
        pageNumberStart: 1,
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
        new Paragraph({ text: '' }),
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
