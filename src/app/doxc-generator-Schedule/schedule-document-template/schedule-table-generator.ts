import {
  AlignmentType, BorderStyle,
  convertMillimetersToTwip,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextDirection,
  VerticalAlign,
  WidthType
} from 'docx';
import {TableScheduleHeader} from './schedule-table-header';
import {ScheduleRowTree} from './table-schedule-data-objects/table-schedule-tree-model';


export class TableScheduleGenerator {
  private child: any = [];
  private header: TableScheduleHeader;
  private size: number;
  constructor(
  ) {
    this.header = new TableScheduleHeader();
    this.child.push(this.header.insert());
    this.size = 24;

    const tree = new ScheduleRowTree([
      'Date',
      'Day',
      'Time',
      ],
      [
            new ScheduleRowTree([
                  'theme1'
              ],
              [
                    new ScheduleRowTree([
                            'teacher1',
                            'f1',
                            'f1',
                      ],
                      []
                    ),
                new ScheduleRowTree([
                    'teacher2',
                    'f2',
                    'f2',
                  ],
                  []
                ),
              ]
            ),
            new ScheduleRowTree([
                    'theme2'
              ],
              [
                    new ScheduleRowTree([
                            'teacher3',
                            'f3',
                            'f3',
                      ],
                      []
                    ),
                    new ScheduleRowTree([
                            'teacher4',
                            'f4',
                            'f4',
                      ],
                      []
                    ),
              ]
            ),
      ]
    );
    console.log('=======================================');
    // tree.calcRowSpan();
    // console.log(tree.calcRowSpan());
    // console.log('=======================================');
    // console.log(tree);
    this.generateRows(tree, false, undefined);
    // this.scheduleRows.push(a);
    // this.generateTableRow();
  }


  public generateRows(rowTree: ScheduleRowTree, isSub: boolean = false, cells: TableCell[]): boolean{
    console.log('-----------------');

    if (rowTree.getFields.length > 0) {
      if (cells === undefined) {
        cells = [];
      }
      this.pushFields(rowTree.getFields, cells, rowTree.calcRowSpan());
    }

    if (rowTree.getSubs.length > 0) {
        rowTree.getSubs.forEach(sub => {
          // console.log('/////////' + isSub + '/////////');
          if (isSub) {
            console.log('P1');
            // console.log(rowTree.calcRowSpan());
            this.generateRows(sub, !isSub, undefined);
          }
          else {
            console.log('P2');
            // console.log(rowTree.calcRowSpan());
            this.generateRows(sub, isSub, cells);
            isSub = true;
          }
        });
        isSub = false;
    }
    else {
      console.log('push');
      this.child.push(
        new TableRow({
          children: cells,
        })
      );
      isSub = true;
    }
    // console.log(isSub);
    return isSub;
  }

  // tslint:disable-next-line:typedef
  public pushFields(fields: string[], cells: TableCell[], rowSpan: number){
    fields.forEach(field => {
      cells.push(
        this.generateTableCell(field, this.size, rowSpan),
      );
      console.log('||||||||' + field + '|||||||||||');
      console.log(rowSpan);
    });
  }


  private generateTableCell(text: string, size: number, rowSpan: number): TableCell {
    return new TableCell({
      children: [new Paragraph({
        text,
        alignment: AlignmentType.CENTER,
      })],
      borders: {
        top: {style: BorderStyle.DOT_DASH, size: 5, color: '000000'},
        bottom: {style: BorderStyle.DOUBLE, size: 5, color: '000000'},

      },
      // columnSpan: this.occupationForms.length,
      verticalAlign: VerticalAlign.TOP,
      textDirection: TextDirection.BOTTOM_TO_TOP_LEFT_TO_RIGHT,
      rowSpan
    });
  }

  public insertTable(): Table {
    return new Table({
      rows: this.child,
      width: {
        size: convertMillimetersToTwip(250.3), // 284.3
        type: WidthType.DXA
      }
    });
  }
}
