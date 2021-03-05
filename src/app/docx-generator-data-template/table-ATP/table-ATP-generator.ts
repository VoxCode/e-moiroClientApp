import {TrainingProgramCurriculumSection} from '../../models/TrainingProgramCurriculumSection';
import {CurriculumTopicTrainingProgram} from '../../models/СurriculumTopicTrainingProgram';
import {OccupationForm} from '../../models/OccupationForm';
import {TrainingProgram} from '../../models/TrainingProgram';
import {Department} from '../../models/Department';
import {CertificationType} from '../../models/CertificationType';
import {Paragraph, Table, TableCell, TableRow, TextRun} from 'docx';
import {VariableCurriculumSectionAllClassHours} from './table-class-hours/variable-curriculum-section-all-class-hours';
import {VariableCurriculumSectionOccupationFormAllClassHours} from './table-class-hours/variable-curriculum-section-occupation-form-all-class-hours';
import {TrainingProgramAllClassHours} from './table-class-hours/training-program-all-class-hours';
import {TrainingProgramOccupationFormAllClassHours} from './table-class-hours/training-program-occupation-form-all-class-hours';
import {TableHeaderFirstRow} from './table-ATP-structure/table-header/table-header-first-row';
import {TableHeaderSecondRow} from './table-ATP-structure/table-header/table-header-second-row';
import {TableHeaderThirdRow} from './table-ATP-structure/table-header/table-header-third-row';
import {TableHeaderFourthRow} from './table-ATP-structure/table-header/table-header-fourth-row';
import {TableCurriculumSection} from './table-ATP-structure/table-curriculum-section';
import {TableCurriculumTopic} from './table-ATP-structure/table-curriculum-topic';
import {TableInvariantSection} from './table-ATP-structure/table-invariant-section';
import {TableVariableSection} from "./table-ATP-structure/table-variable-section";

export class TableATPGenerator {
  constructor() {
  }
  public tableATP(
    trainingProgramCurriculumSections: TrainingProgramCurriculumSection[],
    curriculumTopicsList: CurriculumTopicTrainingProgram[][],
    occupationForms: OccupationForm[],
    trainingProgram: TrainingProgram,
    department: Department,
    certificationType: CertificationType): Table{
    const row: any = [];
    const firstRow = new TableHeaderFirstRow(occupationForms);
    const secondRow = new TableHeaderSecondRow(occupationForms);
    const thirdRow = new TableHeaderThirdRow(occupationForms);
    const fourthRow = new TableHeaderFourthRow(occupationForms.length);
    row.push(firstRow.insert());
    row.push(secondRow.insert());
    row.push(thirdRow.insert());
    row.push(fourthRow.insert());

    trainingProgramCurriculumSections.forEach((obj, index) => {
      let tableCurriculumSection = new TableCurriculumSection(obj, index, curriculumTopicsList[index], occupationForms);
      row.push(tableCurriculumSection.insert());
      tableCurriculumSection = null;

      if (!trainingProgram.isDistanceLearning) {
        let invariantTableRow = new TableInvariantSection(curriculumTopicsList[index], occupationForms);
        row.push(invariantTableRow.insert());
        invariantTableRow = null;
      }
      let i = 0;
      const invariantCurriculumTopicsList = curriculumTopicsList[index].filter(a => !a.isVariable);
      const variableCurriculumTopicsList = curriculumTopicsList[index].filter(a => a.isVariable);
      curriculumTopicsList[index].forEach(curriculumTopic => {
        if (!curriculumTopic.isVariable || trainingProgram.isDistanceLearning) {
          let invariantTableCurriculumTopic = new TableCurriculumTopic(
            curriculumTopic, index, i, occupationForms, false, department, invariantCurriculumTopicsList);
          row.push(invariantTableCurriculumTopic.insert());
          invariantTableCurriculumTopic = null;
          ++i;
        }
      });
      if (!trainingProgram.isDistanceLearning) {
        let variableTableRow = new TableVariableSection(curriculumTopicsList[index], occupationForms);
        row.push(variableTableRow.insert());
        variableTableRow = null;
        let j = 0;
        curriculumTopicsList[index].forEach(curriculumTopic => {
          if (curriculumTopic.isVariable){
            let variableTableCurriculumTopic = new TableCurriculumTopic(
              curriculumTopic, index, j, occupationForms, true, department, variableCurriculumTopicsList);
            row.push(variableTableCurriculumTopic.insert());
            variableTableCurriculumTopic = null;
            j++;
          }
        });
      }
    });
    row.push(this.resultsTableRow(curriculumTopicsList, occupationForms));
    row.push(this.certificationTypeRow(occupationForms.length, certificationType.name));

    return new Table({
      rows: row
    });
  }

  public resultsTableRow(
    curriculumTopicsList: CurriculumTopicTrainingProgram[][],
    occupationForms: OccupationForm[]): TableRow {
    const child: any = [];
    const tmpClassHours = new TrainingProgramAllClassHours(curriculumTopicsList);
    const tmpOccupationFormClassHours = new TrainingProgramOccupationFormAllClassHours(curriculumTopicsList, occupationForms);
    const tmpClassHoursList = tmpOccupationFormClassHours.getTrainingProgramAllClassHours;
    child.push(new TableCell({
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: 'ВСЕГО',
              bold : true,
              allCaps: true
            }),
          ]
        })
      ]
    }));
    child.push(new TableCell({
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: tmpClassHours.getTrainingProgramAllClassHours.toString(),
              bold : true,
            }),
          ]
        })
      ]
    }));
    tmpClassHoursList.forEach((obj, i) => {
      if (i !== 6) {
        if (obj === 0) {
          child.push(new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: '',
                  }),
                ]
              })
            ]
          }));
        }
        else {
          child.push(new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: obj.toString(),
                  }),
                ]
              })
            ]
          }));
        }
      }
    });
    child.push(new TableCell({
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: '',
              bold : true,
            }),
          ]
        })
      ]
    }));
    return new TableRow({
      children: child,
      cantSplit: true
    });
  }

  public certificationTypeRow(occupationFormLength: number, certificationTypeName: string): TableRow {
    const child: any = [];
    child.push(new TableCell({
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: 'Форма итоговой аттестации',
            }),
          ]
        })
      ],
    }));
    child.push(new TableCell({
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: certificationTypeName.toLowerCase(),
            }),
          ]
        })
      ],
      columnSpan: occupationFormLength
    }));
    child.push(new TableCell({
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: '',
            }),
          ]
        })
      ],
    }));
    return new TableRow({
      children: child,
      cantSplit: true
    });
  }
}
