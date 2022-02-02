import {convertMillimetersToTwip, Document, Header, PageNumberFormat, Paragraph} from 'docx';
import {DocxGeneratorDataTemplate} from '../docx-generator-data-template/docx-generator-data-template';
import {OccupationForm} from '../models/OccupationForm';
import {TableATPGenerator} from '../docx-generator-data-template/table-ATP/table-ATP-generator';
import {TrainingProgramGenerator} from '../models/generator-models/TrainingProgramGenerator';
import {DistanceTableATPGenerator} from '../docx-generator-data-template/table-ATP/distance-table-ATP-generator';
import {DocxJournalDataTemplate} from './docx-journal-data-template';
import {TeachersCompletedWorkTableGenerator} from './content-table-generator/teachers-completed-work/teachers-completed-work-table-generator';
import {ContentTableHeaderGenerator} from './content-table-generator/content-table-header-generator';
import {ListenersTableGenerator} from './content-table-generator/listeners-table-generator';
import {JournalScheduleTableGenerator} from './content-table-generator/journal-schedule-table-generator';

export class DocumentCreatorJournal {

  teacher: number;
  docxGeneratorDataTemplate: DocxJournalDataTemplate = new DocxJournalDataTemplate(28);
  tableATPGenerator: TableATPGenerator;
  sections: any[] = [];

  constructor(

  ) { }

  // public create(): Document {
  //   this.sections.push({
  //     properties: {
  //       page: {
  //         margin: {
  //           left: convertMillimetersToTwip(30),
  //           right: convertMillimetersToTwip(10),
  //           top: convertMillimetersToTwip(20),
  //           bottom: convertMillimetersToTwip(20)
  //         }
  //       },
  //       pageNumberStart: 1,
  //       pageNumberFormatType: PageNumberFormat.DECIMAL,
  //       titlePage: true
  //     },
  //     headers: {
  //       default: new Header({
  //         children: [this.docxGeneratorDataTemplate.pageNumbers()],
  //       })
  //     },
  //     children: [
  //       this.docxGeneratorDataTemplate.titleMOIRO(),
  //       this.docxGeneratorDataTemplate.emptyParagraph(),
  //       new Paragraph({ text: '' }),
  //     ],
  //   });
  //
  //   return new Document({
  //     creator: 'MOIRO',
  //     title: 'Document of MOIRO',
  //     styles: {
  //       paragraphStyles: [ {
  //         id: 'default',
  //         name: 'My Standard style',
  //         basedOn: 'Normal',
  //         next: 'Normal',
  //         quickFormat: true,
  //         run: {
  //           size: 28,
  //         },
  //       }],
  //     },
  //     sections: this.sections
  //   });
  // }

  public create(): Document {

    const docxGeneratorDataTemplate: DocxJournalDataTemplate = new DocxJournalDataTemplate(28);
    const contentTableHeaderGenerator: ContentTableHeaderGenerator = new ContentTableHeaderGenerator();
    const listenersTableGenerator: ListenersTableGenerator = new ListenersTableGenerator();
    const journalScheduleTableGenerator: JournalScheduleTableGenerator = new JournalScheduleTableGenerator();
    const teachersCompletedWorkTableGenerator: TeachersCompletedWorkTableGenerator = new TeachersCompletedWorkTableGenerator();

    let a: any;
    a = [
      {
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
          journalScheduleTableGenerator.insert(),
          docxGeneratorDataTemplate.pageBreak(),
        ],
      },
    ];

    const document = new Document({
      sections: [
        {
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
            docxGeneratorDataTemplate.pageBreak(),
            teachersCompletedWorkTableGenerator.insert(),
            docxGeneratorDataTemplate.pageBreak(),
            contentTableHeaderGenerator.insert(),
            docxGeneratorDataTemplate.pageBreak(),
            listenersTableGenerator.insert(),
            docxGeneratorDataTemplate.pageBreak(),
            journalScheduleTableGenerator.insert(),
            docxGeneratorDataTemplate.pageBreak(),
          ],
        },{
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
            docxGeneratorDataTemplate.pageBreak(),
            teachersCompletedWorkTableGenerator.insert(),
            docxGeneratorDataTemplate.pageBreak(),
            contentTableHeaderGenerator.insert(),
            docxGeneratorDataTemplate.pageBreak(),
            listenersTableGenerator.insert(),
            docxGeneratorDataTemplate.pageBreak(),
            journalScheduleTableGenerator.insert(),
            docxGeneratorDataTemplate.pageBreak(),
          ],
        },{
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
            docxGeneratorDataTemplate.pageBreak(),
            teachersCompletedWorkTableGenerator.insert(),
            docxGeneratorDataTemplate.pageBreak(),
            contentTableHeaderGenerator.insert(),
            docxGeneratorDataTemplate.pageBreak(),
            listenersTableGenerator.insert(),
            docxGeneratorDataTemplate.pageBreak(),
            journalScheduleTableGenerator.insert(),
            docxGeneratorDataTemplate.pageBreak(),
          ],
        },
      ],
    });

    return document;
  }
}
