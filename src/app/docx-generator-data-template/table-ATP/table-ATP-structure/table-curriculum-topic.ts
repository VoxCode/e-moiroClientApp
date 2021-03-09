import {CurriculumTopicTrainingProgram} from '../../../models/СurriculumTopicTrainingProgram';
import {OccupationForm} from '../../../models/OccupationForm';
import {Department} from '../../../models/Department';
import {Paragraph, TableCell, TableRow, TextRun, VerticalAlign} from 'docx';
import {TableCellBoldText} from '../table-cell-templates/table-cell-bold-text';
import {TableCellDefaultText} from '../table-cell-templates/table-cell-default-text';
import {CurriculumTopicTotalClassHours} from '../table-class-hours/curriculum-topic-total-class-hours';

export class TableCurriculumTopic {
  constructor(
    private curriculumTopic: CurriculumTopicTrainingProgram,
    private index: number,
    private i: number,
    private occupationForms: OccupationForm[],
    private variable: boolean,
    private department: Department,
    private list: CurriculumTopicTrainingProgram[]) {
  }

  public insert(): TableRow {
    const tableCellBoldText = new TableCellBoldText();
    const tableCellDefaultText = new TableCellDefaultText();
    const child: any = [];
    if (!this.variable) {
      child.push(tableCellDefaultText.insertText((++this.index) + '.' + (++this.i) + '. ' + this.curriculumTopic.topicTitle));
    }
    else {
      ++this.i;
      child.push(tableCellDefaultText.insertText(this.curriculumTopic.topicTitle));
    }

    const curriculumTopicTotalClassHours = new CurriculumTopicTotalClassHours(this.occupationForms, this.curriculumTopic);
    const classHours = curriculumTopicTotalClassHours.getClassHours;
    const totalClassHours = curriculumTopicTotalClassHours.getTotalClassHours;

    child.push(tableCellBoldText.insertText(classHours[totalClassHours]));

    classHours.forEach(obj => {
      child.push(tableCellDefaultText.insertText(obj));
    });

    if (this.i === 1) {
      child.push(new TableCell({
        verticalAlign: VerticalAlign.CENTER,
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text:  this.department.name.substr(this.department.name.indexOf(' ') + 1),
              })
            ],
          })
        ],
        rowSpan: this.list.length
      }));
    }

    return new TableRow({
      children: child,
      cantSplit: true,
    });
  }
}
