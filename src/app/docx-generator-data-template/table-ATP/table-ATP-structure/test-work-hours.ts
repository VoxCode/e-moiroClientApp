import {AlignmentType, Paragraph, TableCell, TableRow, TextRun, VerticalAlign} from 'docx';
import {TableCellDefaultText} from '../table-cell-templates/table-cell-default-text';
import {EmptyTableCell} from '../table-cell-templates/empty-table-cell';
import {TableCellItalicText} from '../table-cell-templates/table-cell-italic-text';

export class TestWorkHours {
  constructor(private occupationFormsLength: number,
              private departmentName: string) {
  }

  public insert(totalHours: number): TableRow {
    const child: any = [];
    const defaultTableCell = new TableCellDefaultText();
    const tableCellItalicText = new TableCellItalicText();
    const emptyTableCell = new EmptyTableCell();
    child.push(tableCellItalicText.insertText('Управляемая самостоятельная\n работа'));
    child.push(new TableCell({
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: totalHours.toString(),
              bold: true
            }),
          ],
          alignment: AlignmentType.LEFT,
        })
      ],
      verticalAlign: VerticalAlign.CENTER
    }));
    for (let i = 0; i < this.occupationFormsLength; i++) {
      child.push(emptyTableCell.insert());
    }
    child.push(new TableCell({
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text:  this.departmentName.substr(this.departmentName.indexOf(' ') + 1),
            })
          ],
        })
      ],
      rowSpan: 3
    }));

    return new TableRow({
      children: child,
      cantSplit: true
    });
  }
}
