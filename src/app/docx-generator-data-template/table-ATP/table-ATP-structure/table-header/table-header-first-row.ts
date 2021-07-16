import {AlignmentType, convertMillimetersToTwip, Paragraph, TableCell, TableRow, VerticalAlign, WidthType} from 'docx';

export class TableHeaderFirstRow {
  private child: any = [];
  constructor(private readonly occupationFormsLength: number, isDistance?: boolean) {
    if (isDistance) {
      this.occupationFormsLength++;
    }
    this.child.push(new TableCell({
        children: [new Paragraph({text: 'Названия разделов и тем', alignment: AlignmentType.CENTER} )],
        rowSpan: 3,
        verticalAlign: VerticalAlign.CENTER,
        width: {
          size: convertMillimetersToTwip(54.9),
          type: WidthType.DXA
        }
      }),
      new TableCell({
        children: [new Paragraph( {text: 'Количество учебных часов', alignment: AlignmentType.CENTER} )],
        columnSpan: this.occupationFormsLength + 1,
        verticalAlign: VerticalAlign.CENTER,
      }),
      new TableCell({
        children: [new Paragraph({text: 'Кафедра', alignment: AlignmentType.CENTER} )],
        rowSpan: 3,
        verticalAlign: VerticalAlign.CENTER,
        width: {
          size: convertMillimetersToTwip(30.05),
          type: WidthType.DXA
        }
      }),
    );
  }

  public insert(): TableRow {
    return new TableRow({
      children: this.child,
      cantSplit: true,
      tableHeader: true,
    });
  }
}
