import {Paragraph, TableCell, TableRow, TextRun} from 'docx';
import {EmptyTableCell} from '../table-cell-templates/empty-table-cell';

export class TableCertificationType {
  constructor(
    private occupationFormLength: number,
    private certificationTypeName: string
  ) {
  }

  public insert(): TableRow {
    const child: any = [];
    const emptyTableCell = new EmptyTableCell();
    child.push(new TableCell({
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: 'Форма итоговой аттестации',
            }),
          ]
        })
      ],
    }));
    child.push(new TableCell({
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: this.certificationTypeName.toLowerCase(),
            }),
          ]
        })
      ],
      columnSpan: this.occupationFormLength + 1
    }));
    child.push(emptyTableCell.insert());

    return new TableRow({
      children: child,
      cantSplit: true
    });
  }}
