import {OccupationForm} from '../../models/OccupationForm';
import {convertMillimetersToTwip, Table, WidthType} from 'docx';
import {TableHeaderFirstRow} from './table-ATP-structure/table-header/table-header-first-row';
import {TableHeaderSecondRow} from './table-ATP-structure/table-header/table-header-second-row';
import {TableHeaderThirdRow} from './table-ATP-structure/table-header/table-header-third-row';
import {TableHeaderFourthRow} from './table-ATP-structure/table-header/table-header-fourth-row';
import {TableCurriculumSection} from './table-ATP-structure/table-curriculum-section';
import {TableCurriculumTopic} from './table-ATP-structure/table-curriculum-topic';
import {TableInvariantSection} from './table-ATP-structure/table-invariant-section';
import {TableVariableSection} from './table-ATP-structure/table-variable-section';
import {TableTotalClassHours} from './table-ATP-structure/table-total-class-hours';
import {TableCertificationType} from './table-ATP-structure/table-certification-type';
import {TableIndividualSessions} from './table-ATP-structure/table-individual-sessions';
import {TrainingProgramGenerator} from '../../models/generator-models/TrainingProgramGenerator';
import {CurriculumSectionOccupationFormAllClassHours} from './table-class-hours/curriculum-section-occupation-form-all-class-hours';

export class TableATPGenerator {
  constructor() {
  }
  public tableATP(
    occupationForms: OccupationForm[],
    trainingProgram: TrainingProgramGenerator): Table{
    const row: any = [];
    const firstRow = new TableHeaderFirstRow(occupationForms);
    const secondRow = new TableHeaderSecondRow(occupationForms);
    const thirdRow = new TableHeaderThirdRow(occupationForms);
    const fourthRow = new TableHeaderFourthRow(occupationForms.length);
    const tableCertificationType = new TableCertificationType(occupationForms.length, trainingProgram.certificationTypeName);
    const tableIndividualSessions = new TableIndividualSessions(occupationForms, trainingProgram.departmentName);
    const totalTrainingProgramClassHoursList: number[] = [];
    occupationForms.forEach(() => {
      totalTrainingProgramClassHoursList.push(0);
    });
    row.push(firstRow.insert());
    row.push(secondRow.insert());
    row.push(thirdRow.insert());
    row.push(fourthRow.insert());

    trainingProgram.trainingProgramCurriculumSections.forEach((obj, index) => {
      const allOccupationFormsClassHours = new CurriculumSectionOccupationFormAllClassHours(
        obj, occupationForms);
      allOccupationFormsClassHours.curriculumSectionClassHours.forEach((tmp, id) => {
        totalTrainingProgramClassHoursList[id] += tmp;
      });

      // общая сумма часов в рамках раздела
      let tableCurriculumSection = new TableCurriculumSection(
        obj,
        index,
        allOccupationFormsClassHours.curriculumSectionClassHours);
      row.push(tableCurriculumSection.insert());
      tableCurriculumSection = null;

      // общая сумма часов в рамках инвариантной части (если программа не является дистанционной)
      if (!trainingProgram.isDistanceLearning) {
        let invariantTableRow = new TableInvariantSection(allOccupationFormsClassHours.invariantClassHours);
        row.push(invariantTableRow.insert());
        invariantTableRow = null;
      }

      let i = 0;
      const invariantCurriculumTopicsList = obj.curriculumTopicTrainingPrograms.filter(a => !a.isVariable);
      const variableCurriculumTopicsList = obj.curriculumTopicTrainingPrograms.filter(a => a.isVariable);

      obj.curriculumTopicTrainingPrograms.forEach(curriculumTopic => {
        if (!curriculumTopic.isVariable || trainingProgram.isDistanceLearning) {
          let invariantTableCurriculumTopic = new TableCurriculumTopic(
            curriculumTopic, index, i, occupationForms,
            false, trainingProgram.departmentName, invariantCurriculumTopicsList.length);
          row.push(invariantTableCurriculumTopic.insert());
          invariantTableCurriculumTopic = null;
          ++i;
        }
      });

      // общая сумма часов в рамках вариативной части (если программа не является дистанционной)
      if (!trainingProgram.isDistanceLearning) {
        let variableTableRow = new TableVariableSection(allOccupationFormsClassHours.variableClassHours);
        row.push(variableTableRow.insert());
        variableTableRow = null;

        let j = 0;
        obj.curriculumTopicTrainingPrograms.forEach(curriculumTopic => {
          if (curriculumTopic.isVariable){
            let variableTableCurriculumTopic = new TableCurriculumTopic(
              curriculumTopic, index, j, occupationForms,
              true, trainingProgram.departmentName, variableCurriculumTopicsList.length);
            row.push(variableTableCurriculumTopic.insert());
            variableTableCurriculumTopic = null;
            j++;
          }
        });
      }
    });
    const tableTotalClassHours = new TableTotalClassHours(totalTrainingProgramClassHoursList);
    row.push(tableTotalClassHours.insert());
    row.push(tableCertificationType.insert());
    row.push(tableIndividualSessions.insert());

    return new Table({
      rows: row,
      width: {
        size: convertMillimetersToTwip(165.4),
        type: WidthType.DXA,
      },
      margins: {
        left: convertMillimetersToTwip(1.9),
        right: convertMillimetersToTwip(1.9)
      }
    });
  }
}
