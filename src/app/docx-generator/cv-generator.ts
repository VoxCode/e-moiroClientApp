import {
  AlignmentType,
  BorderStyle,
  Document,
  HeadingLevel, PageBreak,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TabStopPosition,
  TabStopType,
  TextRun
} from 'docx';

export class DocumentCreator {
  // tslint:disable-next-line: typedef
  private teacher: number;
  public create([model, internalParameter ]): Document {
    const document = new Document({
      creator: 'MOIRO',
      title: 'Document of MOIRO',
      styles: {
        paragraphStyles: [ {
          id: 'default',
          name: 'My Standard style',
          basedOn: 'Normal',
          next: 'Normal',
          quickFormat: true,
          run: {
            size: 28,
          },
        }],
      },
    });

    document.addSection({
      margins: {
        top: 1133,
        right: 566,
        bottom: 1133,
        left: 1699,
      },
      children: [
        //#region "First page"
        this.titleMOIRO(),
        this.emptyParagraph(),
        this.tableApproveDocument('2020'),
        ...internalParameter
          .map((nothing) => {
            const arr: Paragraph[] = [];
            for (let i = 0; i < 14; i++)
            {
              arr.push(this.emptyParagraph());
            }
            return arr;
          })
          .reduce((prev, curr) => prev.concat(curr), []),
        this.MainNameDocument('Программа реализация педагогическо-психологической деятельности иженеров психологов в условиях повышшеного дискомфорта'),
        ...internalParameter
          .map((nothing) => {
            const arr: Paragraph[] = [];
            for (let i = 0; i < 18; i++)
            {
              arr.push(this.emptyParagraph());
            }
            return arr;
          })
          .reduce((prev, curr) => prev.concat(curr), []),
        this.yearBoth(2020),
        this.pageBreak(),
        //#endregion First page
        //#region "Second page"
        ...internalParameter
          .map((nothing) => {
            const arr: Paragraph[] = [];
            this.teacher = 3; // logic of teachers
            if (this.teacher >= 2) {
              arr.push(this.someText('Разработчики учебной программы:'));
              for (let i = 0; i < this.teacher; i++) {
                arr.push(
                  this.someText('Rector name' + i.toString() + ', ' + 'Доцент, три пяди во лбу и вообще мастер своего дела (наврное)')
                );
              }
            }
            else
            {
              arr.push(this.someText( 'Разработчики учебной программы'));
              arr.push(this.someText( 'Rector name, ' + 'Доцент, три пяди во лбу и вообще мастер своего дела (наврное)'));
            }
            arr.push(this.emptyParagraph());
            let coun: number;
            coun = 2;
            if (coun >= 2 ) // рецензенты
            {
              arr.push(this.someText('Рецензенты:'));
              for (let i = 0; i < this.teacher; i++) {
                arr.push(this.someText('Рецензент name' + i.toString() + ', ' + 'Доцент, три пяди во лбу и вообще мастер своего дела (наврное)'));
              }
            }
            else
            {
              arr.push(this.someText( 'Рецензент:'));
              arr.push(this.someText( 'Рецензент name, ' + 'Доцент, три пяди во лбу и вообще мастер своего дела (наврное)'));
            }
            for (let i = 0; i < 20; i++)
            {
              arr.push(this.emptyParagraph());
            }
            arr.push( this.someText('Рекомендовано к утверждению:'));
            arr.push(this.someText('кафедра частных методик общего среднего образования\n' +
              'государственного учреждения образования\n' +
              '«Минский областной институт развития образования»\n' +
              'протокол заседания от ____________ 2020 № ______\n'));
            arr.push(this.emptyParagraph());
            arr.push(this.someText('научно-методический совет\n' +
              'государственного учреждения образования \n' +
              '«Минский областной институт развития образования»\n' +
              'протокол заседания от ____________ 2020 № ______\n'));
            arr.push(this.pageBreak());
            return arr;
          })
          .reduce((prev, curr) => prev.concat(curr), []),
        //#endregion
        //#region "Third page"
        ...internalParameter
          .map((nothing) => {
            const arr: Paragraph[] = [];
            arr.push(this.titleText('введение'));
            arr.push(this.emptyParagraph());
            arr.push(this.someText('Актуальность.', 720,  true));
            arr.push(this.someText('some text'));
            arr.push(this.someText('Цель.', 720, true));
            arr.push(this.someText('some text'));
            arr.push(this.someText('Задачи.', 720, true));
            arr.push(this.someText('some text'));
            arr.push(this.someText('Основные требования к результатам учебной деятельности слушателей.', 720, true));
            arr.push(this.someText('some text', ));
            arr.push(this.someText('Виды учебных занятий.', 720, true));
            arr.push(this.someText('some text like lections', ));
            arr.push(this.someText('Методы повышения квалификации..', 720, true));
            arr.push(this.someText('some text ', ));
            arr.push(this.someText('Средства повышения квалификации', 720, true));
            arr.push(this.someText('some text like lections', ));
            arr.push(this.someText('Форма итоговой аттестации.', 720, true));
            arr.push(this.someText('some text like lections', ));
            return arr;
          })
          .reduce((prev, curr) => prev.concat(curr), []),
        //#endregion  ThirdPage
        //#region FourPage
        ...internalParameter
          .map((nothing) => {
            const arr: Paragraph[] = [];
            arr.push(this.emptyParagraph());
            arr.push(this.titleText('содержание'));
            for (let i = 1; i < 5; i++) // loop for a parts (PERFERED OBJECT THEN INT)
            {
              arr.push(this.emptyParagraph());
              arr.push(this.titleText(i.toString() + '. Название раздела.'));
              arr.push(this.emptyParagraph());
              arr.push(this.someTextCenter('Инвариантная часть.', 0,  true));
              for (let input = 1; input < 7; input++)
              {
                arr.push(this.someText(i.toString() + '.' + input.toString() + ' Тема и задачи инвариативные'));
              }
              arr.push(this.emptyParagraph());
              arr.push(this.someTextCenter('Вариативная часть.', 0,  true));
              for (let input = 1; input < 3; input++)
              {
                arr.push(this.someText(i.toString() + '.' + input.toString() + ' Тема и задачи вариативные'));
              }
            }
            arr.push(this.pageBreak());
            return arr;
          })
          .reduce((prev, curr) => prev.concat(curr), []),
        //#endregion

        // #region FivePage
        ...internalParameter
          .map((nothing) => {
            const arr: Paragraph[] = [];
            arr.push(this.titleText('содержание самостоятельной работы'));
            arr.push(this.emptyParagraph());
            for (let i = 1; i < 5; i++) // loop for a parts (PERFERED OBJECT THEN INT)
            {
              for (let input = 1; input < 7; input++)
              {
                arr.push(this.someText(i.toString() + '.' + input.toString() + ' Нормативы и прочие обеспечения'));
                arr.push(this.someText('Задание (сколько то там часов)', 720));
                arr.push(this.someText('Литература (какие-то страницы)', 720));
              }
              arr.push(this.emptyParagraph());
            }
            arr.push(this.pageBreak());
            return arr;
          })
          .reduce((prev, curr) => prev.concat(curr), []),
        // #endregion
        // #region Содержание контрольно работы
        ...internalParameter
          .map((nothing) => {
            const arr: Paragraph[] = [];
            arr.push(this.titleText('содержание контрольной работы'));
            arr.push(this.emptyParagraph());
            for (let i = 1; i < 5; i++) // loop for a parts (PERFERED OBJECT THEN INT)
            {
              arr.push(this.someText('Контрольная работа №' + i.toString() +  ' Название кр - потом добавлю', 720, true));
              arr.push(this.emptyParagraph());
              for (let input = 1; input < 7; input++)
              {
                arr.push(this.someText(input.toString() + '. Задания (много много много)', 720));
                arr.push(this.someText('Литература (какие-то страницы)', 720));
                arr.push(this.emptyParagraph());
              }
            }
            arr.push(this.pageBreak());
            return arr;
          })
          .reduce((prev, curr) => prev.concat(curr), []),
        // #endregion
        // #region Материалы итоговой аттестации
        ...internalParameter
          .map((nothing) => {
            const arr: Paragraph[] = [];
            arr.push(this.titleText('Материалы итоговой аттестации слушателей'));
            arr.push(this.emptyParagraph());
            arr.push(this.someTextCenter('Вопросы для проведения зачета', 0 , true));
            arr.push(this.emptyParagraph());
            for (let i = 1; i < 21; i++) {
              arr.push(this.someText(i.toString() + '. Адаптивная образовательная среда в условиях интегрированного обучения и воспитания', 720));
            }
            arr.push(this.pageBreak());
            return arr;
          })
          .reduce((prev, curr) => prev.concat(curr), []),
        // #endregion
        // #region Материалы итоговой аттестации
        ...internalParameter
          .map((nothing) => {
            const arr: Paragraph[] = [];
            arr.push(this.titleText('список используемой литературы'));
            arr.push(this.emptyParagraph());
            arr.push(this.someText('Основная', 720, true));
            for (let i = 1; i < 6; i++) {
              arr.push(this.someText(i.toString() + '. Лиетаратура и её страницы', 720));
            }
            arr.push(this.emptyParagraph());
            arr.push(this.someText('Дополнительная', 720, true));
            for (let i = 1; i < 4; i++) {
              arr.push(this.someText(i.toString() + '. Лиетаратура и её страницы', 720));
            }
            arr.push(this.emptyParagraph());
            arr.push(this.someText('Нормативно правовые акты', 720, true));
            for (let i = 1; i < 10; i++) {
              arr.push(this.someText(i.toString() + '. Лиетаратура и её страницы', 720));
            }
            arr.push(this.pageBreak());
            return arr;
          })
          .reduce((prev, curr) => prev.concat(curr), []),
        // #endregion
      ],
    });
    return document;
  }

