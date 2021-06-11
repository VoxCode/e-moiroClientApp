import {Paragraph, TableCell, TableRow, TextRun} from 'docx';
import {EmptyTableCell} from '../table-cell-templates/empty-table-cell';

export class TableControlWork {
  constructor(
    private occupationFormLength: number
  ) { }

  public insert(index: number): TableRow {
    const child: any = [];
    const emptyTableCell = new EmptyTableCell();
    child.push(new TableCell({
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: 'Контрольная работа №' + ++index,
            }),
          ]
        })
      ],
    }));
    for (let i = 0; i < this.occupationFormLength + 1; i++) {
      child.push(new TableCell({
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: ''
              }),
            ]
          })
        ],
      }));
    }

    child.push(emptyTableCell.insert());

    return new TableRow({
      children: child,
      cantSplit: true
    });
  }}
