import {
  AlignmentType,
  BorderStyle,
  convertMillimetersToTwip,
  Paragraph, Table,
  TableCell,
  TableRow,
  VerticalAlign,
  WidthType
} from 'docx';

export class ContentTableHeaderGenerator {
  private headerChildren: any = [];
  private bodyChildren: any = [];

  constructor() {// private occupationForms: any[]
    this.headerChildren.push(
      this.generateTableCell('№ п/п', 10),
      this.generateTableCell('Содержание', 70),
      this.generateTableCell('Страницы', 20),
    );
    for (let i = 0; i < 25; i++) {
      this.bodyChildren.push(
        this.generateEmptyTableCell(10),
        this.generateEmptyTableCell(70),
        this.generateEmptyTableCell(20),
      );
    }
  }

  private generateEmptyTableCell(size: number): TableCell {
    return new TableCell({
      children: [new Paragraph({
        style: 'default',
      })],

      verticalAlign: VerticalAlign.CENTER,
      width: {
        size,
        type: WidthType.PERCENTAGE
      }
    });
  }

  private generateTableCell(text: string, size: number): TableCell {
    return new TableCell({
      children: [new Paragraph({text, alignment: AlignmentType.CENTER})],
      verticalAlign: VerticalAlign.CENTER,
      width: {
        size,
        type: WidthType.PERCENTAGE
      }
    });
  }

  // width: {
  // size: size.toString() + '%',
  // type: WidthType.PERCENTAGE
  // }

  public insertHeader(): TableRow {
    return new TableRow({
      children: this.headerChildren,
      cantSplit: false,
      tableHeader: true,
    });
  }
  public insertBody(): TableRow {
    return new TableRow({
      children: this.bodyChildren,
      cantSplit: false,
      tableHeader: false,
    });
  }

  public insert(): Table {
    return new Table({
      rows: [
        this.insertHeader(),
        this.insertBody(),
      ],
      width: {
        size: convertMillimetersToTwip(100), // 284.3
        type: WidthType.DXA
      },
    });
  }


}
