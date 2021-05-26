import {convertMillimetersToTwip, Document, Header, PageNumberFormat} from 'docx';
import {DocxGeneratorDataTemplate} from '../docx-generator-data-template/docx-generator-data-template';

export class IntroductionTemplate {

  docxGeneratorDataTemplate: DocxGeneratorDataTemplate = new DocxGeneratorDataTemplate(28);
  sections: any[] = [];
  children: any[] = [];

  constructor() { }

  public create(): Document {
    this.children.push(this.docxGeneratorDataTemplate.someText('Актуальность.', 720,  true));
    this.children.push(this.docxGeneratorDataTemplate.someText(''));
    this.children.push(this.docxGeneratorDataTemplate.someText('Цель', 720, true));
    this.children.push(this.docxGeneratorDataTemplate.someText(''));
    this.children.push(this.docxGeneratorDataTemplate.someText('Задачи:', 720, true));
    this.children.push(this.docxGeneratorDataTemplate.someText(''));
    this.children.push(this.docxGeneratorDataTemplate.someText('Виды учебных занятий:', 720, true));
    this.children.push(this.docxGeneratorDataTemplate.someText('', ));
    this.children.push(this.docxGeneratorDataTemplate
      .someText('Основные требования к результатам учебной деятельности слушателей:', 720, true));
    this.children.push(this.docxGeneratorDataTemplate.someText('', ));

    this.children.push(this.docxGeneratorDataTemplate.someText('Методы, отвечающие целям повышения квалификации:', 720, true));
    this.children.push(this.docxGeneratorDataTemplate.someText('', ));
    this.children.push(this.docxGeneratorDataTemplate.someText('Средства повышения квалификации:', 720, true));
    this.children.push(this.docxGeneratorDataTemplate.someText('', ));

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
