import {
  AlignmentType, BorderStyle,
  PageBreak,
  PageNumber,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TabStopType,
  TextRun,
  VerticalAlign, WidthType
} from 'docx';

export class DocxGeneratorScheduleTemplate {

  constructor(
    private size: number
  ) { }

  // public borderLessTableCell(): TableCell
  // {
  //   return new TableCell({
  //     width: { size: 100, type: WidthType.PERCENTAGE },
  //       borders: {
  //         top: {style: BorderStyle.NONE, size: 0, color: 'FFFFFF'},
  //         bottom: {style: BorderStyle.NONE, size: 0, color: 'FFFFFF'},
  //         left: {style: BorderStyle.NONE, size: 0, color: 'FFFFFF'},
  //         right: {style: BorderStyle.NONE, size: 0, color: 'FFFFFF'},
  //       },
  //     children: []
  //     }
  //   );
  // }

  // cop
  public trainingProgramInfoATP(numberOfHours: number, formOfEducation: string, isDistance: boolean): Paragraph {
    let tmp = '';
    if (isDistance){
      tmp = '(дистанционная)';
    }
    return new Paragraph({
      children: [
        new TextRun({
          text: 'Продолжительность обучения - ' + 'X' + ' недель' + ' (' + numberOfHours + ' часов)',
          size : this.size,
          break: 1
        }),
        new TextRun({
          text: 'Форма получения образования - ' + formOfEducation.toLowerCase() + ' ' + tmp,
          size : this.size,
          break: 1
        }),
      ]
    });
  }

  public tableScheduleHeader(): Table
  {
    return new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              width: { size: 4000, type: WidthType.DXA },
              borders: {
                top: {style: BorderStyle.NONE, size: 0, color: 'FFFFFF'},
                bottom: {style: BorderStyle.NONE, size: 0, color: 'FFFFFF'},
                left: {style: BorderStyle.NONE, size: 0, color: 'FFFFFF'},
                right: {style: BorderStyle.NONE, size: 0, color: 'FFFFFF'},
              },
              children: [this.titleMOIROSmall()]
            }),
            new TableCell({
              width: { size: 1800, type: WidthType.DXA },
              borders: {
                top: {style: BorderStyle.NONE, size: 0, color: 'FFFFFF'},
                bottom: {style: BorderStyle.NONE, size: 0, color: 'FFFFFF'},
                left: {style: BorderStyle.NONE, size: 0, color: 'FFFFFF'},
                right: {style: BorderStyle.NONE, size: 0, color: 'FFFFFF'},
              },
              children: [this.approveDean(this.getNowMonthYear())]
            }),
          ]
        })
      ]
    });
  }

  public mainNameSchedule(): Paragraph
  {
    return new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: 'РАСПИСАНИЕ ЗАНЯТИЙ',
          size : this.size,
          bold : true,
          allCaps: true
        }),
      ],
    });
  }

  public titleMOIROSmall(): Paragraph
  {
    return new Paragraph({
      alignment: AlignmentType.LEFT,
      children: [
        new TextRun({
          text: 'Государственное учреждение образования',
          size : this.size,
          bold : false,
          allCaps: false
        }),
        new TextRun({
          text: '«Минский областной институт равзвития образования»',
          size : this.size,
          bold : false,
          allCaps: false,
          break: 1
        }),
      ],
      tabStops: [
        {
          type: TabStopType.LEFT,
          position: 5800,
        },
      ],
    });
  }


  public titleMOIROSmallBLR(): Paragraph
  {
    return new Paragraph({
      alignment: AlignmentType.LEFT,
      children: [
        new TextRun({
          text: 'Дзяржаўная ўстанова адукацыі',
          size : this.size,
          bold : false,
          allCaps: false
        }),
        new TextRun({
          text: '«Мінскі абласны інстытут развіцця адукацыі»',
          size : this.size,
          bold : false,
          allCaps: false,
          break: 1
        }),
      ],
      tabStops: [
        {
          type: TabStopType.LEFT,
          position: 5800,
        },
      ],
    });
  }

  public approveDean(year: string): Paragraph
  {
    return new Paragraph({
      children: [
        new TextRun({
          text: '\tутверждаю',
          size : this.size,
          allCaps: true
        }),
        new TextRun({
          text: '\tДекан факультета профессионального',
          size : this.size,
          break: 1
        }),
        new TextRun({
          text: '\tразвития руководящих работников',
          size : this.size,
          break: 1
        }),
        new TextRun({
          text: '\tи специалистов образования',
          size : this.size,
          break: 1
        }),
        new TextRun({
          text: '\t__________ ' + 'Е.А.Ротмирова',
          size : this.size,
          break: 1
        }),
        new TextRun({
          text: '\t__________ ' + year,
          size : this.size,
          break: 1
        })
      ],
    });
  }
  public approveDeanBLR(year: string): Paragraph
  {
    return new Paragraph({
      children: [
        new TextRun({
          text: '\tЗАЦВЯРДЖАЮ',
          size : this.size,
          allCaps: true
        }),
        new TextRun({
          text: '\tДэкан факультэта прафесійнага',
          size : this.size,
          break: 1
        }),
        new TextRun({
          text: '\tразвіцця кіруючых работнікаў ',
          size : this.size,
          break: 1
        }),
        new TextRun({
          text: '\tі спецыялістаў адукацыі',
          size : this.size,
          break: 1
        }),
        new TextRun({
          text: '\t__________ ' + 'А.А.Ротмірава',
          size : this.size,
          break: 1
        }),
        new TextRun({
          text: '\t__________ ' + year,
          size : this.size,
          break: 1
        })
      ],
    });
  }

  public groupInfo(
    grNumber: number,
    grName: string,
    teacherCategory: string,
    dateStart: number,
    dateEnd: number
  ): Paragraph
  {
    return new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: `группы № ${grNumber.toString()} повышения квалификации «${grName}» ${teacherCategory} c ${dateStart.toString()} по ${dateEnd.toString()}`,
          size : this.size,
          allCaps: false
        }),
      ],
    });
  }

  public signatureSchedule(): Paragraph{
    return new Paragraph({
      children: [
        new TextRun({
          text: 'Методист учебного отдела\t\t\t\tМ.В.Новик\t\tНачальник учебного отдела\t\t\t\tИ.В.Рощина\t',
          size : this.size,
        }),
      ]
    });
  }

  public getNowMonthYear(): string
  {
    return '.' + (new Date().getMonth() + 1 ).toString().padStart(2, '0')
      .concat(
        '.' + new Date().getFullYear().toString()
    );
  }
}
