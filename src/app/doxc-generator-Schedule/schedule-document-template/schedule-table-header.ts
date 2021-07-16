import {
  AlignmentType,
  BorderStyle,
  convertMillimetersToTwip,
  Paragraph,
  TableCell,
  TableRow,
  VerticalAlign,
  WidthType
} from 'docx';

export class TableScheduleHeader {
  private child: any = [];

  constructor() {// private occupationForms: any[]
    this.child.push(
      this.generateTableCell('Дата', 4.2),
      this.generateTableCell('День', 5.5),
      this.generateTableCell('Время занятий', 9.3),
      this.generateTableCell('Тема и вид занятий', 45.2),
      this.generateTableCell('Преподаватель (Ф.И.О., ученая степень, звание)', 18.8),
      this.generateTableCell('Кол-во часов', 7),
      this.generateTableCell('№ ауд.', 10)
    );
  }

  private generateTableCell(text: string, size: number): TableCell {
    return new TableCell({
      children: [new Paragraph({text, alignment: AlignmentType.CENTER})],
      // columnSpan: this.occupationForms.length,
      borders: {
        bottom: {style: BorderStyle.DOUBLE, size: 5, color: '000000'},
      },
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


  public insert(): TableRow {
    return new TableRow({
      children: this.child,
      cantSplit: false,
      tableHeader: true,
    });
  }
}
