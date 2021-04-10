import {AlignmentType, convertMillimetersToTwip, Paragraph, TableCell, TableRow, WidthType} from 'docx';

export class TableHeaderFourthRow {
  private child: any = [];
  constructor(occupationFormLength: number) {
    for (let i = 1; i <= occupationFormLength + 3; i++){
      this.child.push(new TableCell({
        children: [
          new Paragraph({text: i.toString(), alignment: AlignmentType.CENTER})
        ],
        width: {
          size: convertMillimetersToTwip(10),
          type: WidthType.DXA
        }
      }));
    }
  }

  public insert(): TableRow
  {
    return new TableRow({
      children: this.child,
      tableHeader: true,

    });
  }
}
