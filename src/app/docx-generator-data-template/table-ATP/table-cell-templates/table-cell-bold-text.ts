import {Paragraph, TableCell, TextRun, VerticalAlign} from 'docx';

export class TableCellBoldText {
  constructor() {
  }

  public insertText(value: string): TableCell {
    return new TableCell({
      verticalAlign: VerticalAlign.CENTER,
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: value,
              bold : true,
            }),
          ]
        })
      ]
    });
  }
}
