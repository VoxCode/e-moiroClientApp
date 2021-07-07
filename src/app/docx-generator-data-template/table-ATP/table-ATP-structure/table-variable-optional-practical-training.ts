import {TableRow} from 'docx';
import {EmptyTableCell} from '../table-cell-templates/empty-table-cell';
import {TableCellDefaultTextAlignmentCenter} from '../table-cell-templates/table-cell-default-text-alignment-center';
import {TableCellBoldTextAlignmentCenter} from '../table-cell-templates/table-cell-bold-text-alignment-center';
import {TotalClassHours} from '../table-class-hours/total-class-hours';
import {TableCellItalicText} from '../table-cell-templates/table-cell-italic-text';

export class TableVariableOptionalPracticalTraining {
  private child: any = [];
  constructor(
    private classHours: number[]) {
  }

  public insert(): TableRow {
    const tableCellItalicText = new TableCellItalicText();
    const tableCellBoldTextCenter = new TableCellBoldTextAlignmentCenter();
    const emptyTableCell = new EmptyTableCell();
    const defaultTableCell = new TableCellDefaultTextAlignmentCenter();
    const allClassHours = new TotalClassHours(this.classHours);
    this.child.push(tableCellItalicText.insertText('Практические занятия по выбору'));
    this.child.push(tableCellBoldTextCenter.insertText(allClassHours.allClassHours.toString()));
    this.classHours.forEach((obj) => {
      if (obj === 0) {
        this.child.push(emptyTableCell.insert());
      }
      else {
        this.child.push(defaultTableCell.insertText(obj.toString()));
      }
    });
    this.child.push(emptyTableCell.insert());

    return new TableRow({
      children: this.child,
      cantSplit: true
    });
  }
}
