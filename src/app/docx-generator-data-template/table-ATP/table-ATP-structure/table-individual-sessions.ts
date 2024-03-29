import {Paragraph, TableCell, TableRow, TextRun} from 'docx';
import {TableCellDefaultText} from '../table-cell-templates/table-cell-default-text';
import {EmptyTableCell} from '../table-cell-templates/empty-table-cell';

export class TableIndividualSessions {
  constructor(private occupationFormsLength: number,
              private departmentName: string) {
  }

  public insert(): TableRow {
    const child: any = [];
    const defaultTableCell = new TableCellDefaultText();
    const emptyTableCell = new EmptyTableCell();
    child.push(defaultTableCell.insertText('Индивидуальные консультации (на одного слушателя)'));
    child.push(new TableCell({
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: '0,25'
            }),
          ]
        })
      ]
    }));
    for (let i = 0; i < this.occupationFormsLength; i++) {
      child.push(emptyTableCell.insert());
    }
    child.push(defaultTableCell.insertText(this.departmentName.substr(this.departmentName.indexOf(' ') + 1)));

    return new TableRow({
      children: child,
      cantSplit: true
    });
  }
}
