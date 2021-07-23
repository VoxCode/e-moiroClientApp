import {AlignmentType, Paragraph, TableCell, TableRow, TextRun, VerticalAlign} from 'docx';
import {TableCellDefaultText} from '../table-cell-templates/table-cell-default-text';
import {EmptyTableCell} from '../table-cell-templates/empty-table-cell';

export class DistanceTableCurrentIndividualSessions {
  constructor(private occupationFormsLength: number) {
  }

  public insert(isForum: boolean): TableRow {
    let forum = '';
    if (isForum) {
      forum = ': форум';
    }
    const child: any = [];
    const defaultTableCell = new TableCellDefaultText();
    const emptyTableCell = new EmptyTableCell();
    child.push(defaultTableCell.insertText('Текущие индивидуальные консультации (на одного слушателя)' + forum));
    child.push(new TableCell({
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: '0,15'
            }),
          ],
          alignment: AlignmentType.LEFT
        })
      ],
      verticalAlign: VerticalAlign.CENTER
    }));
    for (let i = 0; i < this.occupationFormsLength; i++) {
      child.push(emptyTableCell.insert());
    }


    return new TableRow({
      children: child,
      cantSplit: true
    });
  }
}
