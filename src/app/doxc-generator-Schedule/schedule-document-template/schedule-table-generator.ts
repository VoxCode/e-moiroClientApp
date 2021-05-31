import {
  AlignmentType,
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
import {ScheduleDataRow} from './table-schedule-data-objects/table-schedule-row';
import {ScheduleTheme} from './table-schedule-data-objects/table-schedule-theme';
import {ScheduleTeacher} from './table-schedule-data-objects/table-schedule-teacher';
import {ScheduleRowTree} from './table-schedule-data-objects/table-schedule-tree-model';


export class TableScheduleGenerator {
  private child: any = [];
  private header: TableScheduleHeader;
  private scheduleRows: ScheduleDataRow[];
  private size: number;
  constructor(
  ) {
    this.scheduleRows = [];
    this.header = new TableScheduleHeader();
    this.child.push(this.header.insert());
    this.size = 24;

    const a = new ScheduleDataRow(new Date(Date.now()), '453', [
      new ScheduleTheme('theme1', [
        new ScheduleTeacher('teacher1', 12, 'aud1'),
        new ScheduleTeacher('teacher2', 12, 'aud2'),
      ]),
      new ScheduleTheme('theme2', [
        new ScheduleTeacher('teacher3', 12, 'aud3'),
        new ScheduleTeacher('teacher4', 12, 'aud4'),
      ]),
    ]);

    const tree = new ScheduleRowTree([
          'Date',
          'Day',
      ],
      [
        {
          subs: [
            new ScheduleRowTree([
                  'theme1'
              ],
              [
                {
                  subs: [
                    new ScheduleRowTree([
                            'teacher1',
                            'f1',
                            'f1',
                            'f1'
                      ],
                      [{subs: []}]
                    ),
                    new ScheduleRowTree([
                            'teacher2',
                            'f2',
                            'f2',
                            'f2'
                      ],
                      [{subs: []}]
                    ),
                  ]
                }
              ]
            ),
            new ScheduleRowTree([
                    'theme2'
              ],
              [
                {
                  subs: [
                    new ScheduleRowTree([
                            'teacher3',
                            'f3',
                            'f3',
                            'f3'
                      ],
                      [{subs: []}]
                    ),
                    new ScheduleRowTree([
                            'teacher4',
                            'f4',
                            'f4',
                            'f4'
                      ],
                      [{subs: []}]
                    ),
                  ]
                }
              ]
            ),
          ]
      }
      ]
    );
    this.generateRows(tree);
    this.scheduleRows.push(a);
    // this.generateTableRow();
  }


  public generateRows(rowTree: ScheduleRowTree, isSub: boolean = false, row?: TableRow): boolean{
    console.log(rowTree);
    if (row === undefined) {
      row = new TableRow({
        children: this.pushFieldsArr(rowTree.getFields, rowTree.calcRowSpan()),
      });

    }
    else {
      this.pushFields(rowTree.getFields, row, rowTree.calcRowSpan());
    }

    if (rowTree.getSubs.length > 0) {
        rowTree.getSubs.forEach(sub => {
          if (isSub) {
            this.generateRows(sub, isSub);
          }
          else {
            this.generateRows(sub, isSub, row);
          }
        });
        isSub = false;
    }
    else {
      this.child.push(row);
      isSub = true;
    }
    return isSub;
  }

  // tslint:disable-next-line:typedef
  public pushFields(fields: string[], row: TableRow, rowSpan: number){
    fields.forEach(field => {
      // row.Children.push(
      //   this.generateTableCell(field, this.size, rowSpan),
      // );
    });
  }

  public pushFieldsArr(fields: string[], rowSpan: number): any[]{
    const fl: any = [];
    fields.forEach(field => {
      fl.push(
        this.generateTableCell(field, this.size, rowSpan)
      );
      console.log(field);
    });
    console.log(fl);
    return fl;
  }

  // tslint:disable-next-line:typedef
  public generateTableRow(){
    let themeIndex = 0;
    let teacherIndex = 0;
    this.scheduleRows.forEach( scheduleRow => {
      let newRow: TableRow;
      newRow = new TableRow({
        children: [
          this.generateTableCell(scheduleRow.date.toDateString(), this.size, scheduleRow.calcRowSpan()),
          this.generateTableCell(ScheduleDataRow.getDayOfTheWeek(scheduleRow.date), this.size, scheduleRow.calcRowSpan()),
          this.generateTableCell(scheduleRow.hours, this.size, scheduleRow.calcRowSpan()),
          this.generateTableCell(scheduleRow.themes[themeIndex].name, this.size, scheduleRow.calcRowSpan()),
          this.generateTableCell(scheduleRow.themes[themeIndex].teachers[teacherIndex].name, this.size, scheduleRow.calcRowSpan()),
          this.generateTableCell(scheduleRow.themes[themeIndex].teachers[teacherIndex].hours.toString(),
            this.size, scheduleRow.calcRowSpan()),
          this.generateTableCell(scheduleRow.themes[themeIndex].teachers[teacherIndex].audienceNumber,
            this.size, scheduleRow.calcRowSpan()),
        ]
      });
      themeIndex++;
      teacherIndex++;
      let themeSubrow: TableRow;
      for (; themeIndex < scheduleRow.themes.length; themeIndex++){
        const theme = scheduleRow.themes[themeIndex];
        for (; teacherIndex < theme.teachers.length; teacherIndex++){
          const teacher = theme.teachers[teacherIndex];
          if (themeSubrow !== undefined) {
            // themeSubrow.Children.push(
            //   this.generateTableCell(teacher.name, this.size, teacher.calcRowSpan()),
            //   this.generateTableCell(teacher.hours.toString(), this.size, teacher.calcRowSpan()),
            //   this.generateTableCell(teacher.audienceNumber, this.size, teacher.calcRowSpan()),
            // );
            this.child.push(themeSubrow);
          }
          else {
            themeSubrow =  new TableRow({
              children: [
                this.generateTableCell(teacher.name, this.size, teacher.calcRowSpan()),
                this.generateTableCell(teacher.hours.toString(), this.size, teacher.calcRowSpan()),
                this.generateTableCell(teacher.audienceNumber, this.size, teacher.calcRowSpan()),
            ],
              }
            );
            this.child.push(themeSubrow);
          }
          // if (teacherIndex > 10) {
          //   break;
          // }
        }
        // if (themeIndex > 10) {
        //   break;
        // }
        themeSubrow = new TableRow({
            children: [
              this.generateTableCell(theme.name, this.size, theme.calcRowSpan()),
            ]
          }
        );
        // this.child.push(themeSubrow);
      }
      this.child.push(themeSubrow);
      this.child.push(newRow);
    } );
  }


  private generateTableCell(text: string, size: number, rowSpan: number): TableCell {
    return new TableCell({
      children: [new Paragraph({
        text,
        alignment: AlignmentType.CENTER,
      })],
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
        size: convertMillimetersToTwip(284.3),
        type: WidthType.DXA
      }
    });
  }
}
