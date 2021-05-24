import {Paragraph, TableCell, TableRow, TextRun} from 'docx';
import {EmptyTableCell} from '../table-cell-templates/empty-table-cell';
import {TableCellBoldTextAlignmentCenter} from '../table-cell-templates/table-cell-bold-text-alignment-center';
import {TableCellDefaultTextAlignmentCenter} from '../table-cell-templates/table-cell-default-text-alignment-center';
import {TotalClassHours} from '../table-class-hours/total-class-hours';

export class TableTotalClassHours {
  constructor(
    private classHours: number[]) {
  }

  public insert(): TableRow {
    const tableCellBoldText = new TableCellBoldTextAlignmentCenter();
    const emptyTableCell = new EmptyTableCell();
    const defaultTableCell = new TableCellDefaultTextAlignmentCenter();
    const child: any = [];
    const allClassHours = new TotalClassHours(this.classHours);
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
    child.push(tableCellBoldText.insertText(allClassHours.allClassHours.toString()));
    this.classHours.forEach((obj) => {
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
