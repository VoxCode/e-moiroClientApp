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
    this.children.push(this.docxGeneratorDataTemplate.someText('Цель:', 720, true));
    this.children.push(this.docxGeneratorDataTemplate.someText(''));
    this.children.push(this.docxGeneratorDataTemplate.someText('Задачи:', 720, true));
    this.children.push(this.docxGeneratorDataTemplate.someText(''));
    this.children.push(this.docxGeneratorDataTemplate.someText('Итоговая аттестация проводится в форме', 720));
    this.children.push(this.docxGeneratorDataTemplate.someText(''));
    this.children.push(this.docxGeneratorDataTemplate.someText('Условиями реализации учебной программы являются:', 720));
    this.children.push(this.docxGeneratorDataTemplate.someText(''));
    this.children.push(this.docxGeneratorDataTemplate.someText('Методы и средства повышения квалификации:', 720, true));
    this.children.push(this.docxGeneratorDataTemplate.someText(''));
    this.children.push(this.docxGeneratorDataTemplate.someText('Методы:', 720, false, true));
    this.children.push(this.docxGeneratorDataTemplate.someText(''));
    this.children.push(this.docxGeneratorDataTemplate.someText('Cредства:', 720, false, true));
    this.children.push(this.docxGeneratorDataTemplate.someText(''));
    this.children.push(this.docxGeneratorDataTemplate
      .someTextCenter('ОСНОВНЫЕ ТРЕБОВАНИЯ К РЕЗУЛЬТАТАМ УЧЕБНОЙ ДЕЯТЕЛЬНОСТИ СЛУШАТЕЛЕЙ', 0, true));
    this.children.push(this.docxGeneratorDataTemplate.someText(''));
    this.children.push(this.docxGeneratorDataTemplate.someTextCenter('ФОРМИРУЕМЫЕ КОМПЕТЕНЦИИ', 0, true));
    this.children.push(this.docxGeneratorDataTemplate.someText(''));

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
