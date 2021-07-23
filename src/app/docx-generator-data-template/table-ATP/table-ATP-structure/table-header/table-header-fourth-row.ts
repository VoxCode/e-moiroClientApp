import {AlignmentType, convertMillimetersToTwip, Paragraph, TableCell, TableRow, WidthType} from 'docx';

export class TableHeaderFourthRow {
  private child: any = [];
  constructor(occupationFormLength: number, isDistance?: boolean) {
    occupationFormLength = occupationFormLength + 3;
    // if (isDistance) {
    //   occupationFormLength = occupationFormLength + 4;
    // }
    // else {
    //   occupationFormLength = occupationFormLength + 3;
    // }
    for (let i = 1; i <= occupationFormLength; i++){
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
