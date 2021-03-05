import {TableRow} from 'docx';
import {TableCellDefaultText} from '../table-cell-templates/table-cell-default-text';
import {EmptyTableCell} from '../table-cell-templates/empty-table-cell';
import {OccupationForm} from '../../../models/OccupationForm';

export class TableIndividualSessions {
  constructor(private occupationForms: OccupationForm[]) {
  }

  public insert(): TableRow {
    const child: any = [];
    const defaultTableCell = new TableCellDefaultText();
    const emptyTableCell = new EmptyTableCell();
    child.push(defaultTableCell.insertText('Индивидуальные консультации (на одного слушателя)'));
    this.occupationForms.forEach((obj, i) => {
      child.push(emptyTableCell.insert());
      child.push(defaultTableCell.insertText(obj.toString()));
    });

    return new TableRow({
      children: child,
      cantSplit: true
    });
  }
}
