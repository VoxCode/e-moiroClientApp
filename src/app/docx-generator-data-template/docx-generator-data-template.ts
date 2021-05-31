import {
  AlignmentType,
  PageBreak,
  PageNumber,
  Paragraph,
  TabStopType,
  TextRun
} from 'docx';
import {CurriculumTopicTrainingProgramGenerator} from '../models/generator-models/CurriculumTopicTrainingProgramGenerator';

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

  public someTextCertificationType(txt: string, txt2: string, indent?: number, bld?: boolean, caps?: boolean ): Paragraph{

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
          text: txt2.toLowerCase(),
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

  public classHoursStringBuilder(obj: CurriculumTopicTrainingProgramGenerator): string {
    let tmpString = '';
    obj.occupationFormClassHours.forEach((occupationFormClassHour, index) => {
      if (index === 0) { tmpString += ' ('; }
      if (index !== 0) { tmpString += ', '; }
      tmpString += occupationFormClassHour.fullName.toString().toLowerCase().split(',')[0] + ',' +
        ' ' + occupationFormClassHour.classHours + ' ' + this.classHoursEndingDeclination(occupationFormClassHour.classHours);
      if (index === obj.occupationFormClassHours.length - 1) { tmpString += ')'; }
    });
    return tmpString;
  }

  classHoursEndingDeclination(classHour: number): string {
    switch (classHour) {
      case 1: return 'час';
      case 2: return 'часа';
      case 3: return 'часа';
      case 4: return 'часа';
      case 21: return 'час';
      case 22: return 'часа';
      case 23: return 'часа';
      case 24: return 'часа';
      case 31: return 'час';
      case 32: return 'часа';
      case 33: return 'часа';
      case 34: return 'часа';
      case 41: return 'час';
      case 42: return 'часа';
      case 43: return 'часа';
      case 44: return 'часа';
      case 51: return 'час';
      case 52: return 'часа';
      case 53: return 'часа';
      case 54: return 'часа';
      case 61: return 'час';
      case 62: return 'часа';
      case 63: return 'часа';
      case 64: return 'часа';
      case 71: return 'час';
      case 72: return 'часа';
      case 73: return 'часа';
      case 74: return 'часа';
      default: return 'часов';
    }
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
          text: 'учителей ' + exactly,
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
    else {
      if (formOfEducation.toLowerCase() === 'очная') {
        tmp = '(дневная)';
      }
    }
    return new Paragraph({
      children: [
        new TextRun({
          text: 'Продолжительность обучения - ' + 'X' + ' недель' +
            ' (' + numberOfHours + ' ' + this.classHoursEndingDeclination(numberOfHours) + ')',
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

  public noteATP(): Paragraph {
    return new Paragraph({
      children: [
        new TextRun({
          text: 'Примечание:',
          break: 1
        }),
        new TextRun({
          // tslint:disable-next-line:max-line-length
          text: '1. При проведении практических занятий группа может делиться на две подгруппы численностью слушателей не менее 12 человек.',
          break: 1
        }),
        new TextRun({
          // tslint:disable-next-line:max-line-length
          text: '2. В проведении круглого стола, тематической дискуссии, конференции принимают участие 2 преподавателя, деловой игры – до 3 преподавателей.',
          break: 1
        }),
      ]
    });
  }

  public footerATPDean(isRector: boolean): Paragraph
  {
    if (isRector) {
      return new Paragraph({
        children: [
          new TextRun({
            text: 'Декан факультета',
            size : this.size,
            break: 2
          }),
          new TextRun({
            text: 'профессионального развития',
            size : this.size,
            break: 1
          }),
          new TextRun({
            text: 'руководящих работников',
            size : this.size,
            break: 1
          }),
          new TextRun({
            text: 'и специалистов образования \tЕ.А.Ротмирова',
            size : this.size,
            break: 1
          }),
        ],
        tabStops: [
          {
            type: TabStopType.LEFT,
            position: 6000,
          },
        ]
      });
    }
  }

  public footerATPDepartmentHead(department: string, departmentHeadName: string): Paragraph
  {
    return new Paragraph({
      children: [
        new TextRun({
          text: 'Заведующий кафедрой',
          size : this.size,
          break: 1
        }),
        new TextRun({
          text: department.substr(department.indexOf(' ') + 1) + '\t' + departmentHeadName,
          size : this.size,
          break: 1
        }),
      ],
      tabStops: [
        {
          type: TabStopType.LEFT,
          position: 6000,
        },
        ]
    });
  }

  public getNowYear(): string
  {
    return new Date().getFullYear().toString();
  }
}
