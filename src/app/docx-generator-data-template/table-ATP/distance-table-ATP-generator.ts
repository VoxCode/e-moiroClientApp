import {OccupationForm} from '../../models/OccupationForm';
import {convertMillimetersToTwip, Table, WidthType} from 'docx';
import {TableHeaderFirstRow} from './table-ATP-structure/table-header/table-header-first-row';
import {TableHeaderSecondRow} from './table-ATP-structure/table-header/table-header-second-row';
import {TableHeaderThirdRow} from './table-ATP-structure/table-header/table-header-third-row';
import {TableHeaderFourthRow} from './table-ATP-structure/table-header/table-header-fourth-row';
import {TableCurriculumSection} from './table-ATP-structure/table-curriculum-section';
import {TableTotalClassHours} from './table-ATP-structure/table-total-class-hours';
import {TableCertificationType} from './table-ATP-structure/table-certification-type';
import {TrainingProgramGenerator} from '../../models/generator-models/TrainingProgramGenerator';
import {TableControlWork} from './table-ATP-structure/table-control-work';
import {DistanceCurriculumSectionOccupationFormAllClassHours} from './table-class-hours/distance-curriculum-section-occupation-form-all-class-hours';
import {DistanceTableCurriculumTopic} from './table-ATP-structure/distance-table-curriculum-topic';
import {DistanceTableIndividualSessions} from './table-ATP-structure/distance-table-individual-sessions';
import {DistanceTableCurrentIndividualSessions} from './table-ATP-structure/distance-table-current-individual-sessions';
import {CurriculumSectionOccupationFormAllClassHours} from './table-class-hours/curriculum-section-occupation-form-all-class-hours';
import {TableInvariantSection} from './table-ATP-structure/table-invariant-section';
import {TableCurriculumTopic} from './table-ATP-structure/table-curriculum-topic';
import {TableVariableSection} from './table-ATP-structure/table-variable-section';
import {TableVariableOptionalPracticalTraining} from './table-ATP-structure/table-variable-optional-practical-training';
import {TestWorkHours} from './table-ATP-structure/test-work-hours';

export class DistanceTableATPGenerator {
  constructor() {
  }
  public tableATP(
    occupationForms: OccupationForm[],
    trainingProgram: TrainingProgramGenerator,
    isForum: boolean): Table{
    const row: any = [];
    let totalTestWorkHours = 0;
    const firstRow = new TableHeaderFirstRow(occupationForms.length, true);
    const secondRow = new TableHeaderSecondRow(occupationForms.length, true);
    const thirdRow = new TableHeaderThirdRow(occupationForms, true);
    const fourthRow = new TableHeaderFourthRow(occupationForms.length, true);
    const tableCertificationType = new TableCertificationType(
      occupationForms.length, trainingProgram.certificationTypeName);
    const tableControlWork = new TableControlWork(occupationForms.length);
    const testWorkHours = new TestWorkHours(occupationForms.length, trainingProgram.departmentName);
    const tableCurrentIndividualSessions = new DistanceTableCurrentIndividualSessions(
      occupationForms.length);
    const tableIndividualSessions = new DistanceTableIndividualSessions(
      occupationForms.length);
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

      // общая сумма часов в рамках инвариантной части
      let invariantTableRow = new TableInvariantSection(allOccupationFormsClassHours.invariantClassHours);
      row.push(invariantTableRow.insert());
      invariantTableRow = null;

      let i = 0;
      const invariantCurriculumTopicsList = obj.curriculumTopicTrainingPrograms.filter(a => !a.isVariable);
      const variableCurriculumTopicsList = obj.curriculumTopicTrainingPrograms.filter(a => a.isVariable);

      obj.curriculumTopicTrainingPrograms.forEach(curriculumTopic => {
        if (!curriculumTopic.isVariable) {
          let invariantTableCurriculumTopic = new TableCurriculumTopic(
            curriculumTopic, index, i, occupationForms,
            false, trainingProgram.departmentName, invariantCurriculumTopicsList.length);
          row.push(invariantTableCurriculumTopic.insert());
          totalTestWorkHours += curriculumTopic.testWorkHours;
          invariantTableCurriculumTopic = null;
          ++i;
        }
      });

      // общая сумма часов в рамках вариативной части
      if (obj.maxVariableTopicTimes.length !== 0) {
        let variableTableRow = new TableVariableSection(allOccupationFormsClassHours.variableClassHours);
        row.push(variableTableRow.insert());
        variableTableRow = null;
        let tableVariableOptionalPracticalTraining = new TableVariableOptionalPracticalTraining(
          allOccupationFormsClassHours.variableClassHours);
        row.push(tableVariableOptionalPracticalTraining.insert());
        tableVariableOptionalPracticalTraining = null;

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
      if (trainingProgram.isDistanceLearning) {
        row.push(tableControlWork.insert(index));
      }
    });
    const tableTotalClassHours = new TableTotalClassHours(totalTrainingProgramClassHoursList);
    row.push(tableTotalClassHours.insert());
    row.push(tableCertificationType.insert());
    row.push(testWorkHours.insert(totalTestWorkHours));
    row.push(tableCurrentIndividualSessions.insert(isForum));
    row.push(tableIndividualSessions.insert(isForum));

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
