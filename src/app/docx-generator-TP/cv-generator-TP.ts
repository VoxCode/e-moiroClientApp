import {convertMillimetersToTwip, Document, Footer, Header, PageNumberFormat, Paragraph} from 'docx';
import {TrainingProgram} from '../models/TrainingProgram';
import {TrainingProgramCurriculumSection} from '../models/TrainingProgramCurriculumSection';
import {CurriculumTopicTrainingProgram} from '../models/СurriculumTopicTrainingProgram';
import {TrainingProgramFinalExamination} from '../models/TrainingProgramFinalExamination';
import {TrainingProgramMainLiterature} from '../models/TrainingProgramMainLiterature';
import {TrainingProgramAdditionalLiterature} from '../models/TrainingProgramAdditionalLiterature';
import {TrainingProgramRegulation} from '../models/TrainingProgramRegulation';
import {StudentCategory} from '../models/StudentCategory';
import {CertificationType} from '../models/CertificationType';
import {DocxGeneratorDataTemplate} from '../docx-generator-data-template/docx-generator-data-template';

export class DocumentCreator {

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
    private studentCategory: StudentCategory,
    private certificationType: CertificationType
  ) { }

  // tslint:disable-next-line:no-shadowed-variable
  public create([model, internalParameter ]): Document {
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


        //#region "Second page"
        ...internalParameter
          .map((nothing) => {
            const arr: Paragraph[] = [];
            this.teacher = 3; // logic of teachers
            if (this.teacher >= 2) {
              arr.push(this.docxGeneratorDataTemplate.someText('Разработчики учебной программы:'));
              for (let i = 0; i < this.teacher; i++) {
                arr.push(
                  this.docxGeneratorDataTemplate.someText('Rector name' + i.toString() + ', ' + 'Доцент, три пяди во лбу и вообще мастер своего дела')
                );
              }
            }
            else
            {
              arr.push(this.docxGeneratorDataTemplate.someText( 'Разработчики учебной программы'));
              arr.push(this.docxGeneratorDataTemplate.someText( 'Rector name, ' + 'Доцент, три пяди во лбу и вообще мастер своего дела'));
            }
            arr.push(this.docxGeneratorDataTemplate.emptyParagraph());
            let coun: number;
            coun = 2;
            if (coun >= 2 ) // рецензенты
            {
              arr.push(this.docxGeneratorDataTemplate.someText('Рецензенты:'));
              for (let i = 0; i < this.teacher; i++) {
                arr.push(this.docxGeneratorDataTemplate.someText('Рецензент name' + i.toString() + ', ' + 'Доцент, три пяди во лбу и вообще мастер своего дела'));
              }
            }
            else
            {
              arr.push(this.docxGeneratorDataTemplate.someText( 'Рецензент:'));
              arr.push(this.docxGeneratorDataTemplate
                .someText( 'Рецензент name, ' + 'Доцент, три пяди во лбу и вообще мастер своего дела'));
            }
            for (let i = 0; i < 20; i++)
            {
              arr.push(this.docxGeneratorDataTemplate.emptyParagraph());
            }
            arr.push( this.docxGeneratorDataTemplate.someText('Рекомендовано к утверждению:'));
            arr.push(this.docxGeneratorDataTemplate.someText('кафедра частных методик общего среднего образования\n' +
              'государственного учреждения образования\n' +
              '«Минский областной институт развития образования»\n' +
              'протокол заседания от ____________ ' + this.docxGeneratorDataTemplate.getNowYear() + ' № ______\n'));
            arr.push(this.docxGeneratorDataTemplate.emptyParagraph());
            arr.push(this.docxGeneratorDataTemplate.someText('научно-методический совет\n' +
              'государственного учреждения образования \n' +
              '«Минский областной институт развития образования»\n' +
              'протокол заседания от ____________ ' + this.docxGeneratorDataTemplate.getNowYear() + ' № ______\n'));
            arr.push(this.docxGeneratorDataTemplate.pageBreak());
            return arr;
          })
          .reduce((prev, curr) => prev.concat(curr), []),
        //#endregion

        //#region "Third page"
        ...internalParameter
          .map((nothing) => {
            const arr: Paragraph[] = [];
            arr.push(this.docxGeneratorDataTemplate.titleText('введение'));
            arr.push(this.docxGeneratorDataTemplate.emptyParagraph());
            arr.push(this.docxGeneratorDataTemplate.someText('Актуальность.', 720,  true));
            arr.push(this.docxGeneratorDataTemplate.someText('some text'));
            arr.push(this.docxGeneratorDataTemplate.someText('Цель.', 720, true));
            arr.push(this.docxGeneratorDataTemplate.someText('some text'));
            arr.push(this.docxGeneratorDataTemplate.someText('Задачи.', 720, true));
            arr.push(this.docxGeneratorDataTemplate.someText('some text'));
            arr.push(this.docxGeneratorDataTemplate
              .someText('Основные требования к результатам учебной деятельности слушателей.', 720, true));
            arr.push(this.docxGeneratorDataTemplate.someText('some text', ));
            arr.push(this.docxGeneratorDataTemplate.someText('Виды учебных занятий.', 720, true));
            arr.push(this.docxGeneratorDataTemplate.someText('some text like lections', ));
            arr.push(this.docxGeneratorDataTemplate.someText('Методы повышения квалификации..', 720, true));
            arr.push(this.docxGeneratorDataTemplate.someText('some text ', ));
            arr.push(this.docxGeneratorDataTemplate.someText('Средства повышения квалификации', 720, true));
            arr.push(this.docxGeneratorDataTemplate.someText('some text like lections', ));
            arr.push(this.docxGeneratorDataTemplate.someText('Форма итоговой аттестации.', 720, true));
            arr.push(this.docxGeneratorDataTemplate.someText(this.certificationType.name ));
            arr.push(this.docxGeneratorDataTemplate.pageBreak());
            return arr;
          })
          .reduce((prev, curr) => prev.concat(curr), []),
        //#endregion  ThirdPage

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
                  // arr.push(this.docxGeneratorDataTemplate
                  //   .someTextCurriculumTopics((index + 1) + '.' + i + ' ' + obj.topicTitle, ' (' + obj.fullName.toLowerCase() + ',' +
                  //     ' ' + obj.classHours + ' часа)', 0, true));
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
                  // arr.push(this.docxGeneratorDataTemplate
                  //   .someTextCurriculumTopics(obj.topicTitle, ' (' + obj.fullName.toLowerCase() + ', ' +
                  //     ' ' + obj.classHours + ' часа)', 0, true));
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
