import {OccupationForm} from '../../../../models/OccupationForm';
import {convertMillimetersToTwip, Paragraph, TableCell, TableRow, TextRun, WidthType} from 'docx';
import {TableCellBoldText} from '../../table-cell-templates/table-cell-bold-text';

export class TableHeaderThirdRow {
  private child: any = [];
  private tableCellBoldText = new TableCellBoldText();
  constructor(private occupationForms: OccupationForm[]) {

    this.child.push(this.tableCellBoldText.insertText('Всего'));
    occupationForms.forEach(obj => {
      if (obj.id !== 1){
        this.child.push(new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: obj.fullName,
                })
              ]
            })
          ],
          width: {
            size: 5,
            type: WidthType.DXA
          }
        }));
      }
    });
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
