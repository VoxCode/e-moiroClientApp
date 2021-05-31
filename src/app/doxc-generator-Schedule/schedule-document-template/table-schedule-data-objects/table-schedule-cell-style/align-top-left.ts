import {
  AlignmentType,
  convertMillimetersToTwip,
  Paragraph,
  TableCell,
  TableRow,
  TextDirection,
  VerticalAlign,
  WidthType
} from 'docx';

export class AlignTopLeftCell {

  public field: any;


  constructor(field: any) {
    this.field = field;
  }

  public insert(text: string): TableCell{
    return new TableCell({
      children: [
        new Paragraph({
          text,
          alignment: AlignmentType.LEFT,
        })
      ],
      verticalAlign: VerticalAlign.TOP,
    });
  }
}
