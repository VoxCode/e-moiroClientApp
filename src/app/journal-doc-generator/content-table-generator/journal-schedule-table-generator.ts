import {
  AlignmentType,
  convertMillimetersToTwip,
  HeightRule,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  VerticalAlign,
  WidthType
} from 'docx';

export class JournalScheduleTableGenerator {
  constructor() {
  }

  private generateTableCell(text: string, size: number): TableCell {
    return new TableCell({
      children: [new Paragraph({text, alignment: AlignmentType.CENTER})],
      verticalAlign: VerticalAlign.CENTER,
      width: {
        size: convertMillimetersToTwip(size),
        type: WidthType.DXA
      }
    });
  }

  public insertRow(aux: any, height: number): TableRow {
    return new TableRow({
      children: aux,
      height: {
        value: convertMillimetersToTwip(height),
        rule: HeightRule.ATLEAST,
      },
      cantSplit: false,
      tableHeader: false,
    });
  }

  public insert(): Table {

    const headerCells: any = [];
    const rowCells: any = [];
    const rows: any = [];

    headerCells.push(
      this.generateTableCell('Дата', 11.9),
      this.generateTableCell('Тема', 35),
      this.generateTableCell('Вид занятий', 15.7),
      this.generateTableCell('Кол. час.', 10.3),
      this.generateTableCell('Ф.И.О. преподавателя', 29.3),
      this.generateTableCell('Подпись преподавателя', 29.3),
    );

    rowCells.push(
      this.generateTableCell('', 11.9),
      this.generateTableCell('', 35),
      this.generateTableCell('', 15.7),
      this.generateTableCell('', 10.3),
      this.generateTableCell('', 29.3),
      this.generateTableCell('', 29.3),
    );

    rows.push( this.insertRow(headerCells, 10));
    for (let i = 0; i < 40; i++) {
      rows.push(this.insertRow(rowCells, 6));
    }

    return new Table({
      rows,
      alignment: AlignmentType.LEFT,
      width: {
        size: convertMillimetersToTwip(131.6),
        type: WidthType.DXA
      },
    });
  }


}
