import {Paragraph, TableCell, TableRow} from 'docx';

export class TableHeaderFourthRow {
  private child: any = [];
  constructor(occupationFormLength: number) {
    for (let i = 1; i < occupationFormLength + 3; i++){
      this.child.push(new TableCell({
        children: [
          new Paragraph((i).toString())
        ]
      }));
    }
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
