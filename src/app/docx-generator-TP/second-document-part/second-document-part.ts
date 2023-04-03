import {convertMillimetersToTwip, Document, Header, PageNumberFormat} from 'docx';
import {DocxGeneratorDataTemplate} from '../../docx-generator-data-template/docx-generator-data-template';
import {TrainingProgramGenerator} from '../../models/generator-models/TrainingProgramGenerator';
import {GuidedTestWorkAssignment} from '../../models/GuidedTestWorkAssignment';
import {CurriculumTopicTrainingProgramGenerator} from '../../models/generator-models/CurriculumTopicTrainingProgramGenerator';
import {BusinessGame} from '../../training-program-constructor/training-program-certification-step/business-game-form/business-game';
import {Injector} from '@angular/core';
import {StaticData} from '../../static-data/static-data';

export class SecondDocumentPart {

  teacher: number;
  docxGeneratorDataTemplate: DocxGeneratorDataTemplate = new DocxGeneratorDataTemplate(28);
  sections: any[] = [];
  children: any[] = [];
  allInvariantCurriculumTopics: CurriculumTopicTrainingProgramGenerator[][] = [];
  testWorkAllClassHours = 0;
  staticData: StaticData = new StaticData();

  constructor(
    private trainingProgram: TrainingProgramGenerator,
    private guidedTestWorkAssignments: GuidedTestWorkAssignment[],
  ) {
  }

