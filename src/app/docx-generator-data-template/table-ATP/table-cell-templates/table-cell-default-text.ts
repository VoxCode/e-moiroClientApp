import {Paragraph, TableCell, TextRun, VerticalAlign} from 'docx';

export class TableCellDefaultText {
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
        })
      ]
    });
  }
}
