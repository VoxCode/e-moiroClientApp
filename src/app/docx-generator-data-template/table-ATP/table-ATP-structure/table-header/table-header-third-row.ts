import {OccupationForm} from '../../../../models/OccupationForm';
import {Paragraph, TableCell, TableRow, TextRun} from 'docx';

export class TableHeaderThirdRow {
  private child: any = [];
  constructor(private occupationForms: OccupationForm[]) {

    this.child.push(new TableCell({
      children: [
        new Paragraph('Всего')
      ]
    }));
    occupationForms.forEach(obj => {
      if (obj.id !== 1){
        this.child.push(new TableCell({
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
  }

  public insert(): TableRow
  {
    return new TableRow({
      children: this.child,
      tableHeader: true,
      cantSplit: true
    });
  }
}
