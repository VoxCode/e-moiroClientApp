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
import {TrainingProgram} from '../models/TrainingProgram';

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
    occupationForms: OccupationForm[],
    trainingProgram: TrainingProgram): Table{
    const row: any = [];
    row.push(this.tableHeaderFirstRow(occupationForms));
    row.push(this.tableHeaderSecondRow(occupationForms));
    row.push(this.tableRowOccupationForm(occupationForms));
    row.push(this.tableRowNumber(occupationForms.length));

    trainingProgramCurriculumSections.forEach((obj, index) => {
      row.push(this.tableRowCurriculumSection(obj, index));
      if (!trainingProgram.isDistanceLearning) {
        row.push(this.invariantTableRow());
      }
      let i = 0;
      curriculumTopicsList[index].forEach(curriculumTopic => {
        if (!curriculumTopic.isVariable || trainingProgram.isDistanceLearning) {
          row.push(this.curriculumTopicTableRow(curriculumTopic, index, i, occupationForms, false));
          ++i;
        }
      });
      if (!trainingProgram.isDistanceLearning) {
        row.push(this.variableTableRow());
        let j = 0;
        curriculumTopicsList[index].forEach(curriculumTopic => {
          if (curriculumTopic.isVariable){
            row.push(this.curriculumTopicTableRow(curriculumTopic, index, j, occupationForms, true));
            j++;
          }
        });
      }
    });

    return new Table({
      rows: row
    });
  }

  public tableHeaderFirstRow(occupationForms: any[]): TableRow {
    const child: any = [];
    child.push(new TableCell({
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
    );
    return new TableRow({
      children: child,
      cantSplit: true
    });
  }

  public tableHeaderSecondRow(occupationForms: any[]): TableRow {
    const child: any = [];
    child.push(new TableCell({
        children: [new Paragraph('Распределение по видам занятий')],
        columnSpan: occupationForms.length
      })
    );
    return new TableRow({
      children: child,
      cantSplit: true
    });
  }

  public curriculumTopicTableRow(
    curriculumTopic: CurriculumTopicTrainingProgram,
    index: number,
    i: number,
    occupationForms: OccupationForm[],
    variable: boolean): TableRow {
    const child: any = [];
    if (!variable) {
      child.push(new TableCell({
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: (++index) + '.' + (++i) + '. ' + curriculumTopic.topicTitle,
              }),
            ]
          })
        ]
      }));
    }
    else {
      child.push(new TableCell({
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: curriculumTopic.topicTitle,
              }),
            ]
          })
        ]
      }));
    }

    const classHours: string[] = [];
    let totalClassHours = 0;
    let j = 0;
    occupationForms.forEach(obj => {
      if (obj.id !== 1) {
        let tmp: string;
        tmp = this.curriculumTopicClassHours(obj.id, curriculumTopic);
        if (tmp !== '') {
          totalClassHours = j;
        }
        classHours.push(tmp);
        j++;
      }
    });

    child.push(new TableCell({
      verticalAlign: VerticalAlign.CENTER,
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: classHours[totalClassHours],
              bold: true
            })
          ]
        })
      ]
    }));

    classHours.forEach(obj => {
      child.push(new TableCell({
        verticalAlign: VerticalAlign.CENTER,
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: obj
              })
            ]
          })
        ]
      }));
    });

    child.push(new TableCell({
      verticalAlign: VerticalAlign.CENTER,
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: '',
              bold: true
            })
          ]
        })
      ]
    }));

    return new TableRow({
      children: child,
      cantSplit: true
    });
  }

  public curriculumTopicClassHours(
    occupationFormId: number, curriculumTopic: CurriculumTopicTrainingProgram): string {
    if (occupationFormId === curriculumTopic.occupationFormId) {
      return curriculumTopic.classHours.toString();
    }
    else {
      return '';
    }
  }

  public invariantTableRow(): TableRow {
    const child: any = [];
    child.push(new TableCell({
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: 'Инвариантная часть',
              bold : true,
            }),
          ]
        })
      ]
    }));
    return new TableRow({
      children: child,
      cantSplit: true
    });
  }

  public variableTableRow(): TableRow {
    const child: any = [];
    child.push(new TableCell({
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: 'Вариативная часть',
              bold : true,
            }),
          ]
        })
      ]
    }));
    return new TableRow({
      children: child,
      cantSplit: true
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
            new Paragraph({
              children: [
                new TextRun({
                  text: obj.fullName,
                })
              ]
            })
          ],
        }));
      }
    });
    return new TableRow({
      children: child,
      tableHeader: true,
      cantSplit: true
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
      children: child,
      tableHeader: true,
      cantSplit: true
    });
  }

  public tableRowCurriculumSection(
    trainingProgramCurriculumSection: TrainingProgramCurriculumSection, index: number): TableRow
  {
    const child: any = [];
    child.push(new TableCell({
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: (++index) + '. ' + this.capitalizeFirstLetter(trainingProgramCurriculumSection.name),
              bold : true,
            }),
          ]
        })
      ]
    }));
    return new TableRow({
      children: child,
      cantSplit: true
    });
  }

  public getNowYear(): string
  {
    return new Date().getFullYear().toString();
  }

  public capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
}
