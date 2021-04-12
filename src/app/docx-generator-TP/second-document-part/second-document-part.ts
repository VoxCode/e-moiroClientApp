import {convertMillimetersToTwip, Document, Footer, Header, PageNumberFormat, Paragraph} from 'docx';
import {TrainingProgramRegulation} from '../../models/TrainingProgramRegulation';
import {TrainingProgramCurriculumSection} from '../../models/TrainingProgramCurriculumSection';
import {DocxGeneratorDataTemplate} from '../../docx-generator-data-template/docx-generator-data-template';
import {TrainingProgramFinalExamination} from '../../models/TrainingProgramFinalExamination';
import {TrainingProgram} from '../../models/TrainingProgram';
import {TrainingProgramMainLiterature} from '../../models/TrainingProgramMainLiterature';
import {CurriculumTopicTrainingProgram} from '../../models/СurriculumTopicTrainingProgram';
import {TrainingProgramAdditionalLiterature} from '../../models/TrainingProgramAdditionalLiterature';

export class SecondDocumentPart {

  teacher: number;
  isVariableOn = false;
  docxGeneratorDataTemplate: DocxGeneratorDataTemplate = new DocxGeneratorDataTemplate(28);
  sections: any[] = [];

  constructor(
    private curriculumTopicsList: CurriculumTopicTrainingProgram[][],
    private trainingProgram: TrainingProgram,
    private trainingProgramCurriculumSections: TrainingProgramCurriculumSection[],
    private trainingProgramFinalExaminations: TrainingProgramFinalExamination[],
    private trainingProgramMainLiteratures: TrainingProgramMainLiterature[],
    private trainingProgramAdditionalLiteratures: TrainingProgramAdditionalLiterature[],
    private trainingProgramRegulations: TrainingProgramRegulation[],


  ) { }

