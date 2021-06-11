import {convertMillimetersToTwip, Document, Header, PageNumberFormat} from 'docx';
import {DocxGeneratorDataTemplate} from '../../docx-generator-data-template/docx-generator-data-template';
import {TrainingProgramGenerator} from '../../models/generator-models/TrainingProgramGenerator';

export class SecondDocumentPart {

  teacher: number;
  docxGeneratorDataTemplate: DocxGeneratorDataTemplate = new DocxGeneratorDataTemplate(28);
  sections: any[] = [];
  children: any[] = [];

  constructor(
    private trainingProgram: TrainingProgramGenerator,
  ) { }

  public create(): Document {
    this.children.push(this.docxGeneratorDataTemplate
      .someTextCertificationType('Форма итоговой аттестации', ' - ' +
        this.trainingProgram.certificationTypeName + '.', 720, true));
    this.children.push(this.docxGeneratorDataTemplate.pageBreak());
    this.children.push(this.docxGeneratorDataTemplate.titleText('содержание'));
    this.trainingProgram.trainingProgramCurriculumSections.forEach((object, index) =>
    {
      this.children.push(this.docxGeneratorDataTemplate.emptyParagraph());
      this.children.push(this.docxGeneratorDataTemplate.titleText(index + 1 + '.' + object.name));
      this.children.push(this.docxGeneratorDataTemplate.emptyParagraph());

      // Делим на инвариантную и вариативную
      const invariantCurriculumTopicsList = object.curriculumTopicTrainingPrograms.filter(a => !a.isVariable);
      const variableCurriculumTopicsList = object.curriculumTopicTrainingPrograms.filter(a => a.isVariable);

      if (!this.trainingProgram.isDistanceLearning) {
        this.children.push(this.docxGeneratorDataTemplate.someTextCenter('Инвариантная часть', 0,  true));
      }

      let i = 1;
      invariantCurriculumTopicsList.forEach(obj => {
        const tmpString = this.docxGeneratorDataTemplate.classHoursStringBuilder(obj, this.trainingProgram.isDistanceLearning);
        this.children.push(this.docxGeneratorDataTemplate
          .someTextCurriculumTopics((index + 1) + '.' + i + '. ' + obj.topicTitle, tmpString, 0, true));
        this.children.push(this.docxGeneratorDataTemplate.someText(obj.annotation, 720));
        i++;
        if (this.trainingProgram.isDistanceLearning && this.trainingProgram.isControlWork) {
          this.children.push(this.docxGeneratorDataTemplate
            .independentWork('Управляемая самостоятельная работа (' + obj.testWorkHours + ' ' + this.docxGeneratorDataTemplate
              .classHoursEndingDeclination(obj.testWorkHours) + ')', 720));
        }
      });
      this.children.push(this.docxGeneratorDataTemplate.emptyParagraph());

      if (!this.trainingProgram.isDistanceLearning && variableCurriculumTopicsList.length !== 0) {
        this.children.push(this.docxGeneratorDataTemplate.someTextCenter('Вариативная часть', 0,  true));
      }

      let j = 1;
      variableCurriculumTopicsList.forEach(obj => {
        const tmpString = this.docxGeneratorDataTemplate.classHoursStringBuilder(obj, this.trainingProgram.isDistanceLearning);
        this.children.push(this.docxGeneratorDataTemplate
          .someTextCurriculumTopics(obj.topicTitle, tmpString, 0, true));
        this.children.push(this.docxGeneratorDataTemplate.someText(obj.annotation, 720));
        j++;
        if (this.trainingProgram.isDistanceLearning && this.trainingProgram.isTestWork) {
          this.children.push(this.docxGeneratorDataTemplate
            .independentWork('Управляемая самостоятельная работа (' + obj.testWorkHours  + ' ' + this.docxGeneratorDataTemplate
              .classHoursEndingDeclination(obj.testWorkHours) + ')', 720));
        }
      });
      if (this.trainingProgram.isDistanceLearning && this.trainingProgram.isControlWork) {
        this.children.push(this.docxGeneratorDataTemplate
          .testWork('Контрольная работа № ' + (index + 1).toString(), 720));
      }
    });
    this.children.push(this.docxGeneratorDataTemplate.pageBreak());

    this.children.push(this.docxGeneratorDataTemplate.titleText('Материалы для итоговой аттестации слушателей'));
    this.children.push(this.docxGeneratorDataTemplate.emptyParagraph());
    this.children.push(this.docxGeneratorDataTemplate.someTextCenter('Вопросы для проведения зачета', 0 , true));
    this.children.push(this.docxGeneratorDataTemplate.emptyParagraph());
    this.trainingProgram.trainingProgramFinalExaminations.forEach((object, i) => {
      this.children.push(this.docxGeneratorDataTemplate.someText((i + 1) +
        '. ' + object.content, 720));
    });
    this.children.push(this.docxGeneratorDataTemplate.pageBreak());

    let indx = 0;
    this.children.push(this.docxGeneratorDataTemplate.titleText('список рекомендуемой литературы'));
    this.children.push(this.docxGeneratorDataTemplate.emptyParagraph());
    this.children.push(this.docxGeneratorDataTemplate.someText('Основная', 720, true));
    this.trainingProgram.trainingProgramMainLiteratures.forEach((object, i) => {
      this.children.push(this.docxGeneratorDataTemplate.someText((i + 1) +
        '. ' + object.content, 720));
      indx = i + 1;
    });
    this.children.push(this.docxGeneratorDataTemplate.emptyParagraph());
    this.children.push(this.docxGeneratorDataTemplate.someText('Дополнительная', 720, true));
    this.trainingProgram.trainingProgramAdditionalLiteratures.forEach((object) => {
      indx = indx + 1;
      this.children.push(this.docxGeneratorDataTemplate.someText((indx) +
        '. ' + object.content, 720));
    });
    this.children.push(this.docxGeneratorDataTemplate.emptyParagraph());
    this.children.push(this.docxGeneratorDataTemplate.someText('Нормативные правовые акты', 720, true));
    this.trainingProgram.trainingProgramRegulations.forEach((object) => {
      indx = indx + 1;
      this.children.push(this.docxGeneratorDataTemplate.someText((indx) +
        '. ' + object.content, 720));
    });

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
