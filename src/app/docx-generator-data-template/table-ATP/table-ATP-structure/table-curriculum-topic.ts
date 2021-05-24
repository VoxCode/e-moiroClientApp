import {OccupationForm} from '../../../models/OccupationForm';
import {Paragraph, TableCell, TableRow, TextRun} from 'docx';
import {CurriculumTopicTotalClassHours} from '../table-class-hours/curriculum-topic-total-class-hours';
import {TableCellDefaultTextAlignmentCenter} from '../table-cell-templates/table-cell-default-text-alignment-center';
import {TableCellDefaultText} from '../table-cell-templates/table-cell-default-text';
import {CurriculumTopicTrainingProgramGenerator} from '../../../models/generator-models/CurriculumTopicTrainingProgramGenerator';

export class TableCurriculumTopic {
  constructor(
    private curriculumTopic: CurriculumTopicTrainingProgramGenerator,
    private index: number,
    private i: number,
    private occupationForms: OccupationForm[],
    private variable: boolean,
    private departmentName: string,
    private blockLength: number) {
  }

  public insert(): TableRow {
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
    const classHours = curriculumTopicTotalClassHours.ClassHours;

    child.push(tableCellDefaultTextCenter.insertText(curriculumTopicTotalClassHours.TotalClassHours.toString()));

    classHours.forEach(obj => {
      if (obj !== 0) {
        child.push(tableCellDefaultTextCenter.insertText(obj.toString()));
      }
      else {
        child.push(tableCellDefaultTextCenter.insertText(''));
      }
    });

    if (this.i === 1) {
      child.push(new TableCell({
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text:  this.departmentName.substr(this.departmentName.indexOf(' ') + 1),
              })
            ],
          })
        ],
        rowSpan: this.blockLength
      }));
    }

    return new TableRow({
      children: child,

    });
  }
}
