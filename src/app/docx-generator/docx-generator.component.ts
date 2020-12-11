import { Component } from '@angular/core';
import { Packer } from 'docx';
import { model, empty } from './cv-data';
import { DocumentCreator } from './cv-generator';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-docx-generator',
  templateUrl: './docx-generator.component.html',
  styleUrls: ['./docx-generator.component.scss']
})
export class DocxGeneratorComponent {

  public download(): void {
    const documentCreator = new DocumentCreator();
    const doc = documentCreator.create([
      model,
      empty,
    ]);

    Packer.toBlob(doc).then(blob => {
      console.log(blob);
      saveAs(blob, 'example.docx');
      console.log('Document created successfully');
    });
  }

  // tslint:disable-next-line:typedef
  public getDocument(): any {
    const documentCreator = new DocumentCreator();
    const docx = documentCreator.create([
     model,
      empty
    ]);
    return docx;
  }
}
