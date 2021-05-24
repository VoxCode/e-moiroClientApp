import {TableRow} from 'docx';
import {TableCellBoldText} from '../table-cell-templates/table-cell-bold-text';
import {EmptyTableCell} from '../table-cell-templates/empty-table-cell';
import {TableCellDefaultTextAlignmentCenter} from '../table-cell-templates/table-cell-default-text-alignment-center';
import {TableCellBoldTextAlignmentCenter} from '../table-cell-templates/table-cell-bold-text-alignment-center';
import {TotalClassHours} from '../table-class-hours/total-class-hours';

export class TableInvariantSection {
  private child: any = [];
  constructor(
    private classHours: number[]) {
  }

  public insert(): TableRow {
    const tableCellBoldText = new TableCellBoldText();
    const tableCellBoldTextCenter = new TableCellBoldTextAlignmentCenter();
    const emptyTableCell = new EmptyTableCell();
    const defaultTableCellCenter = new TableCellDefaultTextAlignmentCenter();
    const allClassHours = new TotalClassHours(this.classHours);
    this.child.push(tableCellBoldText.insertText('Инвариантная часть'));
    this.child.push(tableCellBoldTextCenter.insertText(allClassHours.allClassHours.toString()));
    this.classHours.forEach((obj) => {
      if (obj === 0) {
        this.child.push(emptyTableCell.insert());
      }
      else {
        this.child.push(defaultTableCellCenter.insertText(obj.toString()));
      }
    });
    this.child.push(emptyTableCell.insert());
    return new TableRow({
      children: this.child,
      cantSplit: true
    });
  }
}
