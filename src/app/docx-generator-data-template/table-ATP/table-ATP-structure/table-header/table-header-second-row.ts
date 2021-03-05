import {Paragraph, TableCell, TableRow} from 'docx';

export class TableHeaderSecondRow {
  private child: any = [];
  constructor(private occupationForms: any[]) {
    this.child.push(new TableCell({
        children: [new Paragraph('Распределение по видам занятий')],
        columnSpan: occupationForms.length
      })
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