import {Paragraph, TableCell, TableRow, TextRun} from 'docx';
import {TableCellDefaultText} from '../table-cell-templates/table-cell-default-text';
import {EmptyTableCell} from '../table-cell-templates/empty-table-cell';

export class DistanceTableCurrentIndividualSessions {
  constructor(private occupationFormsLength: number,
              private departmentName: string) {
  }

  public insert(): TableRow {
    const child: any = [];
    const defaultTableCell = new TableCellDefaultText();
    const emptyTableCell = new EmptyTableCell();
    child.push(defaultTableCell.insertText('Текущие индивидуальные консультации (на одного слушателя): форум'));
    child.push(new TableCell({
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: '0,15',
              size: 20
            }),
          ]
        })
      ]
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
      rowSpan: 2
    }));

    return new TableRow({
      children: child,
      cantSplit: true
    });
  }
}
