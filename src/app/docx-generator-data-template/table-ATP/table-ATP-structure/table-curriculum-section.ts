import {TrainingProgramCurriculumSection} from '../../../models/TrainingProgramCurriculumSection';
import {CurriculumTopicTrainingProgram} from '../../../models/СurriculumTopicTrainingProgram';
import {OccupationForm} from '../../../models/OccupationForm';
import {Paragraph, TableCell, TableRow, TextRun} from 'docx';
import {CurriculumSectionAllClassHours} from '../table-class-hours/curriculum-section-all-class-hours';
import {CurriculumSectionOccupationFormAllClassHours} from '../table-class-hours/curriculum-section-occupation-form-all-class-hours';
import {CapitalizeFirstLetter} from '../capitalize-first-letter';
import {EmptyTableCell} from '../table-cell-templates/empty-table-cell';
import {TableCellBoldTextAlignmentCenter} from '../table-cell-templates/table-cell-bold-text-alignment-center';

export class TableCurriculumSection {
  private allClassHours = new CurriculumSectionAllClassHours(this.curriculumTopicsList);
  private allOccupationFormsClassHours = new CurriculumSectionOccupationFormAllClassHours(this.curriculumTopicsList, this.occupationForms);
  private tmpClassHours = this.allOccupationFormsClassHours.curriculumSectionAllClassHours;
  private child: any = [];
  private capitalize = new CapitalizeFirstLetter();
  private emptyTableCell = new EmptyTableCell();
  constructor(
    private trainingProgramCurriculumSection: TrainingProgramCurriculumSection,
    private readonly index: number,
    private curriculumTopicsList: CurriculumTopicTrainingProgram[],
    private occupationForms: OccupationForm[]) {
    const tableCellBoldText = new TableCellBoldTextAlignmentCenter();
    this.child.push(new TableCell({
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: (++this.index) + '. ' + this.capitalize.capitalizeFirstLetter(this.trainingProgramCurriculumSection.name),
              bold : true,
            }),
          ]
        })
      ]
    }));
    this.child.push(tableCellBoldText.insertText(this.allClassHours.curriculumSectionAllClassHours.toString()));

    this.tmpClassHours.forEach((object, idx) => {
      if (object === 0) {
        this.child.push(this.emptyTableCell.insert());
      }
      else {
        this.child.push(tableCellBoldText.insertText(object.toString()));
      }
    });
    this.child.push(this.emptyTableCell.insert());
  }

  public insert(): TableRow
  {
    return new TableRow({
      children: this.child,
      cantSplit: true
    });
  }
}