  public create([model, internalParameter ]): Document {

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
      children: [

        //#region FourPage
        ...internalParameter
          .map((nothing) => {
            const arr: Paragraph[] = [];
            arr.push(this.docxGeneratorDataTemplate.emptyParagraph());
            arr.push(this.docxGeneratorDataTemplate.titleText('содержание'));
            this.trainingProgramCurriculumSections.forEach((object, index) =>
            {
              arr.push(this.docxGeneratorDataTemplate.emptyParagraph());
              arr.push(this.docxGeneratorDataTemplate.titleText(index + 1 + '.' + object.name));
              arr.push(this.docxGeneratorDataTemplate.emptyParagraph());
              if (this.trainingProgram.isDistanceLearning === false){
                arr.push(this.docxGeneratorDataTemplate.someTextCenter('Инвариантная часть', 0,  true));
              }

              let i = 1;
              this.curriculumTopicsList[index].forEach(obj => {
                if (obj.isVariable === false){
                  arr.push(this.docxGeneratorDataTemplate
                    .someTextCurriculumTopics((index + 1) + '.' + i + ' ' + obj.topicTitle, ' (' + obj.fullName.toLowerCase() + ',' +
                      ' ' + obj.classHours + ' часа)', 0, true));
                  arr.push(this.docxGeneratorDataTemplate.someText(obj.annotation, 720));
                  i++;
                }
                else {
                  this.isVariableOn = true;
                }
              });
              arr.push(this.docxGeneratorDataTemplate.emptyParagraph());
              if (this.trainingProgram.isDistanceLearning === false && this.isVariableOn === true){
                arr.push(this.docxGeneratorDataTemplate.someTextCenter('Вариативная часть', 0,  true));
              }

              let j = 1;
              this.curriculumTopicsList[index].forEach(obj => {
                if (obj.isVariable === true) {
                  arr.push(this.docxGeneratorDataTemplate
                    .someTextCurriculumTopics(obj.topicTitle, ' (' + obj.fullName.toLowerCase() + ', ' +
                      ' ' + obj.classHours + ' часа)', 0, true));
                  arr.push(this.docxGeneratorDataTemplate.someText(obj.annotation, 720));
                  j++;
                }
              });
              arr.push(this.docxGeneratorDataTemplate.pageBreak());
            });
            return arr;
          })
          .reduce((prev, curr) => prev.concat(curr), []),
        //#endregion

        // #region FivePage
        ...internalParameter
          .map((nothing) => {
            if (this.trainingProgram.isDistanceLearning === false && this.trainingProgram.isTestWork){
              const arr: Paragraph[] = [];
              arr.push(this.docxGeneratorDataTemplate.titleText('содержание самостоятельной работы'));
              arr.push(this.docxGeneratorDataTemplate.emptyParagraph());
              for (let i = 1; i < 5; i++) // loop for a parts (PERFERED OBJECT THEN INT)
              {
                for (let input = 1; input < 7; input++)
                {
                  arr.push(this.docxGeneratorDataTemplate
                    .someText(i.toString() + '.' + input.toString() + ' Нормативы и прочие обеспечения'));
                  arr.push(this.docxGeneratorDataTemplate.someText('Задание (сколько то там часов)', 720));
                  arr.push(this.docxGeneratorDataTemplate.someText('Литература (какие-то страницы)', 720));
                }
                arr.push(this.docxGeneratorDataTemplate.emptyParagraph());
              }
              arr.push(this.docxGeneratorDataTemplate.pageBreak());
              return arr;
            }
          })
          .reduce((prev, curr) => prev.concat(curr), []),
        // #endregion
        // #region Содержание контрольно работы
        ...internalParameter
          .map((nothing) => {
            if (this.trainingProgram.isDistanceLearning === false && this.trainingProgram.isControlWork){
              const arr: Paragraph[] = [];
              arr.push(this.docxGeneratorDataTemplate.titleText('содержание контрольной работы'));
              arr.push(this.docxGeneratorDataTemplate.emptyParagraph());
              for (let i = 1; i < 5; i++) // loop for a parts (PERFERED OBJECT THEN INT)
              {
                arr.push(this.docxGeneratorDataTemplate
                  .someText('Контрольная работа №' + i.toString() + ' Название кр - потом добавлю', 720, true));
                arr.push(this.docxGeneratorDataTemplate.emptyParagraph());
                for (let input = 1; input < 7; input++) {
                  arr.push(this.docxGeneratorDataTemplate.someText(input.toString() + '. Задания (много много много)', 720));
                  arr.push(this.docxGeneratorDataTemplate.someText('Литература (какие-то страницы)', 720));
                  arr.push(this.docxGeneratorDataTemplate.emptyParagraph());
                }
              }
              arr.push(this.docxGeneratorDataTemplate.pageBreak());
              return arr;
            }
          })
          .reduce((prev, curr) => prev.concat(curr), []),
        // #endregion
        // #region Материалы итоговой аттестации
        ...internalParameter
          .map((nothing) => {
            const arr: Paragraph[] = [];
            arr.push(this.docxGeneratorDataTemplate.titleText('Материалы для итоговой аттестации слушателей'));
            arr.push(this.docxGeneratorDataTemplate.emptyParagraph());
            arr.push(this.docxGeneratorDataTemplate.someTextCenter('Вопросы для проведения зачета', 0 , true));
            arr.push(this.docxGeneratorDataTemplate.emptyParagraph());
            this.trainingProgramFinalExaminations.forEach((object, i) => {
              arr.push(this.docxGeneratorDataTemplate.someText((i + 1) +
                '. ' + object.content, 720));
            });
            arr.push(this.docxGeneratorDataTemplate.pageBreak());
            return arr;
          })
          .reduce((prev, curr) => prev.concat(curr), []),
        // #endregion

        // #region Материалы итоговой аттестации
        ...internalParameter
          .map((nothing) => {
            let indx = 0;
            const arr: Paragraph[] = [];
            arr.push(this.docxGeneratorDataTemplate.titleText('список рекомендуемой литературы'));
            arr.push(this.docxGeneratorDataTemplate.emptyParagraph());
            arr.push(this.docxGeneratorDataTemplate.someText('Основная', 720, true));
            this.trainingProgramMainLiteratures.forEach((object, i) => {
              arr.push(this.docxGeneratorDataTemplate.someText((i + 1) +
                '. ' + object.content, 720));
              indx = i + 1;
            });
            arr.push(this.docxGeneratorDataTemplate.emptyParagraph());
            arr.push(this.docxGeneratorDataTemplate.someText('Дополнительная', 720, true));
            this.trainingProgramAdditionalLiteratures.forEach((object, i) => {
              indx = indx + 1;
              arr.push(this.docxGeneratorDataTemplate.someText((indx) +
                '. ' + object.content, 720));
            });
            arr.push(this.docxGeneratorDataTemplate.emptyParagraph());
            arr.push(this.docxGeneratorDataTemplate.someText('Нормативные правовые акты', 720, true));
            this.trainingProgramRegulations.forEach((object, i) => {
              indx = indx + 1;
              arr.push(this.docxGeneratorDataTemplate.someText((indx) +
                '. ' + object.content, 720));
            });
            return arr;
          })
          .reduce((prev, curr) => prev.concat(curr), []),
        // #endregion
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
