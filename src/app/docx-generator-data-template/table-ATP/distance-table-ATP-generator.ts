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

export class DistanceTableATPGenerator {
  constructor() {
  }
  public tableATP(
    occupationForms: OccupationForm[],
    trainingProgram: TrainingProgramGenerator): Table{
    const row: any = [];
    const firstRow = new TableHeaderFirstRow(occupationForms.length, true);
    const secondRow = new TableHeaderSecondRow(occupationForms.length, true);
    const thirdRow = new TableHeaderThirdRow(occupationForms, true);
    const fourthRow = new TableHeaderFourthRow(occupationForms.length, true);
    const tableCertificationType = new TableCertificationType(
      occupationForms.length + 1, trainingProgram.certificationTypeName);
    const tableControlWork = new TableControlWork(occupationForms.length + 1);
    const tableCurrentIndividualSessions = new DistanceTableCurrentIndividualSessions(
      occupationForms.length + 1, trainingProgram.departmentName);
    const tableIndividualSessions = new DistanceTableIndividualSessions(
      occupationForms.length + 1);
    const totalTrainingProgramClassHoursList: number[] = [];
    occupationForms.forEach(() => {
      totalTrainingProgramClassHoursList.push(0);
    });
    totalTrainingProgramClassHoursList.push(0);

    row.push(firstRow.insert());
    row.push(secondRow.insert());
    row.push(thirdRow.insert());
    row.push(fourthRow.insert());

    trainingProgram.trainingProgramCurriculumSections.forEach((obj, index) => {
      const allOccupationFormsClassHours = new DistanceCurriculumSectionOccupationFormAllClassHours(
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

      let i = 0;
      obj.curriculumTopicTrainingPrograms.forEach(curriculumTopic => {
        let tableCurriculumTopic = new DistanceTableCurriculumTopic(
          curriculumTopic, index, i, occupationForms,
          trainingProgram.departmentName, obj.curriculumTopicTrainingPrograms.length);
        row.push(tableCurriculumTopic.insert());
        tableCurriculumTopic = null;
        ++i;
      });

      row.push(tableControlWork.insert(index));
    });
    const tableTotalClassHours = new TableTotalClassHours(totalTrainingProgramClassHoursList);
    row.push(tableTotalClassHours.insert());
    row.push(tableCertificationType.insert());
    row.push(tableCurrentIndividualSessions.insert());
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
