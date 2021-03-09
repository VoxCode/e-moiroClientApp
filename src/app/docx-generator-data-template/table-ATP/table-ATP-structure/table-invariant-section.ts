import {CurriculumTopicTrainingProgram} from '../../../models/СurriculumTopicTrainingProgram';
import {OccupationForm} from '../../../models/OccupationForm';
import {TableRow} from 'docx';
import {InvariantCurriculumSectionAllClassHours} from '../table-class-hours/invariant-curriculum-section-all-class-hours';
import {InvariantCurriculumSectionOccupationFormAllClassHours} from '../table-class-hours/invariant-curriculum-section-occupation-form-all-class-hours';
import {TableCellBoldText} from '../table-cell-templates/table-cell-bold-text';
import {EmptyTableCell} from '../table-cell-templates/empty-table-cell';
import {TableCellDefaultTextAlignmentCenter} from '../table-cell-templates/table-cell-default-text-alignment-center';
import {TableCellBoldTextAlignmentCenter} from '../table-cell-templates/table-cell-bold-text-alignment-center';

export class TableInvariantSection {
  private child: any = [];
  constructor(
    private curriculumTopics: CurriculumTopicTrainingProgram[],
    private occupationForms: OccupationForm[]) {
  }

  public insert(): TableRow {
    const tableCellBoldText = new TableCellBoldText();
    const tableCellBoldTextCenter = new TableCellBoldTextAlignmentCenter();
    const emptyTableCell = new EmptyTableCell();
    const defaultTableCellCenter = new TableCellDefaultTextAlignmentCenter();
    const tmpClassHours = new InvariantCurriculumSectionAllClassHours(this.curriculumTopics);
    const tmpOccupationFormClassHours = new InvariantCurriculumSectionOccupationFormAllClassHours(
      this.curriculumTopics, this.occupationForms);
    const tmpClassHoursList = tmpOccupationFormClassHours.curriculumSectionAllClassHours;
    this.child.push(tableCellBoldText.insertText('Инвариантная часть'));
    this.child.push(tableCellBoldTextCenter.insertText(tmpClassHours.curriculumSectionAllClassHours.toString()));
    tmpClassHoursList.forEach((obj, i) => {
      if (i !== 6) {
        if (obj === 0) {
          this.child.push(emptyTableCell.insert());
        }
        else {
          this.child.push(defaultTableCellCenter.insertText(obj.toString()));
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
