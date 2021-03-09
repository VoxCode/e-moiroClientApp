import {AlignmentType, Paragraph, TableCell, TextRun} from 'docx';

export class TableCellDefaultTextAlignmentCenter {
  constructor() {
  }
  public insertText(value: string): TableCell {
    return new TableCell({
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: value,
            }),
          ],
          alignment: AlignmentType.CENTER
        })
      ]
    });
  }
}
