import {CurriculumTopicTrainingProgram} from '../../../models/СurriculumTopicTrainingProgram';
import {OccupationForm} from '../../../models/OccupationForm';
import {TableRow} from 'docx';
import {InvariantCurriculumSectionAllClassHours} from '../table-class-hours/invariant-curriculum-section-all-class-hours';
import {InvariantCurriculumSectionOccupationFormAllClassHours} from '../table-class-hours/invariant-curriculum-section-occupation-form-all-class-hours';
import {TableCellBoldText} from '../table-cell-templates/table-cell-bold-text';
import {EmptyTableCell} from '../table-cell-templates/empty-table-cell';
import {TableCellDefaultText} from '../table-cell-templates/table-cell-default-text';

export class TableInvariantSection {
  private child: any = [];
  constructor(
    private curriculumTopics: CurriculumTopicTrainingProgram[],
    private occupationForms: OccupationForm[]) {
  }

  public insert(): TableRow {
    const tableCellBoldText = new TableCellBoldText();
    const emptyTableCell = new EmptyTableCell();
    const defaultTableCell = new TableCellDefaultText();
    const tmpClassHours = new InvariantCurriculumSectionAllClassHours(this.curriculumTopics);
    const tmpOccupationFormClassHours = new InvariantCurriculumSectionOccupationFormAllClassHours(
      this.curriculumTopics, this.occupationForms);
    const tmpClassHoursList = tmpOccupationFormClassHours.curriculumSectionAllClassHours;
    this.child.push(tableCellBoldText.insertText('Инвариантная часть'));
    this.child.push(tableCellBoldText.insertText(tmpClassHours.curriculumSectionAllClassHours.toString()));
    tmpClassHoursList.forEach((obj, i) => {
      if (i !== 6) {
        if (obj === 0) {
          this.child.push(emptyTableCell.insert());
        }
        else {
          this.child.push(defaultTableCell.insertText(obj.toString()));
        }
      }
    });
    this.child.push(emptyTableCell.insert());
    return new TableRow({
      children: this.child,
      cantSplit: true
    });
  }
}
