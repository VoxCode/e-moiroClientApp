import {Paragraph, TableCell, TextRun} from 'docx';

export class EmptyTableCell {
  constructor() {
  }

  public insert(): TableCell {
    return new TableCell({
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: '',
              bold : true,
            }),
          ]
        })
      ]
    });
  }
}
