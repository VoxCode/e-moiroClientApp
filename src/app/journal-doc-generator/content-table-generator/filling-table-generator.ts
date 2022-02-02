import {
  AlignmentType,
  convertMillimetersToTwip,
  HeightRule,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextDirection,
  VerticalAlign,
  WidthType
} from 'docx';

export class FillingTableGenerator {
  constructor() {
  }

  private generateTableCell(text: string, size: number, rowSpan: number = 1, colSpan: number = 1): TableCell {
    return new TableCell({
      children: [new Paragraph({text, alignment: AlignmentType.CENTER})],
      verticalAlign: VerticalAlign.CENTER,
      rowSpan,
      columnSpan: colSpan,
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
    let rowCells: any = [];
    const rows: any = [];
    const dateRow: any = [];

    for (let i = 0; i < 15; i++) {
      dateRow.push(this.generateTableCell('', 8));
    }

    // header
    //rowspan on second cell is wierd, it skips one row and leaves empty cell in third row
    //if increase rowspan onli cells after third row will combine
    headerCells.push(
      this.generateTableCell('№ п/п', 10.7, 2),
      this.generateTableCell('Ф.И.О. Слушателей', 53.8, 2),
      this.generateTableCell('Дата', 119.9, 1, 15),
    );
    rows.push( this.insertRow(headerCells, 6));
    rows.push(this.insertRow(dateRow, 8));
    // header


    for (let i = 0; i < 30; i++) {
      rowCells = [
        this.generateTableCell((i + 1).toString(), 10.7),
        this.generateTableCell('', 53.8),
      ];
      rowCells = rowCells.concat(dateRow);
      rows.push(this.insertRow(rowCells, 8));
    }
    console.log(rows);
    return new Table({
      rows,
      alignment: AlignmentType.LEFT,
      width: {
        size: convertMillimetersToTwip(184.5),
        type: WidthType.DXA
      },
    });
  }

}
