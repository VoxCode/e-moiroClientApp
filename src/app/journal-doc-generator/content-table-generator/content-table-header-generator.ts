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
            type: WidthType.PERCENTAGE
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
        const bodyRows: any = [];
        let tb: any = [];

        // headerCells.push(
        //   this.generateTableCell('№ п/п', 6.4),
        //   this.generateTableCell('Содержание', 70.9),
        //   this.generateTableCell('Страницы', 22.7),
        // );
        // rowCells.push(
        //   this.generateTableCell('', 6.4),
        //   this.generateTableCell('', 70.9),
        //   this.generateTableCell('', 22.7),
        // );
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

        tb = [new TableRow({
          children: [ this.generateTableCell('', 10),
            this.generateTableCell('', 70),
            this.generateTableCell('', 20),
          ]
        }),
          new TableRow({
            children: [ this.generateTableCell('', 10),
              this.generateTableCell('', 70),
              this.generateTableCell('', 20),
            ]
          }),
        ];
        for (let i = 0; i < 5; i++) {
          console.log(headerCells);
          // console.log(aux);
          console.log(bodyRows);
          // this.bodyRows.push(this.insertBodyRow(this.headerCells));
          bodyRows.push( this.insertRow(headerCells, 10));
        }






        return new Table({
          rows: [
            this.insertRow(headerCells, 10),
            this.insertRow(rowCells, 0.6),
            this.insertRow(rowCells, 0.6),
            this.insertRow(rowCells, 0.6),
            this.insertRow(rowCells, 0.6),
            this.insertRow(rowCells, 0.6),
            this.insertRow(rowCells, 0.6),
            this.insertRow(rowCells, 0.6),
            this.insertRow(rowCells, 0.6),
            // bodyRows,
            // tb,
          ],
          width: {
            size: convertMillimetersToTwip(186.9),
            type: WidthType.DXA
          },
        });
      }


    }
