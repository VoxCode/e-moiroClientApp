import {
  AlignmentType,
  PageBreak,
  PageNumber,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TabStopType,
  TextRun,
  VerticalAlign
} from 'docx';
import {CurriculumTopicTrainingProgram} from '../models/СurriculumTopicTrainingProgram';
import {TrainingProgramCurriculumSection} from '../models/TrainingProgramCurriculumSection';
import {OccupationForm} from '../models/OccupationForm';

export class DocxGeneratorDataTemplate {

  constructor(
    private size: number
  ) { }

  public emptyParagraph(): Paragraph{
    return new Paragraph({
      style: 'default',
    });
  }

  public pageBreak(): Paragraph{
    return new Paragraph({
      children: [new PageBreak()],
    });
  }

  public someText(txt: string, indent?: number, bld?: boolean, caps?: boolean ): Paragraph{
    return new Paragraph({
      style: 'default',
      alignment: AlignmentType.JUSTIFIED,
      indent: {
        left: 0,
        firstLine: indent,
      },
      children: [
        new TextRun({
          text: txt,
          allCaps: caps,
          bold: bld,
        })
      ]
    });
  }

  public someTextCurriculumTopics(txt: string, txt2: string, indent?: number, bld?: boolean, caps?: boolean ): Paragraph{
    return new Paragraph({
      style: 'default',
      alignment: AlignmentType.JUSTIFIED,
      indent: {
        left: 0,
        firstLine: indent,
      },
      children: [
        new TextRun({
          text: txt,
          allCaps: caps,
          bold: bld,
        }),
        new TextRun({
          text: txt2,
          italics: true
        })
      ]
    });
  }

  public someTextCenter(txt: string, indent?: number, bld?: boolean, caps?: boolean ): Paragraph{
    return new Paragraph({
      style: 'default',
      alignment: AlignmentType.CENTER,
      indent: {
        left: 0,
        firstLine: indent,
      },
      children: [
        new TextRun({
          text: txt,
          allCaps: caps,
          bold: bld,
        })
      ]
    });
  }

