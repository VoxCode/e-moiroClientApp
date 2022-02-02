import {
  AlignmentType,
  convertMillimetersToTwip, HeightRule,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextDirection, TextRun,
  VerticalAlign, WidthType
} from 'docx';
import {type} from 'os';

export class TeachersCompletedWorkTableGenerator {
  constructor() {
  }

  private generateTableCell(text: string, size: number,
                            rowSpan: number = 1, colSpan: number = 1,
                            textDirection: any = 'lrTb', alignment: any = 'left', textSize: number = 17,
                            indent: number = 2): TableCell {
    return new TableCell({
      children: [
        new Paragraph({
          children: [
            new TextRun({size: textSize , text})
          ],
          alignment,
          indent: { left: convertMillimetersToTwip(indent), },
        })
      ],
      verticalAlign: VerticalAlign.CENTER,
      rowSpan,
      columnSpan: colSpan,
      textDirection,
      width: {
        size: convertMillimetersToTwip(size),
        type: WidthType.DXA
      }
    });
  }

  private insertRow(aux: any, height: number): TableRow {
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
    const dateRow: any = [];

    for (let i = 0; i < 15; i++) {
      dateRow.push(this.generateTableCell('', 8));
    }

    // header first row
    rows.push(
      this.insertRow(
        [
          this.generateTableCell('Фамилия и инициалы преподавателя', 48.1, 3, 1, undefined, 'center', 20, 0),
          this.generateTableCell('Аудиторные занятия', 90, 1,  17, undefined, 'center', undefined, 0),
          this.generateTableCell('Внеаудиторные', 34.7, 1, 6, undefined, 'center', undefined, 0),
          this.generateTableCell('Всего учебной нагрузки (в соответствии с планом учебной нагрузки)', 7.5, 3, 1, 'btLr'),
          this.generateTableCell('Учебные часы без оплаты', 5.9, 3, 1, 'btLr'),
          this.generateTableCell('Учебные часы на платной основе', 5, 3, 1, 'btLr'),
          this.generateTableCell('Итого учебных часов', 5, 3, 1, 'btLr'),
        ]
        , 4.9)
    );
    rows.push(
      this.insertRow(
        [
          this.generateTableCell('Лекции', 5, 2, 1, 'btLr'),
          this.generateTableCell('Практические занятия', 30, 1,  5, undefined, 'center', undefined, 0),
          this.generateTableCell('Семинарские занятия', 5, 2, 1, 'btLr'),
          this.generateTableCell('Круглые столы, дискуссии', 5, 2, 1, 'btLr'),
          this.generateTableCell('Лабораторные занятия', 5, 2, 1, 'btLr'),
          this.generateTableCell('Деловые игры', 20, 1, 4, undefined, 'center', undefined, 0),
          this.generateTableCell('тренинги', 5, 2, 1, 'btLr'),
          this.generateTableCell('Конференции', 5, 2, 1, 'btLr'),
          this.generateTableCell('Групповые консультации', 5, 2, 1, 'btLr'),
          this.generateTableCell('Всего аудиторных', 5, 2, 1, 'btLr'),
          this.generateTableCell('Руководство выпускными работами (рефератами)', 14.7, 1, 2, undefined, 'center', undefined, 0),
          this.generateTableCell('Защита выпускных работ (рефератов)', 5, 2, 1, 'btLr'),
          this.generateTableCell('Зачеты, экзамены', 5, 2, 1, 'btLr'),
          this.generateTableCell('Собеседование', 5, 2, 1, 'btLr'),
          this.generateTableCell('Всего внеаудиторных', 5, 2, 1, 'btLr'),
        ]
        , 18.4)
    );
    rows.push(
      this.insertRow(
        [
          this.generateTableCell('Практическое занятие на группу', 7.5, 1, 1, 'btLr'),
          this.generateTableCell('Практикум', 5, 1,  1, 'btLr'),
          this.generateTableCell('Педагогическая практика на базе УО', 7.5, 1, 1, 'btLr'),
          this.generateTableCell('Спецкурс', 5, 1,  1, 'btLr'),
          this.generateTableCell('Факультатив', 5, 1,  1, 'btLr'),
          this.generateTableCell('Деловая игра', 5, 1,  1, 'btLr'),
          this.generateTableCell('УДИ', 5, 1,  1, 'btLr'),
          this.generateTableCell('ОДИ', 5, 1,  1, 'btLr'),
          this.generateTableCell('СМД', 5, 1,  1, 'btLr'),
          this.generateTableCell('Консультирование', 7.2, 1,  1, 'btLr'),
          this.generateTableCell('Рецензирование', 7.5, 1,  1, 'btLr'),
        ]
        , 42.3)
    );
    //header

    for (let i = 0; i < 28; i++) {
      rowCells.push(
        new TableCell({
          children: [
            new Paragraph({text: ''})
          ]
        })
      );
    }
    for (let i = 0; i < 39; i++) {
      rows.push(this.insertRow(rowCells, 5));
    }


    return new Table({
      rows,
      alignment: AlignmentType.LEFT,
      width: {
        size: convertMillimetersToTwip(196.2),
        type: WidthType.DXA
      },
    });
  }
  public insertTableName(): Paragraph {
    return new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: 'Учет выполненной учебной работы преподавателями кафедр',
          size : 24,
          bold : true,
        }),
      ],
    });
  }
  public insertCredentials(): Paragraph {
    return new Paragraph({
      alignment: AlignmentType.LEFT,
      children: [
        new TextRun({
          text: '\tМетодист учебного отдела',
          size : 24,
          bold : false,
        }),
        new TextRun({
          text: '\tНачальник учебного отдела',
          size : 24,
          bold : false,
          break: 1,
        }),
      ],
    });
  }

}
