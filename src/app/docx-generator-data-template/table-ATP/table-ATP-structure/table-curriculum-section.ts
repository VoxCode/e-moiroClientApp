import {Paragraph, TableCell, TableRow, TextRun} from 'docx';
import {CapitalizeFirstLetter} from '../capitalize-first-letter';
import {EmptyTableCell} from '../table-cell-templates/empty-table-cell';
import {TableCellBoldTextAlignmentCenter} from '../table-cell-templates/table-cell-bold-text-alignment-center';
import {TrainingProgramCurriculumSectionGenerator} from '../../../models/generator-models/TrainingProgramCurriculumSectionGenerator';
import {TotalClassHours} from '../table-class-hours/total-class-hours';

export class TableCurriculumSection {
  private child: any = [];
  private capitalize = new CapitalizeFirstLetter();
  private emptyTableCell = new EmptyTableCell();
  constructor(
    private trainingProgramCurriculumSection: TrainingProgramCurriculumSectionGenerator,
    private readonly index: number,
    private curriculumSectionClassHours: number[]) {
    const allClassHours = new TotalClassHours(curriculumSectionClassHours);
    const tableCellBoldText = new TableCellBoldTextAlignmentCenter();
    this.child.push(new TableCell({
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: (++this.index) + '. ' + this.capitalize.capitalizeFirstLetter(this.trainingProgramCurriculumSection.name),
              bold : true,
            }),
          ]
        })
      ]
    }));
    this.child.push(tableCellBoldText.insertText(allClassHours.allClassHours.toString()));

    this.curriculumSectionClassHours.forEach((object) => {
      if (object === 0) {
        this.child.push(this.emptyTableCell.insert());
      }
      else {
        this.child.push(tableCellBoldText.insertText(object.toString()));
      }
    });
    this.child.push(this.emptyTableCell.insert());
  }

  public insert(): TableRow
  {
    return new TableRow({
      children: this.child,
      cantSplit: true
    });
  }
}
