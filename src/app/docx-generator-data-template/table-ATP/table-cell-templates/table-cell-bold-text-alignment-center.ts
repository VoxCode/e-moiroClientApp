import {AlignmentType, Paragraph, TableCell, TextRun} from 'docx';

export class TableCellBoldTextAlignmentCenter {
  constructor() {
  }
  public insertText(value: string): TableCell {
    return new TableCell({
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: value,
              bold : true,
            }),
          ],
          alignment: AlignmentType.CENTER
        })
      ],
    });
  }
}
