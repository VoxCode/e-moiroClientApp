import {convertMillimetersToTwip, Document, Footer, Header, PageNumberFormat, Paragraph} from 'docx';
import {DocxGeneratorDataTemplate} from '../../docx-generator-data-template/docx-generator-data-template';
import {StudentCategory} from '../../models/StudentCategory';
import {TrainingProgram} from '../../models/TrainingProgram';

export class FirstDocumentPart {

  teacher: number;
  docxGeneratorDataTemplate: DocxGeneratorDataTemplate = new DocxGeneratorDataTemplate(28);
  sections: any[] = [];
  children: any[] = [];

  constructor(
    private trainingProgram: TrainingProgram,
    private studentCategory: StudentCategory,
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
            //#region "First page"
            this.docxGeneratorDataTemplate.titleMOIRO(),
            this.docxGeneratorDataTemplate.emptyParagraph(),
            this.docxGeneratorDataTemplate.approveRector(this.docxGeneratorDataTemplate.getNowYear()),
            this.docxGeneratorDataTemplate.mainNameDocumentTP('«' + this.trainingProgram.name + '»'),
            this.docxGeneratorDataTemplate.studentCategoryMain(this.studentCategory.name)
            //#endregion First page
          ],
        }),
      ],
    });

    this.teacher = 3; // logic of teachers
    if (this.teacher >= 2) {
      this.children.push(this.docxGeneratorDataTemplate.someText('Разработчики учебной программы:'));
      for (let i = 0; i < this.teacher; i++) {
        this.children.push(
          this.docxGeneratorDataTemplate.someText('Rector name' + i.toString() + ', ' + 'Доцент, три пяди во лбу и вообще мастер своего дела')
        );
      }
    }
    else
    {
      this.children.push(this.docxGeneratorDataTemplate.someText( 'Разработчики учебной программы'));
      this.children.push(this.docxGeneratorDataTemplate.someText( 'Rector name, ' + 'Доцент, три пяди во лбу и вообще мастер своего дела'));
    }
    this.children.push(this.docxGeneratorDataTemplate.emptyParagraph());
    let coun: number;
    coun = 2;
    if (coun >= 2 ) // рецензенты
    {
      this.children.push(this.docxGeneratorDataTemplate.someText('Рецензенты:'));
      for (let i = 0; i < this.teacher; i++) {
        this.children.push(this.docxGeneratorDataTemplate.someText('Рецензент name' + i.toString() + ', ' + 'Доцент, три пяди во лбу и вообще мастер своего дела'));
      }
    }
    else
    {
      this.children.push(this.docxGeneratorDataTemplate.someText( 'Рецензент:'));
      this.children.push(this.docxGeneratorDataTemplate
        .someText( 'Рецензент name, ' + 'Доцент, три пяди во лбу и вообще мастер своего дела'));
    }
    for (let i = 0; i < 20; i++)
    {
      this.children.push(this.docxGeneratorDataTemplate.emptyParagraph());
    }
    this.children.push( this.docxGeneratorDataTemplate.someText('Рекомендовано к утверждению:'));
    this.children.push(this.docxGeneratorDataTemplate.someText('кафедра частных методик общего среднего образования\n' +
      'государственного учреждения образования\n' +
      '«Минский областной институт развития образования»\n' +
      'протокол заседания от ____________ ' + this.docxGeneratorDataTemplate.getNowYear() + ' № ______\n'));
    this.children.push(this.docxGeneratorDataTemplate.emptyParagraph());
    this.children.push(this.docxGeneratorDataTemplate.someText('научно-методический совет\n' +
      'государственного учреждения образования \n' +
      '«Минский областной институт развития образования»\n' +
      'протокол заседания от ____________ ' + this.docxGeneratorDataTemplate.getNowYear() + ' № ______\n'));
    this.children.push(this.docxGeneratorDataTemplate.pageBreak());

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
