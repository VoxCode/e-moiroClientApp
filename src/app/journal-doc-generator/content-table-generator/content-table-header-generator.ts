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

export class ContentTableHeaderGenerator {
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
            this.generateTableCell('№ п/п', 11.9),
            this.generateTableCell('Содержание', 132.5),
            this.generateTableCell('Страницы', 42.5),
        );
        rowCells.push(
          this.generateTableCell('', 11.9),
          this.generateTableCell('', 132.5),
          this.generateTableCell('', 42.5),
        );

        rows.push( this.insertRow(headerCells, 10));
        for (let i = 0; i < 40; i++) {
         rows.push(this.insertRow(rowCells, 6));
        }

        return new Table({
          rows,
          alignment: AlignmentType.LEFT,
          width: {
            size: convertMillimetersToTwip(186.9),
            type: WidthType.DXA
          },
        });
      }


    }
