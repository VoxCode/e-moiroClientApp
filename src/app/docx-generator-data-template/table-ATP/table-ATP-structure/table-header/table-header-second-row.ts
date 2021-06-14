import {AlignmentType, Paragraph, TableCell, TableRow} from 'docx';

export class TableHeaderSecondRow {
  private child: any = [];
  constructor(private occupationFormsLength: number, isDistance?: boolean) {
    this.child.push(new TableCell({
        children: [new Paragraph({text: '', alignment: AlignmentType.CENTER} )]
      })
    );
    this.child.push(new TableCell({
        children: [new Paragraph({text: 'Распределение по видам занятий', alignment: AlignmentType.CENTER} )],
        columnSpan: occupationFormsLength
      })
    );
    if (isDistance) {
      this.child.push(new TableCell({
          children: [new Paragraph({text: '', alignment: AlignmentType.CENTER} )]
        })
      );
    }
  }
  public insert(): TableRow {

    return new TableRow({
      children: this.child,
      cantSplit: true,
      tableHeader: true,
    });
  }
}