  // ==============================================
  // -------- this code write by Gybarev ----------
  // ==============================================

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
          text: 'ГОСУДАРСТВЕННОЕ УЧРЕЖДЕНИЕ ОБРАЗОВАНИЯ\n' +
            '«МИНСКИЙ ОБЛАСТНОЙ ИНСТИТУТ РАЗВИТИЯ ОБРАЗОВАНИЯ»\n',
          size : 30,
          bold : true,
        }),
      ],
    });
  }

  public tableApproveDocument(year: string): Table
  {
    return new Table({
      alignment: AlignmentType.RIGHT,
      borders: {
        insideHorizontal:
          {
            style: BorderStyle.NONE,
            size: 0,
            color: '0000000',
          },
        top: {
          style: BorderStyle.NONE,
          size: 1,
          color: '000000',
        },
        bottom: {
          style: BorderStyle.NONE,
          size: 0,
          color: 'white',
        },
        left: {
          style: BorderStyle.NONE,
          size: 0,
          color: '000000'
        },
        right: {
          style: BorderStyle.NONE,
          size: 0,
          color: '000000'
        },
      },
      rows: [
        new TableRow({
          cantSplit: true,
          children: [
            new TableCell({
              children: [new Paragraph({
                children: [
                  new TextRun({
                    text: 'утверждаю',
                    size : 30,
                    allCaps: true,
                  }),
                ]
              })]
            }),
          ],
        }),

        new TableRow({
          cantSplit: true,
          children: [
            new TableCell({
              children: [new Paragraph({
                children: [
                  new TextRun({
                    text : 'Ректор института',
                    size: 30,
                  }),
                ]
              })]
            }),
          ],
        }),

        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph({
                children: [
                  new TextRun({
                    text : '__________ ' + 'Кондратьева И.П.',
                    size: 30,
                  }),
                ]
              })]
            }),
          ],
        }),

        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph({
                children: [
                  new TextRun({
                    text : '__________ ' + year,
                    size: 30,
                  }),
                ]
              })]
            }),
          ],
        }),
      ],
    });
  }

  public MainNameDocument(exactly: string): Paragraph
  {
    return new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: 'УЧЕБНАЯ ПРОГРАММА ПОВЫШЕНИЯ КВАЛИФИКАЦИИ\n' +
            exactly + '\n',
          size : 30,
          bold : true,
        }),
      ],
    });
  }

  public yearBoth(year: number): Paragraph
  {
   return new Paragraph({
     alignment: AlignmentType.CENTER,
     children: [
       new TextRun({
         text: 'Минск, ' + year.toString(),
         size : 30,
       })
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
          size : 28,
          bold : true,
          allCaps: true,
        }),
      ],
    });
  }
  // ===============================================
  // ----- this code generated by owner module -----
  // ===============================================


  /* this.createHeading('Education'),
  ...educations
    .map((education) => {
      const arr: Paragraph[] = [];
      arr.push(
        this.createInstitutionHeader(education.schoolName, `${education.startDate.year} - ${education.endDate.year}`),
      );
      arr.push(this.createRoleText(`${education.fieldOfStudy} - ${education.degree}`));

      const bulletPoints = this.splitParagraphIntoBullets(education.notes);
      bulletPoints.forEach((bulletPoint) => {
        arr.push(this.createBullet(bulletPoint));
      });

      return arr;
    })
    .reduce((prev, curr) => prev.concat(curr), []),
  this.createHeading('Experience'),
  ...experiences
    .map((position) => {
      const arr: Paragraph[] = [];

      arr.push(
        this.createInstitutionHeader(
          position.company.name,
          this.createPositionDateText(position.startDate, position.endDate, position.isCurrent),
        ),
      );
      arr.push(this.createRoleText(position.title));

      const bulletPoints = this.splitParagraphIntoBullets(position.summary);

      bulletPoints.forEach((bulletPoint) => {
        arr.push(this.createBullet(bulletPoint));
      });

      return arr;
    })
    .reduce((prev, curr) => prev.concat(curr), []),
  this.createHeading('Skills, Achievements and Interests'),
  this.createSubHeading('Skills'),
  this.createSkillList(skills),
  this.createSubHeading('Achievements'),
  ...this.createAchivementsList(achievements),
  this.createSubHeading('Interests'),
  this.createInterests('Programming, Technology, Music Production, Web Design, 3D Modelling, Dancing.'),
  this.createHeading('References'),*/

  public createContactInfo(phoneNumber: string, profileUrl: string, email: string): Paragraph {
    return new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun(`Mobile: ${phoneNumber} | LinkedIn: ${profileUrl} | Email: ${email}`),
        new TextRun('Address:  58 Elm Avenue, Kent ME4 6ER, UK').break(),
      ],
    });
  }

  public createHeading(text: string): Paragraph {
    return new Paragraph({
      text,
      heading: HeadingLevel.HEADING_1,
      thematicBreak: true,
    });
  }

  public createSubHeading(text: string): Paragraph {
    return new Paragraph({
      text,
      heading: HeadingLevel.HEADING_2,
    });
  }

  public createInstitutionHeader(institutionName: string, dateText: string): Paragraph {
    return new Paragraph({
      tabStops: [
        {
          type: TabStopType.RIGHT,
          position: TabStopPosition.MAX,
        },
      ],
      children: [
        new TextRun({
          text: institutionName,
          bold: true,
        }),
        new TextRun({
          text: `\t${dateText}`,
          bold: true,
        }),
      ],
    });
  }

  public createRoleText(roleText: string): Paragraph {
    return new Paragraph({
      children: [
        new TextRun({
          text: roleText,
          italics: true,
        }),
      ],
    });
  }

  public createBullet(text: string): Paragraph {
    return new Paragraph({
      text: 'fdngfn',
      bullet: {
        level: 0,
      },
    });
  }

  // tslint:disable-next-line:no-any
  public createSkillList(skills: any[]): Paragraph {
    return new Paragraph({
      children: [new TextRun(skills.map((skill) => skill.name).join(', ') + '.')],
    });
  }

  // tslint:disable-next-line:no-any
  public createAchivementsList(achivements: any[]): Paragraph[] {
    return achivements.map(
      (achievement) =>
        new Paragraph({
          text: achievement.name,
          bullet: {
            level: 0,
          },
        }),
    );
  }

  public createInterests(interests: string): Paragraph {
    return new Paragraph({
      children: [new TextRun(interests)],
    });
  }

  public splitParagraphIntoBullets(text: string): string[] {
    return text.split('\n\n');
  }

  // tslint:disable-next-line:no-any
  public createPositionDateText(startDate: any, endDate: any, isCurrent: boolean): string {
    const startDateText = this.getMonthFromInt(startDate.month) + '. ' + startDate.year;
    const endDateText = isCurrent ? 'Present' : `${this.getMonthFromInt(endDate.month)}. ${endDate.year}`;

    return `${startDateText} - ${endDateText}`;
  }

  public getMonthFromInt(value: number): string {
    switch (value) {
      case 1:
        return 'Jan';
      case 2:
        return 'Feb';
      case 3:
        return 'Mar';
      case 4:
        return 'Apr';
      case 5:
        return 'May';
      case 6:
        return 'Jun';
      case 7:
        return 'Jul';
      case 8:
        return 'Aug';
      case 9:
        return 'Sept';
      case 10:
        return 'Oct';
      case 11:
        return 'Nov';
      case 12:
        return 'Dec';
      default:
        return 'N/A';
    }
  }
}
