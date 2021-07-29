import {OccupationForm} from '../../../../models/OccupationForm';
import {Paragraph, TableCell, TableRow, TextRun, WidthType} from 'docx';
import {TableCellBoldText} from '../../table-cell-templates/table-cell-bold-text';
import {TableCellDefaultText} from '../../table-cell-templates/table-cell-default-text';

export class TableHeaderThirdRow {
  private child: any = [];
  private tableCellBoldText = new TableCellBoldText();
  private tableCellText = new TableCellDefaultText();
  constructor(private occupationForms: OccupationForm[], isDistance?: boolean) {

    this.child.push(this.tableCellBoldText.insertText('Всего'));
    occupationForms.forEach(obj => {
      this.child.push(new TableCell({
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: obj.pluralName,
              })
            ]
          })
        ],
        width: {
          size: 5,
          type: WidthType.DXA
        }
      }));
    });
    // if (isDistance) {
    //   this.child.push(this.tableCellText.insertText('Управляемая', 'самостоятельная работа'));
    // }
  }

  public insert(): TableRow
  {
    return new TableRow({
      children: this.child,
      tableHeader: true,
      cantSplit: true
    });
  }
}
