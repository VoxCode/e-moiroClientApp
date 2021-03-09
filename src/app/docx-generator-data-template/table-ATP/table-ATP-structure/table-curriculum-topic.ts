import {CurriculumTopicTrainingProgram} from '../../../models/СurriculumTopicTrainingProgram';
import {OccupationForm} from '../../../models/OccupationForm';
import {Department} from '../../../models/Department';
import {Paragraph, TableCell, TableRow, TextRun, VerticalAlign} from 'docx';
import {CurriculumTopicTotalClassHours} from '../table-class-hours/curriculum-topic-total-class-hours';
import {TableCellBoldTextAlignmentCenter} from '../table-cell-templates/table-cell-bold-text-alignment-center';
import {TableCellDefaultTextAlignmentCenter} from '../table-cell-templates/table-cell-default-text-alignment-center';
import {TableCellDefaultText} from "../table-cell-templates/table-cell-default-text";

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
    const tableCellBoldText = new TableCellBoldTextAlignmentCenter();
    const tableCellDefaultText = new TableCellDefaultText();
    const tableCellDefaultTextCenter = new TableCellDefaultTextAlignmentCenter();
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

    child.push(tableCellDefaultTextCenter.insertText(classHours[totalClassHours]));

    classHours.forEach(obj => {
      child.push(tableCellDefaultTextCenter.insertText(obj));
    });

    if (this.i === 1) {
      child.push(new TableCell({
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
