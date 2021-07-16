import {
  AlignmentType, BorderStyle,
  convertMillimetersToTwip, ITableBordersOptions,
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
import {GroupScheduleGenerator} from '../../models/generator-models/GroupScheduleGenerator';


export class TableScheduleGenerator {
  private child: any = [];
  private header: TableScheduleHeader;
  private size: number;

  constructor(
    // private GroupSchedule: GroupScheduleGenerator,
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
              ],
              [
                new ScheduleRowTree([
                  'f4',
                ],
                [
                  new ScheduleRowTree([
                    'f45',
                  ],
                  []
                  ),
                ]
                ),
              ]
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
    tree.generateSubsStyle();
    this.generateRows(tree, false, undefined);
    this.generateRows(tree, false, undefined);
    // this.scheduleRows.push(a);
    // this.generateTableRow();
  }


  public generateRowTree(GroupSchedule: GroupScheduleGenerator): ScheduleRowTree{

    // let rowTree: ScheduleRowTree;
    // GroupSchedule.scheduleDateScheduleBlock.forEach(block =>{
    //   block.scheduleDate.
    // });
    return undefined;
  }

  public generateRows(rowTree: ScheduleRowTree, isSub: boolean = false, cells: TableCell[]): boolean{
    console.log('-----------------');
    console.log(isSub);
    if (rowTree.getFields.length > 0) {
      if (cells === undefined) {
        cells = [];
      }

      this.pushFields(rowTree, cells, rowTree.calcRowSpan());
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
  public pushFields(tree: ScheduleRowTree, cells: TableCell[], rowSpan: number){
    tree.getFields.forEach((field, index) => {
      console.log('index: ' + index);
      cells.push(
        this.generateTableCell(field, this.size, rowSpan, tree.style), // STYLE HERE PLS!!1
      );
      console.log('||||||||' + field + '|||||||||||');
      console.log(rowSpan);
    });
  }

  private generateTableCell(text: string, size: number, rowSpan: number, borders: ITableBordersOptions): TableCell {
    // let borders: ITableBordersOptions;
    console.log('OOOOOOOOOO ' + rowSpan.toString() + ' OOOOOOOOOOOO');
    // if (rowSpan === 1) {
    //   borders = {top: {style: BorderStyle.DASHED, size: 5, color: '000000'}};
    // }
    // else {
    //   // borders = {top: {style: BorderStyle.NIL, size: 5, color: '000000'}};
    // }
    return new TableCell({
      children: [new Paragraph({
        text,
        alignment: AlignmentType.CENTER,
      })],
      borders,
      // columnSpan: this.occupationForms.length,
      verticalAlign: VerticalAlign.TOP,
      textDirection: TextDirection.BOTTOM_TO_TOP_LEFT_TO_RIGHT,
      rowSpan
    });
    // borders: {
    //   top: {style: BorderStyle.DOT_DASH, size: 5, color: '000000'},
    //   bottom: {style: BorderStyle.DOUBLE, size: 5, color: '000000'},
    // }
  }

  public insertTable(): Table {
    return new Table({
      rows: this.child,
      width: {
        size: convertMillimetersToTwip(250.3), // 284.3
        type: WidthType.DXA
      },
    });
  }
}
