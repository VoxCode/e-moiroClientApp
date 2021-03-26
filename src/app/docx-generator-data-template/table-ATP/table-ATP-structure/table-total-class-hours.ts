import {CurriculumTopicTrainingProgram} from '../../../models/СurriculumTopicTrainingProgram';
import {OccupationForm} from '../../../models/OccupationForm';
import {Paragraph, TableCell, TableRow, TextRun} from 'docx';
import {TrainingProgramAllClassHours} from '../table-class-hours/training-program-all-class-hours';
import {TrainingProgramOccupationFormAllClassHours} from '../table-class-hours/training-program-occupation-form-all-class-hours';
import {EmptyTableCell} from '../table-cell-templates/empty-table-cell';
import {TableCellBoldTextAlignmentCenter} from '../table-cell-templates/table-cell-bold-text-alignment-center';
import {TableCellDefaultTextAlignmentCenter} from '../table-cell-templates/table-cell-default-text-alignment-center';

export class TableTotalClassHours {
  constructor(
    private curriculumTopicsList: CurriculumTopicTrainingProgram[][],
    private occupationForms: OccupationForm[]
  ) {
  }

  public insert(): TableRow {
    const tableCellBoldText = new TableCellBoldTextAlignmentCenter();
    const emptyTableCell = new EmptyTableCell();
    const defaultTableCell = new TableCellDefaultTextAlignmentCenter();
    const child: any = [];
    const tmpClassHours = new TrainingProgramAllClassHours(this.curriculumTopicsList);
    const tmpOccupationFormClassHours = new TrainingProgramOccupationFormAllClassHours(this.curriculumTopicsList, this.occupationForms);
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
    child.push(tableCellBoldText.insertText(tmpClassHours.getTrainingProgramAllClassHours.toString()));
    tmpClassHoursList.forEach((obj, i) => {
      if (obj === 0) {
        child.push(emptyTableCell.insert());
      }
      else {
        child.push(defaultTableCell.insertText(obj.toString()));
      }
    });
    child.push(emptyTableCell.insert());

    return new TableRow({
      children: child,
      cantSplit: true
    });
  }
}
