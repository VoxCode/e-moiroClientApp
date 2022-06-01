import {
  AlignmentType, BorderStyle,
  convertMillimetersToTwip, ITableBordersOptions,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextDirection, TextRun,
  VerticalAlign, VerticalMergeType,
  WidthType
} from 'docx';
import {TableScheduleHeader} from './schedule-table-header';
import {ScheduleRowTree} from './table-schedule-data-objects/table-schedule-tree-model';
import {GroupScheduleGenerator} from '../../models/generator-models/GroupScheduleGenerator';


export class TableScheduleGenerator {
  private child: any = [];
  private header: TableScheduleHeader;
  private size: number;

  // private c: number;

  constructor(
    private scheduleBlocks: GroupScheduleGenerator[],
  ) {
    this.header = new TableScheduleHeader();
    this.child.push(this.header.insert());
    this.size = 20;
    // this.c = 0;

    let finalTree: ScheduleRowTree[] = [];
    console.log(scheduleBlocks.sort((a, b) => a.date > b.date ? 1 : -1));
    scheduleBlocks.sort((a, b) => a.date > b.date ? 1 : -1)
      .forEach((block) => {
        finalTree.push(
          new ScheduleRowTree([block.date.toLocaleDateString(), block.date.getDay().toString(), block.time],
            [new ScheduleRowTree([block.topic],
              [new ScheduleRowTree([block.teacher, '2', block.room], [])])])
        );
      });

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
    finalTree.forEach((x) => {
      this.generateRows(x, false, undefined);
    });
    //this.generateRows(tree, false, undefined);
    //this.generateRows(tree, false, undefined);
    // this.scheduleRows.push(a);
    // this.generateTableRow();
  }


  public generateRowTree(GroupSchedule: GroupScheduleGenerator): ScheduleRowTree {

    // let rowTree: ScheduleRowTree;
    // GroupSchedule.scheduleDateScheduleBlock.forEach(block =>{
    //   block.scheduleDate.
    // });
    return undefined;
  }

  public generateRows(rowTree: ScheduleRowTree, isSub: boolean = false, cells: TableCell[]): boolean {
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
        } else {
          console.log('P2');
          // console.log(rowTree.calcRowSpan());
          this.generateRows(sub, isSub, cells);
          isSub = true;
        }
      });
      isSub = false;
    } else {
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
  public pushFields(tree: ScheduleRowTree, cells: TableCell[], rowSpan: number) {
    tree.getFields.forEach((field, index) => {
      console.log('index: ' + index);
      cells.push(
        this.generateTableCell(field, this.size, rowSpan, tree.style),
      );
      console.log('||||||||' + field + '|||||||||||');
      console.log(rowSpan);
    });
  }

  private generateTableCell(text: string, size: number, rSpan: number, borders: ITableBordersOptions): TableCell {
    console.log('OOOOOOOOOO ' + rSpan.toString() + ' OOOOOOOOOOOO');
    // let vmt: VerticalMergeType;
    // if (this.c < 8) {
    //   vmt = VerticalMergeType.RESTART;
    // }
    // else {
    //   vmt = VerticalMergeType.CONTINUE;
    // }
    // this.c++;

    return new TableCell({
      children: [new Paragraph({
        children: [
          new TextRun({
            text,
            size,
            font: 'TimesNewRoman'
          }),
        ],
        alignment: AlignmentType.CENTER,
      })],
      rowSpan: rSpan,
      verticalMerge: VerticalMergeType.RESTART,
      borders,
      // columnSpan: this.occupationForms.length,
      verticalAlign: VerticalAlign.TOP,
      // textDirection: TextDirection.BOTTOM_TO_TOP_LEFT_TO_RIGHT,
    });
  }

  public insertTable(): Table {
    // this.c = 0;
    return new Table({
      rows: this.child,
      width: {
        size: convertMillimetersToTwip(250.3), // 284.3
        type: WidthType.DXA
      },
    });
  }
}
