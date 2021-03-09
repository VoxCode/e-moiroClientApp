import {Paragraph, TableCell, TableRow, TextRun} from 'docx';
import {TableCellDefaultText} from '../table-cell-templates/table-cell-default-text';
import {EmptyTableCell} from '../table-cell-templates/empty-table-cell';
import {OccupationForm} from '../../../models/OccupationForm';
import {Department} from '../../../models/Department';

export class TableIndividualSessions {
  constructor(private occupationForms: OccupationForm[],
              private department: Department) {
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
              text: '0,25',
              size: 20
            }),
          ]
        })
      ]
    }));
    this.occupationForms.forEach((obj, i) => {
      if (i !== 6) {
        child.push(emptyTableCell.insert());
      }
    });
    child.push(defaultTableCell.insertText(this.department.name.substr(this.department.name.indexOf(' ') + 1)));

    return new TableRow({
      children: child,
      cantSplit: true
    });
  }
}
