import {Paragraph, TableCell, TableRow, VerticalAlign} from 'docx';

export class TableHeaderFirstRow {
  private child: any = [];
  constructor(private occupationForms: any[]) {

    this.child.push(new TableCell({
        children: [new Paragraph('Названия разделов и тем')],
        rowSpan: 3,
        verticalAlign: VerticalAlign.CENTER
      }),
      new TableCell({
        children: [new Paragraph('Количество учебных часов')],
        columnSpan: this.occupationForms.length,
        verticalAlign: VerticalAlign.CENTER
      }),
      new TableCell({
        children: [new Paragraph('Кафедра')],
        rowSpan: 3,
        verticalAlign: VerticalAlign.CENTER,
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