  // first list
  public titleMOIRO(): Paragraph
  {
    return new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: 'ГОСУДАРСТВЕННОЕ УЧРЕЖДЕНИЕ ОБРАЗОВАНИЯ',
          size : this.size,
          bold : true,
          allCaps: true
        }),
        new TextRun({
          text: '«МИНСКИЙ ОБЛАСТНОЙ ИНСТИТУТ РАЗВИТИЯ ОБРАЗОВАНИЯ»',
          size : this.size,
          bold : true,
          allCaps: true,
          break: 1
        }),
      ],
    });
  }

  public approve(year: string, isRector: boolean): Paragraph
  {
    if (isRector === true){
      return this.approveRector(year);
    }
    else {
      return this.approveDean(year);
    }
  }

  public approveRector(year: string): Paragraph
  {
    return new Paragraph({
      children: [
        new TextRun({
          text: '\tутверждаю',
          size : this.size,
          allCaps: true
        }),
        new TextRun({
          text: '\tРектор института',
          size : this.size,
          break: 1
        }),
        new TextRun({
          text: '\t__________ ' + 'И.П.Кондратьева',
          size : this.size,
          break: 1
        }),
        new TextRun({
          text: '\t__________ ' + year,
          size : this.size,
          break: 1
        })
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
          text: '\tДекан факультета',
          size : this.size,
          break: 1
        }),
        new TextRun({
          text: '\tпрофессионального развития',
          size : this.size,
          break: 1
        }),
        new TextRun({
          text: '\tруководящих работников',
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
      tabStops: [
        {
          type: TabStopType.LEFT,
          position: 5800,
        },
      ],
    });
  }

  public yearBoth(): Paragraph
  {
    return new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: 'Минск, ' + this.getNowYear(),
          size : this.size
        })
      ]
    });
  }

  public pageNumbers(): Paragraph
  {
    return new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          children: ['', PageNumber.CURRENT],
        }),
      ]
    });
  }

  // another list
  public titleText(title: string): Paragraph
  {
    return new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: title,
          size : this.size,
          bold : true,
          allCaps: true,
        }),
      ],
    });
  }

  public mainNameDocumentTP(exactly: string): Paragraph
  {
    return new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: 'УЧЕБНАЯ ПРОГРАММА ПОВЫШЕНИЯ КВАЛИФИКАЦИИ',
          size : this.size,
          bold : true,
          allCaps: true,
          break: 9
        }),
        new TextRun({
          text: exactly,
          size : this.size,
          bold : true,
          break: 1
        }),
      ],
    });
  }

  public mainNameDocumentATP(exactly: string): Paragraph
  {
    return new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: 'УЧЕБНО-ТЕМАТИЧЕСКИЙ ПЛАН',
          size : this.size,
          bold : true,
          allCaps: true,
          break: 1
        }),
        new TextRun({
          text: 'повышения квалификации',
          size : this.size,
          bold : true,
          break: 1
        }),
        new TextRun({
          text: exactly,
          size : this.size,
          bold : true,
          break: 1
        }),
      ],
    });
  }

  public studentCategoryMain(exactly: string): Paragraph  // Написать логику для удаления и подстановки на возможные другие варианты!!!
  {
    exactly = exactly.substring( exactly.indexOf(' ') + 1, exactly.length );
    return new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: 'учителей, ' + exactly,
          size : this.size,
          bold : true,
        }),
      ],
    });
  }

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

  public tableATP(
    trainingProgramCurriculumSections: TrainingProgramCurriculumSection[],
    curriculumTopicsList: CurriculumTopicTrainingProgram[][],
    occupationForms: OccupationForm[]): Table{
    const row: any = [];
    row.push(
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Названия разделов и тем')],
            rowSpan: 3,
            verticalAlign: VerticalAlign.CENTER
          }),
          new TableCell({
            children: [new Paragraph('Количество учебных часов')],
            columnSpan: occupationForms.length,
            verticalAlign: VerticalAlign.CENTER
          }),
          new TableCell({
            children: [new Paragraph('Кафедра')],
            rowSpan: 3,
            verticalAlign: VerticalAlign.CENTER
          }),
        ],
      }),
    );
    row.push(
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Распределение по видам занятий')],
            columnSpan: occupationForms.length
          }),
        ],
      }),
    );
    row.push(this.tableRowOccupationForm(occupationForms));
    row.push(this.tableRowNumber(occupationForms.length));
    trainingProgramCurriculumSections.forEach(obj => {
      row.push(this.tableRowCurriculumSection(obj));
    });


    return new Table({
      rows: row
    });
  }

  public tableRowOccupationForm(occupationForms: OccupationForm[]): TableRow
  {
    const child: any = [];
    child.push(new TableCell({
      children: [
        new Paragraph('Всего')
      ]
    }));
    occupationForms.forEach(obj => {
      if (obj.id !== 1){
        child.push(new TableCell({
          children: [
            new Paragraph(obj.fullName)
          ]
        }));
      }
    });
    return new TableRow({
      children: child
    });
  }

  public tableRowNumber(occupationFormLength: number): TableRow
  {
    const child: any = [];
    for (let i = 1; i < occupationFormLength + 3; i++){
      child.push(new TableCell({
        children: [
          new Paragraph((i).toString())
        ]
      }));
    }
    return new TableRow({
      children: child
    });
  }

  public tableRowCurriculumSection(trainingProgramCurriculumSection: TrainingProgramCurriculumSection): TableRow
  {
    const child: any = [];
    child.push(new TableCell({
      children: [
        new Paragraph(trainingProgramCurriculumSection.name)
      ]
    }));
    return new TableRow({
      children: child
    });
  }

  public getNowYear(): string
  {
    return new Date().getFullYear().toString();
  }
}
