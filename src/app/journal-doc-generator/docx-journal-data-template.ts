import {
  AlignmentType,
  PageBreak,
  PageNumber,
  Paragraph,
  TabStopType,
  TextRun
} from 'docx';
import {CurriculumTopicTrainingProgramGenerator} from '../models/generator-models/CurriculumTopicTrainingProgramGenerator';
import {style} from "@angular/animations";

export class DocxJournalDataTemplate {

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
  public titleMOIRO(boldVal = false): Paragraph
  {
    return new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: 'Государственное учреждение образования',
          size : this.size,
          bold : boldVal,
        }),
        new TextRun({
          text: '«Минский областной институт развития образования»',
          size : this.size,
          bold : boldVal,
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

  public experts(obj: any): Paragraph {
    let rank = '';
    if (obj.academicRank !== '') {
      rank = ', ' + obj.academicRank;
    }
    return this.someText(obj.firstName[0].toUpperCase() + '.' +
      obj.patronymicName[0].toUpperCase() + '. ' +
      obj.lastName + ', ' + obj.position + rank);
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

  public classHoursStringBuilder(obj: CurriculumTopicTrainingProgramGenerator, isDist: boolean): string {
    let tmpString = '';
    obj.occupationFormClassHours.forEach((occupationFormClassHour, index) => {
      if (index === 0) { tmpString += ' ('; }
      if (index !== 0) { tmpString += ', '; }
      if (occupationFormClassHour.fullName.toLowerCase() === 'форум') {
        tmpString += occupationFormClassHour.fullName.toString().toLowerCase();
      }
      else {
        if (isDist) {
          tmpString += occupationFormClassHour.fullName.toString().toLowerCase().split(',')[0] + ': онлайн,' +
            ' ' + occupationFormClassHour.classHours + ' ' + this.classHoursEndingDeclination(occupationFormClassHour.classHours);
        }
        else {
          tmpString += occupationFormClassHour.fullName.toString().toLowerCase().split(',')[0] + ',' +
            ' ' + occupationFormClassHour.classHours + ' ' + this.classHoursEndingDeclination(occupationFormClassHour.classHours);
        }
      }
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

  weekEndingDeclination(numberOfWeeks: number): string {
    switch (numberOfWeeks) {
      case 1: return 'неделя';
      case 2: return 'недели';
      case 3: return 'недели';
      case 4: return 'недели';
      default: return 'недель';
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

  public studentCategoryMain(exactly: string): Paragraph
  {
    return new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: exactly,
          size : this.size,
          bold : true,
        }),
      ],
    });
  }

  public trainingProgramInfoATP(
    numberOfHours: number, formOfEducation: string, isDistance: boolean, numberOfWeeks: number): Paragraph {
    let tmp = '';
    const weeks = this.weekEndingDeclination(numberOfWeeks);
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
          text: 'Продолжительность обучения - ' + numberOfWeeks + ' ' + weeks +
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

  public noteATP(isForum: boolean, isDistanceLearning: boolean): Paragraph {
    const child: any = [];
    child.push(new TextRun({
      text: 'Примечание:',
      break: 1
    }));
    if (!isDistanceLearning) {
      child.push(
        new TextRun({
          text: '1. При проведении практических занятий группа может делиться на две' +
            ' подгруппы численностью слушателей не менее 12 человек.',
          break: 1
        }),
        new TextRun({
          text: '2. В проведении круглого стола, тематической дискуссии, конференции принимают участие' +
            ' 2 преподавателя, деловой игры – до 3 преподавателей.',
          break: 1
        }));
    }
    else {
      child.push(new TextRun({
        text: child.length + '. Расчет часов за проверку контрольных работ осуществляется из расчета 0,3 часа за одну работу.',
        break: 1
      }));
      if (isForum) {
        child.push(new TextRun({
          text: child.length + '. Расчет часов за проведение форума (текущих консультаций слушателей дистанционной формы' +
            ' получения образования) осуществляется из расчета 0,15 часа на одного слушателя.',
          break: 1
        }));
      }
      child.push(new TextRun({
        text: child.length + '. По запросам слушателей проводятся индивидуальные консультации из расчета 0,4 часа ' +
          'на одного слушателя за весь заочный (дистанционный) курс.',
        break: 1
      }));
      child.push(new TextRun({
        text: child.length + '. В проведении зачета принимают участие 2 члена комиссии и отводится до 0,25 часа' +
          ' на одного слушателя каждому члену комиссии.',
        break: 1
      }));
    }

    return new Paragraph({
      children: child
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

  public testWork(txt: string, indent?: number): Paragraph {
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
          italics: true,
          break: 1
        })
      ]
    });
  }

  public independentWork(txt: string, indent?: number): Paragraph {
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
          italics: true
        })
      ]
    });
  }

  public getNowYear(): string
  {
    return new Date().getFullYear().toString();
  }

  public ministryOfEducation(): Paragraph{
    return new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: 'Министерство образования Республики Беларусь',
          size : 30,
          bold : false,
        }),
      ],
    });
  }

  public titleJournal(): Paragraph
  {
    return new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: 'Ж У Р Н А Л',
          size : 36,
          bold : true,
          allCaps: true,
        }),
        new TextRun({
          text: 'учебных занятий',
          size : 36,
          bold : true,
          break: 1
        }),
        new TextRun({
          text: '(системы повышения квалификации)',
          size : 36,
          bold : true,
          italics : true,
          break: 1
        }),
      ],
    });
  }

  public titlePKProgram(): Paragraph
  {
    return new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: 'Образовательная программа повышения квалификации',
          size : this.size,
          bold : false,
        }),
        new TextRun({
          text: 'руководящих работников и специалистов',
          size : this.size,
          bold : false,
          break: 1
        }),
      ],
    });
  }

  public titleTrainingProgram(): Paragraph
  {
    return new Paragraph({
      alignment: AlignmentType.LEFT,
      children: [
        new TextRun({
          text: 'Тема учебной программы______________________________________________',
          size : this.size,
          bold : false,
        }),
        new TextRun({
          text: '',
          break: 1
        }),
        new TextRun({
          text: '____________________________________________________________________',
          size : this.size,
          bold : false,
          break: 1
        }),
        new TextRun({
          text: '',
          break: 1
        }),
        new TextRun({
          text: '____________________________________________________________________',
          size : this.size,
          bold : false,
          break: 1
        }),
      ],
    });
  }
  public group(): Paragraph
  {
    return new Paragraph({
      alignment: AlignmentType.LEFT,
      children: [
        new TextRun({
          text: 'Группа № ____________',
          size : this.size,
          bold : false,
        }),
      ],
    });
  }

  public educationForm(): Paragraph
  {
    return new Paragraph({
      alignment: AlignmentType.LEFT,
      children: [
        new TextRun({
          text: 'Форма получения образования _________________________________________',
          size : this.size,
          bold : false,
        }),
      ],
    });
  }

  public studyDuration(): Paragraph
  {
    return new Paragraph({
      alignment: AlignmentType.LEFT,
      children: [
        new TextRun({
          text: 'Продолжительность обучения __________________________________________',
          size : this.size,
          bold : false,
        }),
      ],
    });
  }

  public startTime(): Paragraph
  {
    return new Paragraph({
      alignment: AlignmentType.LEFT,
      indent: {
        left: 4032,
      },
      children: [
        new TextRun({
          text: 'Начало занятий _________________________',
          size : this.size,
          bold : false,
        }),
      ],
    });
  }

  public endTime(): Paragraph
  {
    return new Paragraph({
      alignment: AlignmentType.LEFT,
      indent: {
        left: 4032,
      },
      children: [
        new TextRun({
          text: 'Окончание занятий ______________________',
          size : this.size,
          bold : false,
        }),
      ],
    });
  }
  public methodist(): Paragraph
  {
    return new Paragraph({
      alignment: AlignmentType.LEFT,
      children: [
        new TextRun({
          text: 'Методист ___________________________________________________________',
          size : this.size,
          bold : false,
        }),
      ],
    });
  }
  public educationalDepartmentChief(): Paragraph
  {
    return new Paragraph({
      alignment: AlignmentType.LEFT,
      children: [
        new TextRun({
          text: 'Начальник учебного отдела ____________________________________________',
          size : this.size,
          bold : false,
        }),
      ],
    });
  }
}
