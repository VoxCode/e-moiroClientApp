import {Paragraph, TableCell, TextRun} from 'docx';

export class TableCellDefaultText {
  constructor() {
  }
  public insertText(value: string, value2?: string): TableCell {
    return new TableCell({
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: value,
            }),
            new TextRun({
              text: value2,
              break: 1
            }),
          ],
        })
      ]
    });
  }
}
