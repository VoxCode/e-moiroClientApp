import {Paragraph, TableCell, TextRun} from 'docx';

export class TableCellItalicText {
  constructor() {
  }

  public insertText(value: string): TableCell {
    return new TableCell({
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: value,
              italics : true,
            }),
          ]
        })
      ],
    });
  }
}
