import {convertMillimetersToTwip, Document, Footer, Header, PageNumberFormat, Paragraph} from 'docx';
import {DocxGeneratorDataTemplate} from '../../docx-generator-data-template/docx-generator-data-template';
import {TrainingProgramGenerator} from '../../models/generator-models/TrainingProgramGenerator';

export class FirstDocumentPart {

  docxGeneratorDataTemplate: DocxGeneratorDataTemplate = new DocxGeneratorDataTemplate(28);
  sections: any[] = [];
  children: any[] = [];

  constructor(
    private trainingProgram: TrainingProgramGenerator,
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
      footers: {
        default: new Footer({
          children: [this.docxGeneratorDataTemplate.yearBoth()]
        })
      },
      children: [
        new Paragraph({
          children: [
            this.docxGeneratorDataTemplate.titleMOIRO(),
            this.docxGeneratorDataTemplate.emptyParagraph(),
            this.docxGeneratorDataTemplate.approveRector(this.docxGeneratorDataTemplate.getNowYear()),
            this.docxGeneratorDataTemplate.mainNameDocumentTP('«' + this.trainingProgram.name + '»'),
            this.docxGeneratorDataTemplate.studentCategoryMain(this.trainingProgram.studentCategoryName)
          ],
        }),
      ],
    });

    const teacherDevelopers = this.trainingProgram.trainingProgramTeachers.filter(a => a.expertId === 1);
    if (teacherDevelopers.length > 1) {
      this.children.push(this.docxGeneratorDataTemplate.someText('Разработчики учебной программы:'));
    }
    else
    {
      this.children.push(this.docxGeneratorDataTemplate.someText( 'Разработчик учебной программы:'));
    }
    teacherDevelopers.forEach((obj) => {
      this.children.push(this.docxGeneratorDataTemplate.experts(obj));
    });
    this.children.push(this.docxGeneratorDataTemplate.emptyParagraph());

    const teacherReviewers = this.trainingProgram.trainingProgramTeachers.filter(a => a.expertId === 2);
    if (teacherReviewers.length > 1) {
      this.children.push(this.docxGeneratorDataTemplate.someText('Рецензенты:'));
    }
    else
    {
      this.children.push(this.docxGeneratorDataTemplate.someText( 'Рецензент:'));
    }
    teacherReviewers.forEach((obj) => {
      this.children.push(this.docxGeneratorDataTemplate.experts(obj));
    });

    for (let i = 0; i < 26; i++)
    {
      this.children.push(this.docxGeneratorDataTemplate.emptyParagraph());
    }
    this.children.push( this.docxGeneratorDataTemplate.someText('Рекомендовано к утверждению:'));
    this.children.push(this.docxGeneratorDataTemplate.someText(this.trainingProgram.departmentName.toLowerCase()));
    this.children.push(this.docxGeneratorDataTemplate.someText('государственного учреждения образования'));
    this.children.push(this.docxGeneratorDataTemplate.someText('«Минский областной институт развития образования»'));
    this.children.push(this.docxGeneratorDataTemplate
      .someText('Протокол заседания от ____________ ' + this.docxGeneratorDataTemplate.getNowYear() + ' № ______'));
    this.children.push(this.docxGeneratorDataTemplate.emptyParagraph());
    this.children.push(this.docxGeneratorDataTemplate.someText('научно-методический совет'));
    this.children.push(this.docxGeneratorDataTemplate.someText('государственного учреждения образования'));
    this.children.push(this.docxGeneratorDataTemplate.someText('«Минский областной институт развития образования»'));
    this.children.push(this.docxGeneratorDataTemplate
      .someText('Протокол заседания от ____________ ' + this.docxGeneratorDataTemplate.getNowYear() + ' № ______'));
    this.children.push(this.docxGeneratorDataTemplate.pageBreak());
    this.children.push(this.docxGeneratorDataTemplate.titleText('введение'));
    this.children.push(this.docxGeneratorDataTemplate.emptyParagraph());

    this.sections.push( {
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
      },
      headers: {
        default: new Header({
          children: [this.docxGeneratorDataTemplate.pageNumbers()],
        })
      },
      children: this.children
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
