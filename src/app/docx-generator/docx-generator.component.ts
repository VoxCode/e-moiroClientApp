import {Component, Injectable} from '@angular/core';
import { Packer } from 'docx';
import { model, empty } from './cv-data';
import { DocumentCreator } from './cv-generator';
import { saveAs } from 'file-saver';
import {TrainingProgramService} from '../services/training-program.service';
import {Observable} from "rxjs";

@Injectable()
@Component({
  selector: 'app-docx-generator',
  templateUrl: './docx-generator.component.html',
  styleUrls: ['./docx-generator.component.scss'],
  providers: [TrainingProgramService]
})
export class DocxGeneratorComponent {

  constructor(private trainingProgramService: TrainingProgramService) {
  }

  public download(): void {
    const documentCreator = new DocumentCreator(this.trainingProgramService);
    const doc = documentCreator.create([
      model,
      empty
    ]);

    Packer.toBlob(doc).then(blob => {
      console.log(blob);
      saveAs(blob, 'example.docx');
      console.log('Document created successfully');
    });
  }

  // tslint:disable-next-line:typedef
  public getDocument(): any {
    const documentCreator = new DocumentCreator(this.trainingProgramService);
    const docx = documentCreator.create([
      model,
      empty
    ]);
    return docx;
  }

  // tslint:disable-next-line:typedef
  public startGenerate(): any {
    let docx: any;
    const documentCreator = new DocumentCreator(this.trainingProgramService);
    documentCreator.startGenerate().subscribe((data => {
      docx = data;
      return docx;
    }));

  }
}