  public create(): Document {
    this.children.push(this.docxGeneratorDataTemplate
      .someTextCertificationType('Форма итоговой аттестации', ' - ' +
        this.trainingProgram.certificationTypeName + '.', 720, true));
    this.children.push(this.docxGeneratorDataTemplate.pageBreak());
    this.children.push(this.docxGeneratorDataTemplate.titleText('содержание'));
    this.trainingProgram.trainingProgramCurriculumSections.forEach((object, index) => {
      this.allInvariantCurriculumTopics.push([]);
      this.children.push(this.docxGeneratorDataTemplate.emptyParagraph());
      this.children.push(this.docxGeneratorDataTemplate.titleText(index + 1 + '.' + object.name));
      this.children.push(this.docxGeneratorDataTemplate.emptyParagraph());

      // Делим на инвариантную и вариативную
      const invariantCurriculumTopicsList = object.curriculumTopicTrainingPrograms.filter(a => !a.isVariable);
      const variableCurriculumTopicsList = object.curriculumTopicTrainingPrograms.filter(a => a.isVariable);

      this.children.push(this.docxGeneratorDataTemplate.someTextCenter('Инвариантная часть', 0, true));

      let i = 1;
      invariantCurriculumTopicsList.forEach(obj => {
        this.testWorkAllClassHours += obj.testWorkHours;
        this.allInvariantCurriculumTopics[index].push(obj);
        const tmpString = this.docxGeneratorDataTemplate.classHoursStringBuilder(obj, this.trainingProgram.isDistanceLearning);
        this.children.push(this.docxGeneratorDataTemplate
          .someTextCurriculumTopics((index + 1) + '.' + i + '. ' + obj.topicTitle, tmpString, 0, true));
        switch (obj.curriculumTopicTypeId) {
          case this.staticData.trainingProgramCurriculumType.DEFAULT:
            this.children.push(this.docxGeneratorDataTemplate.someText(obj.annotation, 720));
            break;
          case this.staticData.trainingProgramCurriculumType.BUSINESS_GAME:
            this.insertBusinessGame(obj.annotation, this.children);
            break;
          default:
            this.children.push(this.docxGeneratorDataTemplate.someText(obj.annotation, 720));
            break;
        }
        i++;

        // if (this.trainingProgram.isDistanceLearning && this.trainingProgram.isControlWork) {
        //   if (obj.testWorkHours !== 0) {
        //     this.children.push(this.docxGeneratorDataTemplate
        //       .independentWork('Управляемая самостоятельная работа (' + obj.testWorkHours + ' ' + this.docxGeneratorDataTemplate
        //         .classHoursEndingDeclination(obj.testWorkHours) + ')', 720));
        //   }
        //   else {
        //     this.children.push(this.docxGeneratorDataTemplate
        //       .independentWork('Управляемая самостоятельная работа', 720));
        //   }
        // }
      });

      if (variableCurriculumTopicsList.length !== 0) {
        this.children.push(this.docxGeneratorDataTemplate.someTextCenter('Вариативная часть', 0, true));
      }

      let j = 1;
      variableCurriculumTopicsList.forEach(obj => {
        const tmpString = this.docxGeneratorDataTemplate.classHoursStringBuilder(obj, this.trainingProgram.isDistanceLearning);
        this.children.push(this.docxGeneratorDataTemplate
          .someTextCurriculumTopics(obj.topicTitle, tmpString, 0, true));
        switch (obj.curriculumTopicTypeId) {
          case this.staticData.trainingProgramCurriculumType.DEFAULT:
            this.children.push(this.docxGeneratorDataTemplate.someText(obj.annotation, 720));
            break;
          case this.staticData.trainingProgramCurriculumType.BUSINESS_GAME:
            this.insertBusinessGame(obj.annotation, this.children);
            break;
          default:
            this.children.push(this.docxGeneratorDataTemplate.someText(obj.annotation, 720));
            break;
        }
        j++;

        // if (this.trainingProgram.isDistanceLearning && this.trainingProgram.isTestWork) {
        //   if (obj.testWorkHours !== 0) {
        //     this.children.push(this.docxGeneratorDataTemplate
        //       .independentWork('Управляемая самостоятельная работа (' + obj.testWorkHours  + ' ' + this.docxGeneratorDataTemplate
        //         .classHoursEndingDeclination(obj.testWorkHours) + ')', 720));
        //   }
        //   else {
        //     this.children.push(this.docxGeneratorDataTemplate
        //       .independentWork('Управляемая самостоятельная работа', 720));
        //   }
        // }
      });
      if (this.trainingProgram.isDistanceLearning && this.trainingProgram.isControlWork) {
        this.children.push(this.docxGeneratorDataTemplate
          .testWork('Контрольная работа № ' + (index + 1).toString(), 720));
        this.children.push(this.docxGeneratorDataTemplate.emptyParagraph());
      }
    });
    this.children.push(this.docxGeneratorDataTemplate.pageBreak());

    this.children.push(this.docxGeneratorDataTemplate.titleText('Материалы для итоговой аттестации слушателей'));
    this.children.push(this.docxGeneratorDataTemplate.emptyParagraph());
    if (this.trainingProgram.certificationTypeId === 5) {
      this.insertBusinessGame(this.trainingProgram.trainingProgramFinalExaminations[0].content, this.children);
    } else {
      this.children.push(this.docxGeneratorDataTemplate.someTextCenter('Вопросы для проведения зачета', 0, true));
      this.children.push(this.docxGeneratorDataTemplate.emptyParagraph());
      this.trainingProgram.trainingProgramFinalExaminations.forEach((object, i) => {
        this.children.push(this.docxGeneratorDataTemplate.someText((i + 1) +
          '. ' + object.content, 720));
      });
    }
    this.children.push(this.docxGeneratorDataTemplate.pageBreak());

    if (this.trainingProgram.isDistanceLearning) {
      this.children.push(this.docxGeneratorDataTemplate
        .guidedTestWorkTitleText('Управляемая самостоятельная работа', this.testWorkAllClassHours));
      this.children.push(this.docxGeneratorDataTemplate.emptyParagraph());
      this.children.push(this.docxGeneratorDataTemplate.emptyParagraph());

      let j = 1;
      this.allInvariantCurriculumTopics.forEach(curriculumSection => {
        let i = 1;
        curriculumSection.forEach(obj => {
          const tmpString = this.docxGeneratorDataTemplate
            .guidedTestWorkAssignmentStringBuilder(obj, this.trainingProgram.isDistanceLearning);
          this.children.push(this.docxGeneratorDataTemplate
            .someTextCurriculumTopics((j) + '.' + i + '. ' + obj.topicTitle, tmpString, 0, true));
          this.children.push(this.docxGeneratorDataTemplate
            .guidedTestWorkAssignmentSomeTextItalic(obj.testWorkHours, 720));
          i++;
          let num = 1;
          for (const guidedTestWorkAssignment of this.guidedTestWorkAssignments) {
            if (guidedTestWorkAssignment.curriculumTopicTrainingProgramId === obj.id) {
              this.children.push(this.docxGeneratorDataTemplate
                .guidedTestWorkAssignmentSomeText(num, guidedTestWorkAssignment.content));
              num++;
            }
          }
          this.children.push(this.docxGeneratorDataTemplate.emptyParagraph());
        });
        j++;
      });
      this.children.push(this.docxGeneratorDataTemplate.pageBreak());
    }

    let indx = 0;
    this.children.push(this.docxGeneratorDataTemplate.titleText('список рекомендуемой литературы'));
    this.children.push(this.docxGeneratorDataTemplate.emptyParagraph());
    this.children.push(this.docxGeneratorDataTemplate.someText('Основная', 720, true));
    this.trainingProgram.trainingProgramMainLiteratures.forEach((object, i) => {
      let text = (i + 1) + '. ' + object.content;
      text += object.accessDateEnabled ? ` – Дата доступа: ${new Date(object.accessDate).toLocaleDateString()}.` : '';
      this.children.push(this.docxGeneratorDataTemplate.someText(text, 720));
      indx = i + 1;
    });
    this.children.push(this.docxGeneratorDataTemplate.emptyParagraph());
    this.children.push(this.docxGeneratorDataTemplate.someText('Дополнительная', 720, true));
    this.trainingProgram.trainingProgramAdditionalLiteratures.forEach((object) => {
      indx = indx + 1;
      let text = indx + '. ' + object.content;
      text += object.accessDateEnabled ? ` – Дата доступа: ${new Date(object.accessDate).toLocaleDateString()}.` : '';
      this.children.push(this.docxGeneratorDataTemplate.someText(text, 720));
    });
    this.children.push(this.docxGeneratorDataTemplate.emptyParagraph());
    this.children.push(this.docxGeneratorDataTemplate.someText('Нормативные правовые акты', 720, true));
    this.trainingProgram.trainingProgramRegulations.forEach((object) => {
      indx = indx + 1;
      let text = indx + '. ' + object.content;
      text += object.accessDateEnabled ? ` – Дата доступа: ${new Date(object.accessDate).toLocaleDateString()}.` : '';
      this.children.push(this.docxGeneratorDataTemplate.someText(text, 720));
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
        paragraphStyles: [{
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

  insertBusinessGame(baseString: string, pushArray: any): void{
    const bGameObject: BusinessGame = new BusinessGame();
    //bGameObject.parseToView(this.trainingProgram.trainingProgramFinalExaminations[0].content);
    bGameObject.parseToView(baseString);

    pushArray.push(this.docxGeneratorDataTemplate.someTextCenter('Собеседование (деловая игра)', 0, true));
    pushArray.push(this.docxGeneratorDataTemplate.emptyParagraph());
    if (bGameObject.task.length > 0) {
      pushArray.push(this.docxGeneratorDataTemplate.someText('Задачи:', 720, false, true));
      bGameObject.task.forEach((text, i) => {
        pushArray.push(this.docxGeneratorDataTemplate.someText(text, 720));
      });
    }
    pushArray.push(this.docxGeneratorDataTemplate.someText('Сценарий', 720, false, true));
    if (bGameObject.intro.length > 0) {
      pushArray.push(this.docxGeneratorDataTemplate.someText('Вводная часть:', 720, false, true));
      bGameObject.intro.forEach((text, i) => {
        pushArray.push(this.docxGeneratorDataTemplate.someText(text, 720));
      });
    }
    if (bGameObject.main.length > 0) {
      pushArray.push(this.docxGeneratorDataTemplate.someText('Основаная часть:', 720, false, true));
      bGameObject.main.forEach((text, i) => {
        pushArray.push(this.docxGeneratorDataTemplate.someText(text, 720));
      });
    }
    if (bGameObject.ending.length > 0) {
      pushArray.push(this.docxGeneratorDataTemplate.someText('Заключительная часть:', 720, false, true));
      bGameObject.ending.forEach((text, i) => {
        pushArray.push(this.docxGeneratorDataTemplate.someText(text, 720));
      });
    }
  }
}
